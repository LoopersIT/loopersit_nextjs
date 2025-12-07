import Link from 'next/link';
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
        <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div className="category_name">
                <span className="first_cat">Our</span>
                <span className="second_cat">Pricing</span>
            </div>

            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem', fontSize: '1.1rem' }}>
                Flexible pricing plans tailored to your needs. All plans include dedicated support.
            </p>

            <div className="estimated_price">
                {pricing.map((plan, index) => (
                    <div
                        key={plan.id}
                        className="price_card"
                        style={{
                            transform: index === 1 ? 'scale(1.05)' : 'none',
                            border: index === 1 ? '2px solid #23ADAD' : 'none'
                        }}
                    >
                        {index === 1 && (
                            <div style={{
                                background: '#23ADAD',
                                color: '#fff',
                                textAlign: 'center',
                                padding: '0.5rem',
                                borderRadius: '10px',
                                fontSize: '0.8rem',
                                marginBottom: '1rem'
                            }}>
                                MOST POPULAR
                            </div>
                        )}
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
                            <Link href="/contact" className="btn-secondary">Get Started</Link>
                        </div>
                    </div>
                ))}
            </div>

            {pricing.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#6b7280' }}>
                    <i className="bi bi-currency-dollar" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}></i>
                    <p>Pricing information coming soon.</p>
                </div>
            )}

            <div style={{ background: '#fff', borderRadius: '15px', padding: '2rem', marginTop: '3rem', textAlign: 'center' }}>
                <h2 style={{ color: '#2A1D51', marginBottom: '1rem' }}>Need a Custom Quote?</h2>
                <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                    Every project is unique. Contact us for a personalized quote tailored to your specific requirements.
                </p>
                <Link href="/contact" className="btn-primary" style={{ padding: '1rem 2rem' }}>
                    Request Custom Quote
                </Link>
            </div>
        </div>
    );
}
