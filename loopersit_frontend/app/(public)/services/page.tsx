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
        <div className="service-container">
            <div className="category_name">
                <span className="first_cat">Our</span>
                <span className="second_cat">Services</span>
            </div>

            <div className="service-categories">
                {services.map((service) => (
                    <div key={service.id} className="service">
                        <div className="service-intro">
                            {service.image ? (
                                <img className="service-image" src={service.image} alt={service.name} />
                            ) : (
                                <div className="service-image" style={{ background: 'linear-gradient(135deg, #23ADAD, #2A1D51)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <i className="bi bi-briefcase" style={{ fontSize: '3rem', color: '#fff' }}></i>
                                </div>
                            )}
                            <h1 className="service-title">{service.name}</h1>
                            <p className="service-short-description">{service.description}</p>
                        </div>
                        <div className="service-offer">
                            <h2 className="offer-title">What we offer</h2>
                            <ul className="offer-list">
                                {service.offers?.slice(0, 5).map((offer) => (
                                    <li key={offer.id} className="offer-list-item">
                                        <span className="offer-bullet"></span>
                                        {offer.offer}
                                    </li>
                                ))}
                            </ul>
                            <div className="btn-container">
                                <Link href={`/services/${service.slug}`} className="service-explore-btn">
                                    Explore Options
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {services.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#6b7280' }}>
                    <i className="bi bi-briefcase" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}></i>
                    <p>No services available yet.</p>
                </div>
            )}
        </div>
    );
}
