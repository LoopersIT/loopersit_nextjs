import Link from 'next/link';
import '@/styles/homepage.css';

interface Service {
    id: number;
    name: string;
    slug: string;
    description: string;
    homeIcon: string | null;
}

interface Review {
    id: number;
    name: string;
    designation: string;
    review: string;
    image: string | null;
}

interface Pricing {
    id: number;
    name: string;
    priceRange: string;
    features: { id: number; feature: string }[];
}

interface ProjectSummary {
    id: number;
    figure: string;
    detail: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function getHomeData() {
    try {
        const [servicesRes, reviewsRes, pricingRes, statsRes] = await Promise.all([
            fetch(`${API_URL}/api/services`, { cache: 'no-store' }),
            fetch(`${API_URL}/api/reviews`, { cache: 'no-store' }),
            fetch(`${API_URL}/api/pricing`, { cache: 'no-store' }),
            fetch(`${API_URL}/api/project-summary`, { cache: 'no-store' }),
        ]);

        return {
            services: servicesRes.ok ? await servicesRes.json() : [],
            reviews: reviewsRes.ok ? await reviewsRes.json() : [],
            pricing: pricingRes.ok ? await pricingRes.json() : [],
            stats: statsRes.ok ? await statsRes.json() : [],
        };
    } catch {
        return { services: [], reviews: [], pricing: [], stats: [] };
    }
}

export default async function HomePage() {
    const { services, reviews, pricing, stats } = await getHomeData();

    return (
        <>
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <i className="bi bi-lightning-charge-fill"></i>
                            Software Development Agency
                        </div>
                        <h1 className="hero-title">
                            Building Websites,<br />
                            <span>Growing Business</span> Online
                        </h1>
                        <p className="hero-description">
                            We create responsive, custom websites and implement digital
                            marketing strategies to drive business growth online.
                        </p>
                        <div className="hero-buttons">
                            <Link href="/services" className="btn btn-secondary">
                                Explore Services
                            </Link>
                            <Link href="/contact" className="btn btn-white">
                                Get a Quote
                            </Link>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src="/img/homepage_intro_img.png" alt="LoopersIT" />
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <div className="stats-bar">
                <div className="stats-grid">
                    {stats.slice(0, 4).map((stat: ProjectSummary) => (
                        <div key={stat.id} className="stat-item">
                            <span className="stat-number">{stat.figure}</span>
                            <span className="stat-label">{stat.detail}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Services Section */}
            <section className="services-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">What We Do</span>
                        <h2 className="section-title">Our Services</h2>
                        <p className="section-subtitle">
                            Comprehensive digital solutions to help your business thrive online
                        </p>
                    </div>

                    <div className="services-grid">
                        {services.slice(0, 6).map((service: Service) => (
                            <Link key={service.id} href={`/services/${service.slug}`} className="service-card">
                                <div className="service-icon">
                                    <i className="bi bi-code-slash"></i>
                                </div>
                                <h3>{service.name}</h3>
                                <p>{service.description.slice(0, 100)}...</p>
                            </Link>
                        ))}
                    </div>

                    <div className="services-cta">
                        <Link href="/services" className="btn btn-outline">
                            View All Services →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="reviews-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Testimonials</span>
                        <h2 className="section-title">What Clients Say</h2>
                        <p className="section-subtitle">
                            Don&apos;t just take our word for it
                        </p>
                    </div>

                    <div className="reviews-grid">
                        {reviews.slice(0, 3).map((review: Review) => (
                            <div key={review.id} className="review-card">
                                <p className="review-text">
                                    {review.review.length > 180 ? `${review.review.slice(0, 180)}...` : review.review}
                                </p>
                                <div className="review-author">
                                    <div className="review-avatar">
                                        {review.image ? (
                                            <img src={review.image} alt={review.name} />
                                        ) : (
                                            review.name.charAt(0)
                                        )}
                                    </div>
                                    <div className="review-info">
                                        <h4>{review.name}</h4>
                                        <p>{review.designation}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="pricing-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Pricing</span>
                        <h2 className="section-title">Simple, Transparent Pricing</h2>
                        <p className="section-subtitle">
                            Choose the plan that works for your business
                        </p>
                    </div>

                    <div className="pricing-grid">
                        {pricing.map((plan: Pricing, index: number) => (
                            <div key={plan.id} className={`pricing-card ${index === 1 ? 'featured' : ''}`}>
                                {index === 1 && <span className="pricing-badge">Most Popular</span>}
                                <h3>{plan.name}</h3>
                                <div className="pricing-price">{plan.priceRange}</div>
                                <ul className="pricing-features">
                                    {plan.features?.slice(0, 5).map((feature) => (
                                        <li key={feature.id}>
                                            <i className="bi bi-check-circle-fill"></i>
                                            {feature.feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/contact"
                                    className={`btn ${index === 1 ? 'btn-secondary' : 'btn-outline'}`}
                                    style={{ width: '100%' }}
                                >
                                    Get Started
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-box">
                        <div className="cta-content">
                            <h2>Ready to Start Your Project?</h2>
                            <p>
                                Let&apos;s discuss how we can help bring your vision to life.
                                Get a free consultation today.
                            </p>
                            <Link href="/contact" className="btn btn-secondary">
                                Schedule a Call
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
