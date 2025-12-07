import Link from 'next/link';
import { notFound } from 'next/navigation';
import '@/styles/services.css';

interface SubService {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string | null;
}

interface ServiceOffer {
    id: number;
    offer: string;
}

interface Service {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string | null;
    offers: ServiceOffer[];
    subservices: SubService[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function getService(slug: string): Promise<Service | null> {
    try {
        const res = await fetch(`${API_URL}/api/services`, { cache: 'no-store' });
        if (!res.ok) return null;
        const services = await res.json();
        return services.find((s: Service) => s.slug === slug) || null;
    } catch {
        return null;
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = await getService(slug);
    return {
        title: service?.name || 'Service',
        description: service?.description || 'Service details',
    };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = await getService(slug);

    if (!service) {
        notFound();
    }

    return (
        <>
            <section className="page-hero">
                <div className="page-hero-content">
                    <h1>{service.name}</h1>
                    <p>{service.description}</p>
                </div>
            </section>

            <div className="page-content" style={{ maxWidth: '900px', margin: '0 auto' }}>
                {/* Service Image */}
                {service.image && (
                    <div style={{
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        marginBottom: '2rem',
                        boxShadow: 'var(--shadow)'
                    }}>
                        <img
                            src={service.image}
                            alt={service.name}
                            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                        />
                    </div>
                )}

                {/* Offers */}
                {service.offers && service.offers.length > 0 && (
                    <div style={{
                        background: 'var(--white)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '2rem',
                        boxShadow: 'var(--shadow)',
                        marginBottom: '2rem'
                    }}>
                        <h2 style={{
                            fontSize: '1.25rem',
                            color: 'var(--primary)',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <i className="bi bi-check2-square" style={{ color: 'var(--secondary)' }}></i>
                            What We Offer
                        </h2>
                        <ul style={{ listStyle: 'none' }}>
                            {service.offers.map((offer) => (
                                <li key={offer.id} style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '0.75rem',
                                    padding: '0.75rem 0',
                                    borderBottom: '1px solid var(--border)'
                                }}>
                                    <i className="bi bi-check-circle-fill" style={{
                                        color: 'var(--secondary)',
                                        marginTop: '0.15rem'
                                    }}></i>
                                    <span style={{ color: 'var(--text)' }}>{offer.offer}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Subservices */}
                {service.subservices && service.subservices.length > 0 && (
                    <>
                        <div className="section-header" style={{ marginTop: '3rem' }}>
                            <span className="section-label">Related</span>
                            <h2 className="section-title">Related Services</h2>
                        </div>
                        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                            {service.subservices.map((sub) => (
                                <div key={sub.id} style={{
                                    background: 'var(--white)',
                                    borderRadius: 'var(--radius-lg)',
                                    padding: '1.5rem',
                                    boxShadow: 'var(--shadow)'
                                }}>
                                    <h3 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                                        {sub.name}
                                    </h3>
                                    <p style={{ fontSize: '0.95rem', color: 'var(--text-light)', lineHeight: 1.6 }}>
                                        {sub.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* CTA */}
                <div style={{
                    textAlign: 'center',
                    margin: '3rem 0',
                    padding: '3rem 2rem',
                    background: 'var(--white)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow)'
                }}>
                    <h2 style={{ color: 'var(--primary)', marginBottom: '0.75rem' }}>
                        Ready to Get Started?
                    </h2>
                    <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>
                        Let&apos;s discuss your project requirements.
                    </p>
                    <Link href="/contact" className="btn btn-primary">
                        Get a Free Quote
                    </Link>
                </div>
            </div>
        </>
    );
}
