import Link from 'next/link';
import { FaCode, FaMobileAlt, FaPalette, FaBullhorn, FaCloud, FaShieldAlt } from 'react-icons/fa';
import { HiOutlineArrowRight, HiOutlineCheck } from 'react-icons/hi';
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

const serviceIcons = [FaCode, FaMobileAlt, FaPalette, FaBullhorn, FaCloud, FaShieldAlt];

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
                <div className="services-masonry">
                    {services.map((service, index) => {
                        const IconComponent = serviceIcons[index % serviceIcons.length];
                        return (
                            <div key={service.id} className="service-card-new">
                                <div className="service-card-header">
                                    <div className="service-card-icon">
                                        <IconComponent />
                                    </div>
                                    <div>
                                        <h2>{service.name}</h2>
                                        <span className="service-badge">Professional</span>
                                    </div>
                                </div>

                                <div className="service-card-body">
                                    <p>{service.description}</p>
                                </div>

                                {service.offers?.length > 0 && (
                                    <div className="service-offers-list">
                                        <h3>What&apos;s included:</h3>
                                        <ul>
                                            {service.offers.slice(0, 4).map((offer) => (
                                                <li key={offer.id}>
                                                    <HiOutlineCheck />
                                                    {offer.offer}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="service-card-footer">
                                    <Link href={`/services/${service.slug}`} className="service-link">
                                        Learn More <HiOutlineArrowRight />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {services.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                        <FaCode style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '1rem' }} />
                        <p style={{ color: 'var(--text-light)' }}>No services available yet.</p>
                    </div>
                )}
            </div>
        </>
    );
}
