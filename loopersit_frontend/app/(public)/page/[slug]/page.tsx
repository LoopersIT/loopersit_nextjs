import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaShieldAlt, FaFileContract, FaInfoCircle } from 'react-icons/fa';
import '@/styles/services.css';

interface Page {
    id: number;
    title: string;
    slug: string;
    content: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Icon mapping for different page types
const pageIcons: { [key: string]: React.ReactNode } = {
    'privacy-policy': <FaShieldAlt />,
    'terms': <FaFileContract />,
    'terms-of-service': <FaFileContract />,
};

async function getPage(slug: string): Promise<Page | null> {
    try {
        const res = await fetch(`${API_URL}/api/pages/slug/${slug}`, { cache: 'no-store' });
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = await getPage(slug);
    return {
        title: page?.title || 'Page',
    };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = await getPage(slug);

    if (!page) {
        notFound();
    }

    const PageIcon = pageIcons[slug] || <FaInfoCircle />;

    return (
        <>
            {/* Hero Section */}
            <section className="page-hero">
                <div className="page-hero-content">
                    <h1>{page.title}</h1>
                    <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </section>

            <div className="page-content" style={{ maxWidth: '900px' }}>
                {/* Back Link */}
                <Link
                    href="/"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--secondary)',
                        textDecoration: 'none',
                        fontWeight: 500,
                        marginBottom: '2rem'
                    }}
                >
                    <FaArrowLeft /> Back to Home
                </Link>

                {/* Header Card */}
                <div style={{
                    background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    color: 'var(--white)'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'rgba(255,255,255,0.15)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.75rem',
                        flexShrink: 0
                    }}>
                        {PageIcon}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{page.title}</h2>
                        <p style={{ opacity: 0.85, fontSize: '0.95rem' }}>
                            Please read this document carefully before using our services.
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div
                    style={{
                        background: 'var(--white)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '2.5rem',
                        boxShadow: 'var(--shadow)',
                        lineHeight: 1.8,
                        color: 'var(--text)'
                    }}
                    className="legal-content"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                />

                {/* Footer Note */}
                <div style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    background: 'rgba(35, 173, 173, 0.1)',
                    borderRadius: 'var(--radius)',
                    borderLeft: '4px solid var(--secondary)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem'
                }}>
                    <FaInfoCircle style={{ color: 'var(--secondary)', fontSize: '1.25rem', marginTop: '0.15rem', flexShrink: 0 }} />
                    <div>
                        <h4 style={{ color: 'var(--primary)', marginBottom: '0.25rem', fontSize: '1rem' }}>Questions?</h4>
                        <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', margin: 0 }}>
                            If you have any questions about this document, please{' '}
                            <Link href="/contact" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: 500 }}>
                                contact us
                            </Link>.
                        </p>
                    </div>
                </div>
            </div>

            {/* Styles for the HTML content */}
            <style>{`
                .legal-content h2 {
                    font-size: 1.5rem;
                    color: var(--primary);
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 2px solid var(--border);
                }
                .legal-content h3 {
                    font-size: 1.25rem;
                    color: var(--primary);
                    margin-top: 1.5rem;
                    margin-bottom: 0.75rem;
                }
                .legal-content p {
                    margin-bottom: 1rem;
                    color: var(--text-light);
                }
                .legal-content ul, .legal-content ol {
                    margin-bottom: 1rem;
                    padding-left: 1.5rem;
                }
                .legal-content li {
                    margin-bottom: 0.5rem;
                    color: var(--text-light);
                }
                .legal-content a {
                    color: var(--secondary);
                    text-decoration: none;
                }
                .legal-content a:hover {
                    text-decoration: underline;
                }
                .legal-content strong {
                    color: var(--primary);
                    font-weight: 600;
                }
            `}</style>
        </>
    );
}
