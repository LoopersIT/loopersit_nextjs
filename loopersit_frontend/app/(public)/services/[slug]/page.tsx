import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaCode, FaCheck, FaArrowLeft } from 'react-icons/fa';
import { HiOutlineArrowRight } from 'react-icons/hi';
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

            <div className="page-content">
                {/* Back Link */}
                <Link
                    href="/services"
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
                    <FaArrowLeft /> Back to Services
                </Link>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                    {/* Main Content */}
                    <div>
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

                        {/* Description Card */}
                        <div style={{
                            background: 'var(--white)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '2rem',
                            boxShadow: 'var(--shadow)',
                            marginBottom: '2rem'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                marginBottom: '1.5rem'
                            }}>
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
                                    borderRadius: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--white)',
                                    fontSize: '1.5rem'
                                }}>
                                    <FaCode />
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>
                                        About This Service
                                    </h2>
                                    <span style={{
                                        background: 'rgba(35, 173, 173, 0.1)',
                                        color: 'var(--secondary)',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '50px',
                                        fontSize: '0.75rem',
                                        fontWeight: 600
                                    }}>
                                        Professional
                                    </span>
                                </div>
                            </div>
                            <p style={{ color: 'var(--text-light)', lineHeight: 1.8, fontSize: '1.05rem' }}>
                                {service.description}
                            </p>
                        </div>

                        {/* Offers */}
                        {service.offers && service.offers.length > 0 && (
                            <div style={{
                                background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
                                borderRadius: 'var(--radius-lg)',
                                padding: '2rem',
                                color: 'var(--white)',
                                marginBottom: '2rem'
                            }}>
                                <h2 style={{
                                    fontSize: '1.25rem',
                                    marginBottom: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    What&apos;s Included
                                </h2>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                    gap: '1rem'
                                }}>
                                    {service.offers.map((offer) => (
                                        <div key={offer.id} style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '0.75rem',
                                            background: 'rgba(255,255,255,0.1)',
                                            padding: '1rem',
                                            borderRadius: 'var(--radius)'
                                        }}>
                                            <FaCheck style={{
                                                color: 'var(--secondary)',
                                                marginTop: '0.15rem',
                                                flexShrink: 0
                                            }} />
                                            <span>{offer.offer}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

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
                                    boxShadow: 'var(--shadow)',
                                    borderLeft: '4px solid var(--secondary)'
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
                    <h2 style={{ color: 'var(--primary)', marginBottom: '0.75rem', fontSize: '1.75rem' }}>
                        Ready to Get Started?
                    </h2>
                    <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
                        Let&apos;s discuss your project requirements and bring your vision to life.
                    </p>
                    <Link href="/contact" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        Get a Free Quote <HiOutlineArrowRight />
                    </Link>
                </div>
            </div>
        </>
    );
}
