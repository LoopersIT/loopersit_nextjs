import '@/styles/services.css';
import '@/styles/homepage.css';

interface Review {
    id: number;
    name: string;
    designation: string;
    review: string;
    image: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function getReviews(): Promise<Review[]> {
    try {
        const res = await fetch(`${API_URL}/api/reviews`, { cache: 'no-store' });
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

export const metadata = {
    title: 'Reviews',
    description: 'See what our clients say about working with LoopersIT.',
};

export default async function ReviewsPage() {
    const reviews = await getReviews();

    return (
        <>
            <section className="page-hero">
                <div className="page-hero-content">
                    <h1>Client Reviews</h1>
                    <p>
                        Real feedback from real clients. See what they have to say
                        about working with us.
                    </p>
                </div>
            </section>

            <div className="page-content">
                <div className="reviews-grid" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    {reviews.map((review) => (
                        <div key={review.id} className="review-card">
                            <p className="review-text">{review.review}</p>
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

                {reviews.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                        <i className="bi bi-chat-quote" style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'block' }}></i>
                        <p style={{ color: 'var(--text-light)' }}>No reviews yet.</p>
                    </div>
                )}
            </div>
        </>
    );
}
