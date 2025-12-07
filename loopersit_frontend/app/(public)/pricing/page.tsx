import Link from 'next/link';
import '@/styles/services.css';
import '@/styles/homepage.css';

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

async function getPricing(): Promise<Pricing[]> {
    try {
        const res = await fetch(`${API_URL}/api/pricing`, { cache: 'no-store' });
        if (!res.ok) return [];
        return res.json();
    } catch {
        return [];
    }
}

export const metadata = {
    title: 'Pricing',
    description: 'View our pricing plans and packages for web development services.',
};

export default async function PricingPage() {
    const pricing = await getPricing();

    return (
        <>
            <section className="page-hero">
                <div className="page-hero-content">
                    <h1>Pricing Plans</h1>
                    <p>
                        Simple, transparent pricing that scales with your business.
                        No hidden fees, no surprises.
                    </p>
                </div>
            </section>

            <div className="page-content">
                <div className="pricing-grid">
                    {pricing.map((plan) => (
                        <div key={plan.id} className="pricing-card">
                            <h3>{plan.name}</h3>
                            <div className="pricing-price">{plan.priceRange}</div>
                            <ul className="pricing-features">
                                {plan.features?.map((feature) => (
                                    <li key={feature.id}>
                                        <i className="bi bi-check-circle-fill"></i>
                                        {feature.feature}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/contact"
                                className="btn btn-outline"
                                style={{ width: '100%' }}
                            >
                                Get Started
                            </Link>
                        </div>
                    ))}
                </div>

                {pricing.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                        <i className="bi bi-currency-dollar" style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'block' }}></i>
                        <p style={{ color: 'var(--text-light)' }}>Pricing information coming soon.</p>
                    </div>
                )}

                {/* Custom Quote Section */}
                <div className="cta-section" style={{ paddingBottom: 0 }}>
                    <div className="cta-box">
                        <div className="cta-content">
                            <h2>Need a Custom Quote?</h2>
                            <p>
                                Every project is unique. Contact us for a personalized
                                quote tailored to your specific requirements.
                            </p>
                            <Link href="/contact" className="btn btn-white">
                                Request Custom Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
