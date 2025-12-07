import Link from 'next/link';
import '@/styles/homepage.css';

interface Service {
    id: number;
    name: string;
    slug: string;
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

        const services = servicesRes.ok ? await servicesRes.json() : [];
        const reviews = reviewsRes.ok ? await reviewsRes.json() : [];
        const pricing = pricingRes.ok ? await pricingRes.json() : [];
        const stats = statsRes.ok ? await statsRes.json() : [];

        return { services, reviews, pricing, stats };
    } catch (error) {
        console.error('Error fetching home data:', error);
        return { services: [], reviews: [], pricing: [], stats: [] };
    }
}

export default async function HomePage() {
    const { services, reviews, pricing, stats } = await getHomeData();

    return (
        <>
            {/* Hero Section */}
            <div className="background_wave">
                <div style={{ padding: '0.3rem' }}></div>
                <div className="intro_card">
                    <div className="intro_svg">
                        <img className="intro_img" src="/img/homepage_intro_img.png" alt="LoopersIT" />
                    </div>
                    <div className="intro_paragraph">
                        <p className="intro_tag">Building websites, growing business online</p>
                        <p className="intro_details">
                            We create responsive, custom websites and implement digital
                            marketing strategies to drive business growth online
                        </p>
                        <div className="intro_buttons">
                            <Link href="/services" className="btn-primary">Get started</Link>
                            <Link href="/contact" className="btn-outline">Schedule a call</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="gap"></div>

            {/* Services Section */}
            <div className="category_name">
                <span className="first_cat">Our</span>
                <span className="second_cat">Services</span>
            </div>

            <div className="service_box">
                {services.slice(0, 4).map((service: Service) => (
                    <Link key={service.id} href={`/services/${service.slug}`} className="services">
                        <span className="service_svg">
                            {service.homeIcon ? (
                                <img className="service_img" src={service.homeIcon} alt={service.name} />
                            ) : (
                                <i className="bi bi-briefcase" style={{ fontSize: '1.5rem', color: '#2A1D51' }}></i>
                            )}
                        </span>
                        <span className="service_name">{service.name}</span>
                    </Link>
                ))}
            </div>

            <div className="all_services">
                <Link className="all_service_link" href="/services">
                    <span className="all_service_name">Check out all our services →</span>
                </Link>
            </div>

            {/* Portfolio/Stats Section */}
            <div className="category_name">
                <span className="first_cat">Our</span>
                <span className="second_cat">Portfolio</span>
            </div>

            <div className="about_us">
                <div className="about_stats">
                    {stats.map((stat: ProjectSummary) => (
                        <div key={stat.id} className="stats">
                            <div className="hanging_line"></div>
                            <span className="stats_number">{stat.figure}</span>
                            <span className="stats_details">{stat.detail}</span>
                        </div>
                    ))}
                </div>
                <div className="about_button">
                    <Link href="/portfolio" className="btn-outline">See more</Link>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="category_name">
                <span className="first_cat">Our</span>
                <span className="second_cat">Reviews</span>
            </div>

            <div className="review_wrapper">
                {reviews.slice(0, 3).map((review: Review) => (
                    <div key={review.id} className="review_profile">
                        <div className="reviewer_image">
                            {review.image ? (
                                <img src={review.image} alt={review.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                            ) : (
                                review.name.charAt(0).toUpperCase()
                            )}
                        </div>
                        <div className="reviewer_details">
                            <p className="reviewer_name">{review.name}</p>
                            <p className="reviewer_designation">{review.designation}</p>
                        </div>
                        <div className="review_text">
                            {review.review.length > 150 ? `${review.review.slice(0, 150)}...` : review.review}
                        </div>
                    </div>
                ))}
                {reviews.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                        No reviews yet
                    </div>
                )}
                <div className="review_button">
                    <Link className="btn-outline" href="/reviews">See more</Link>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="category_name">
                <span className="first_cat">Estimated</span>
                <span className="second_cat">Prices</span>
            </div>

            <div className="estimated_price">
                {pricing.map((plan: Pricing) => (
                    <div key={plan.id} className="price_card">
                        <div className="service_desc">
                            <span className="product_name">{plan.name}</span>
                            <span className="service_price">{plan.priceRange}</span>
                        </div>
                        <div className="offer_list">
                            {plan.features?.map((feature) => (
                                <div key={feature.id} className="offer_details">
                                    <span className="check_icons"><i className="bi bi-check2-circle"></i></span>
                                    <span className="offer_desc">{feature.feature}</span>
                                </div>
                            ))}
                        </div>
                        <div className="price_button">
                            <Link href="/contact" className="btn-secondary">Contact us</Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
