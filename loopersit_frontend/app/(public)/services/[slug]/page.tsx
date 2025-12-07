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
        <div className="service-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="category_name">
                <span className="first_cat">{service.name.split(' ')[0]}</span>
                <span className="second_cat">{service.name.split(' ').slice(1).join(' ') || 'Service'}</span>
            </div>

            <div className="service" style={{ width: '100%' }}>
                <div className="service-intro" style={{ width: '100%' }}>
                    {service.image ? (
                        <img className="service-image" src={service.image} alt={service.name} style={{ height: '300px' }} />
                    ) : (
                        <div className="service-image" style={{ height: '300px', background: 'linear-gradient(135deg, #23ADAD, #2A1D51)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="bi bi-briefcase" style={{ fontSize: '4rem', color: '#fff' }}></i>
                        </div>
                    )}
                    <p className="service-short-description" style={{ fontSize: '1.1rem' }}>{service.description}</p>
                </div>
            </div>

            {service.offers && service.offers.length > 0 && (
                <>
                    <div className="category_name" style={{ marginTop: '2rem' }}>
                        <span className="first_cat">What</span>
                        <span className="second_cat">We Offer</span>
                    </div>
                    <div style={{ background: '#fff', borderRadius: '15px', padding: '2rem', marginBottom: '2rem' }}>
                        <ul className="offer-list">
                            {service.offers.map((offer) => (
                                <li key={offer.id} className="offer-list-item" style={{ color: '#1f2937', fontSize: '1.1rem', marginBottom: '1rem' }}>
                                    <span className="offer-bullet"></span>
                                    {offer.offer}
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}

            {service.subservices && service.subservices.length > 0 && (
                <>
                    <div className="category_name">
                        <span className="first_cat">Related</span>
                        <span className="second_cat">Services</span>
                    </div>
                    <div className="service-categories">
                        {service.subservices.map((sub) => (
                            <div key={sub.id} className="service" style={{ width: '100%' }}>
                                <div className="service-intro" style={{ width: '100%' }}>
                                    <h2 className="service-title">{sub.name}</h2>
                                    <p className="service-short-description">{sub.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <div style={{ textAlign: 'center', margin: '3rem 0' }}>
                <Link href="/contact" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                    Get a Quote
                </Link>
            </div>
        </div>
    );
}
