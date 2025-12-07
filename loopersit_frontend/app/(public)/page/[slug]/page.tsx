import { notFound } from 'next/navigation';
import '@/styles/base.css';

interface Page {
    id: number;
    title: string;
    slug: string;
    content: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function getPage(slug: string): Promise<Page | null> {
    try {
        const res = await fetch(`${API_URL}/api/pages/${slug}`, { cache: 'no-store' });
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

    return (
        <div style={{ padding: '1rem', maxWidth: '900px', margin: '0 auto' }}>
            <div className="category_name">
                <span className="second_cat">{page.title}</span>
            </div>

            <div
                style={{
                    background: '#fff',
                    borderRadius: '15px',
                    padding: '2rem',
                    lineHeight: 1.8,
                    color: '#374151'
                }}
                dangerouslySetInnerHTML={{ __html: page.content }}
            />
        </div>
    );
}
