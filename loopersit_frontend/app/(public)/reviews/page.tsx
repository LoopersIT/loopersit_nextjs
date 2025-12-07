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
        return res.json();
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
        <div style={{ padding: '1rem', maxWidth: '1000px', margin: '0 auto' }}>
            <div className="category_name">
                <span className="first_cat">Client</span>
                <span className="second_cat">Reviews</span>
            </div>

            <div className="review_wrapper" style={{ margin: '0' }}>
                {reviews.map((review) => (
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
                        <div className="review_text">{review.review}</div>
                    </div>
                ))}

                {reviews.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#6b7280' }}>
                        <i className="bi bi-chat-quote" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}></i>
                        <p>No reviews yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
