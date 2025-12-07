import Link from 'next/link';
import '@/styles/services.css';

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
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function getServices(): Promise<Service[]> {
    try {
        const res = await fetch(`${API_URL}/api/services`, { cache: 'no-store' });
        if (!res.ok) return [];
        return res.json();
    } catch {
        return [];
    }
}

export const metadata = {
    title: 'Services',
    description: 'Explore our web development, mobile app development, UI/UX design, and digital marketing services.',
};

export default async function ServicesPage() {
    const services = await getServices();

    return (
        <>
            <section className="page-hero">
                <div className="page-hero-content">
                    <h1>Our Services</h1>
                    <p>
                        Comprehensive digital solutions tailored to help your business
                        succeed in the modern digital landscape.
                    </p>
                </div>
            </section>

            <div className="page-content">
                <div className="service-list">
                    {services.map((service) => (
                        <div key={service.id} className="service-item">
                            <div className="service-item-image">
                                {service.image ? (
                                    <img src={service.image} alt={service.name} />
                                ) : (
                                    <i className="bi bi-code-slash"></i>
                                )}
                            </div>
                            <div className="service-item-content">
                                <h2>{service.name}</h2>
                                <p>{service.description}</p>

                                {service.offers?.length > 0 && (
                                    <div className="service-offers">
                                        <h3>What we offer:</h3>
                                        <ul>
                                            {service.offers.slice(0, 4).map((offer) => (
                                                <li key={offer.id}>
                                                    <i className="bi bi-check2"></i>
                                                    {offer.offer}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <Link href={`/services/${service.slug}`} className="btn btn-primary">
                                    Learn More →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {services.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                        <i className="bi bi-briefcase" style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'block' }}></i>
                        <p style={{ color: 'var(--text-light)' }}>No services available yet.</p>
                    </div>
                )}
            </div>
        </>
    );
}
