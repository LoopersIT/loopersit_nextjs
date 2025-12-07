import '@/styles/services.css';
import '@/styles/about.css';

interface Member {
    id: number;
    role: 'leader' | 'member';
    name: string;
    designation: string | null;
    image: string | null;
    linkedin: string | null;
    github: string | null;
    facebook: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function getTeam(): Promise<Member[]> {
    try {
        const res = await fetch(`${API_URL}/api/members`, { cache: 'no-store' });
        if (!res.ok) return [];
        return res.json();
    } catch {
        return [];
    }
}

export const metadata = {
    title: 'About Us',
    description: 'Learn about LoopersIT and meet our talented team.',
};

export default async function AboutPage() {
    const team = await getTeam();

    return (
        <>
            <section className="page-hero">
                <div className="page-hero-content">
                    <h1>About Us</h1>
                    <p>
                        We&apos;re a passionate team of developers, designers, and
                        strategists dedicated to your success.
                    </p>
                </div>
            </section>

            <div className="page-content">
                {/* About Section */}
                <div className="about-grid">
                    <div className="about-text">
                        <h2>Who We Are</h2>
                        <p>
                            LoopersIT is a leading software development company dedicated to helping
                            businesses succeed in the digital world. Founded with a passion for
                            technology and innovation, we have grown into a team of skilled
                            developers, designers, and strategists.
                        </p>
                        <p>
                            Our mission is to empower businesses with cutting-edge technology,
                            beautiful design, and strategic digital marketing to achieve their
                            goals and grow online.
                        </p>

                        <div className="about-features">
                            <div className="about-feature">
                                <i className="bi bi-lightning-charge"></i>
                                <div>
                                    <h4>Fast Delivery</h4>
                                    <p>Quick turnaround without compromising quality</p>
                                </div>
                            </div>
                            <div className="about-feature">
                                <i className="bi bi-shield-check"></i>
                                <div>
                                    <h4>Quality Focused</h4>
                                    <p>We deliver only the highest quality work</p>
                                </div>
                            </div>
                            <div className="about-feature">
                                <i className="bi bi-headset"></i>
                                <div>
                                    <h4>24/7 Support</h4>
                                    <p>Always here when you need us</p>
                                </div>
                            </div>
                            <div className="about-feature">
                                <i className="bi bi-graph-up-arrow"></i>
                                <div>
                                    <h4>Results Driven</h4>
                                    <p>Focused on achieving your business goals</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="section-header">
                    <span className="section-label">Our Team</span>
                    <h2 className="section-title">Meet the People Behind LoopersIT</h2>
                </div>

                <div className="team-grid">
                    {team.map((member) => (
                        <div key={member.id} className="team-card">
                            <div className="team-card-image">
                                {member.image ? (
                                    <img src={member.image} alt={member.name} />
                                ) : (
                                    <span>{member.name.charAt(0)}</span>
                                )}
                            </div>
                            <div className="team-card-content">
                                {member.role === 'leader' && (
                                    <span className="team-card-badge">Team Lead</span>
                                )}
                                <h3>{member.name}</h3>
                                {member.designation && <p>{member.designation}</p>}
                                <div className="team-social">
                                    {member.linkedin && (
                                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                            <i className="bi bi-linkedin"></i>
                                        </a>
                                    )}
                                    {member.github && (
                                        <a href={member.github} target="_blank" rel="noopener noreferrer">
                                            <i className="bi bi-github"></i>
                                        </a>
                                    )}
                                    {member.facebook && (
                                        <a href={member.facebook} target="_blank" rel="noopener noreferrer">
                                            <i className="bi bi-facebook"></i>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {team.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                        <i className="bi bi-people" style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'block' }}></i>
                        <p style={{ color: 'var(--text-light)' }}>Team information coming soon.</p>
                    </div>
                )}
            </div>
        </>
    );
}
