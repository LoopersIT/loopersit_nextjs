import Link from 'next/link';
import { HiOutlineCheckCircle, HiOutlineArrowRight } from 'react-icons/hi';
import { FaRocket, FaStar, FaCrown, FaDollarSign } from 'react-icons/fa';
import '@/styles/pricing-page.css';

interface PriceFeature {
    id: number;
    feature: string;
}

interface Pricing {
    id: number;
    name: string;
    priceRange: string;
    features: PriceFeature[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Icon mapping for plan types
const planIcons: { [key: string]: React.ElementType } = {
    'basic': FaRocket,
    'standard': FaStar,
    'enterprise': FaCrown,
};

async function getPricing(): Promise<Pricing[]> {
    try {
        const res = await fetch(`${API_URL}/api/pricing`, { cache: 'no-store' });
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

export const metadata = {
    title: 'Pricing Plans | LoopersIT',
    description: 'View our pricing plans and packages for web development services.',
};

export default async function PricingPage() {
    const pricing = await getPricing();

    return (
        <>
            {/* Hero Section with Glass Background */}
            <section className="pricing-hero">
                <div className="pricing-hero-bg"></div>
                <div className="pricing-hero-content">
                    <span className="pricing-hero-badge">Transparent Pricing</span>
                    <h1>Choose Your Perfect Plan</h1>
                    <p>
                        Simple, transparent pricing that scales with your business.
                        No hidden fees, no surprises.
                    </p>
                </div>
            </section>

            {/* Pricing Cards Section */}
            <section className="pricing-cards-section">
                <div className="pricing-cards-container">
                    {pricing.map((plan, index) => {
                        const planKey = plan.name.toLowerCase();
                        const IconComponent = planIcons[planKey] || FaDollarSign;

                        return (
                            <div key={plan.id} className={`glass-pricing-card ${index === 1 ? 'featured' : ''}`}>
                                {index === 1 && (
                                    <div className="featured-ribbon">Most Popular</div>
                                )}

                                <div className="glass-card-header">
                                    <div className="glass-card-icon">
                                        <IconComponent />
                                    </div>
                                    <h3>{plan.name}</h3>
                                    <div className="glass-card-price">{plan.priceRange}</div>
                                </div>

                                <div className="glass-card-features">
                                    {plan.features?.map((feature) => (
                                        <div key={feature.id} className="glass-feature-item">
                                            <HiOutlineCheckCircle />
                                            <span>{feature.feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href="/contact"
                                    className={`glass-card-button ${index === 1 ? 'primary' : ''}`}
                                >
                                    Get Started <HiOutlineArrowRight />
                                </Link>
                            </div>
                        );
                    })}
                </div>

                {pricing.length === 0 && (
                    <div className="pricing-empty">
                        <FaDollarSign />
                        <p>Pricing information coming soon.</p>
                    </div>
                )}
            </section>

            {/* Custom Quote Section */}
            <section className="custom-quote-section">
                <div className="custom-quote-glass">
                    <div className="custom-quote-content">
                        <h2>Need a Custom Solution?</h2>
                        <p>
                            Every project is unique. Let&apos;s discuss your requirements
                            and create a tailored package just for you.
                        </p>
                        <Link href="/contact" className="custom-quote-btn">
                            Request Custom Quote <HiOutlineArrowRight />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
