import { FaLinkedinIn, FaGithub, FaFacebookF, FaBolt, FaShieldAlt, FaHeadset, FaChartLine } from 'react-icons/fa';
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
    const leaders = team.filter(m => m.role === 'leader');
    const members = team.filter(m => m.role === 'member');

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
                {/* Intro */}
                <div className="about-intro">
                    <h2>Who We Are</h2>
                    <p>
                        LoopersIT is a leading software development company dedicated to helping
                        businesses succeed in the digital world. Founded with a passion for
                        technology and innovation, we have grown into a team of skilled
                        developers, designers, and strategists who work together to deliver
                        exceptional digital solutions.
                    </p>
                </div>

                {/* Features */}
                <div className="about-features">
                    <div className="about-feature">
                        <div className="about-feature-icon">
                            <FaBolt />
                        </div>
                        <div>
                            <h4>Fast Delivery</h4>
                            <p>Quick turnaround without compromising quality</p>
                        </div>
                    </div>
                    <div className="about-feature">
                        <div className="about-feature-icon">
                            <FaShieldAlt />
                        </div>
                        <div>
                            <h4>Quality Focused</h4>
                            <p>We deliver only the highest quality work</p>
                        </div>
                    </div>
                    <div className="about-feature">
                        <div className="about-feature-icon">
                            <FaHeadset />
                        </div>
                        <div>
                            <h4>24/7 Support</h4>
                            <p>Always here when you need us</p>
                        </div>
                    </div>
                    <div className="about-feature">
                        <div className="about-feature-icon">
                            <FaChartLine />
                        </div>
                        <div>
                            <h4>Results Driven</h4>
                            <p>Focused on achieving your business goals</p>
                        </div>
                    </div>
                </div>

                {/* Team Lead Section with Glass Cards */}
                {leaders.length > 0 && (
                    <div className="team-lead-section">
                        <div className="section-header">
                            <span className="section-label">Leadership</span>
                            <h2 className="section-title">Meet Our Leaders</h2>
                        </div>

                        <div className="team-lead-grid">
                            {leaders.map((leader) => (
                                <div key={leader.id} className="team-lead-card">
                                    <div className="team-lead-image-wrapper">
                                        {leader.image ? (
                                            <img src={leader.image} alt={leader.name} />
                                        ) : (
                                            <span>{leader.name.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div className="team-lead-content">
                                        <span className="team-lead-badge">Team Lead</span>
                                        <h3>{leader.name}</h3>
                                        {leader.designation && <p>{leader.designation}</p>}
                                        <div className="team-lead-social">
                                            {leader.linkedin && (
                                                <a href={leader.linkedin} target="_blank" rel="noopener noreferrer">
                                                    <FaLinkedinIn />
                                                </a>
                                            )}
                                            {leader.github && (
                                                <a href={leader.github} target="_blank" rel="noopener noreferrer">
                                                    <FaGithub />
                                                </a>
                                            )}
                                            {leader.facebook && (
                                                <a href={leader.facebook} target="_blank" rel="noopener noreferrer">
                                                    <FaFacebookF />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Team Members Section */}
                {members.length > 0 && (
                    <div className="team-members-section">
                        <div className="section-header">
                            <span className="section-label">Our Team</span>
                            <h2 className="section-title">Meet the Team</h2>
                        </div>

                        <div className="team-members-grid">
                            {members.map((member) => (
                                <div key={member.id} className="team-member-card">
                                    <div className="team-member-image-wrapper">
                                        {member.image ? (
                                            <img src={member.image} alt={member.name} />
                                        ) : (
                                            <span>{member.name.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div className="team-member-content">
                                        <h3>{member.name}</h3>
                                        {member.designation && <span className="designation">{member.designation}</span>}
                                        <div className="team-member-social">
                                            {member.linkedin && (
                                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                                    <FaLinkedinIn />
                                                </a>
                                            )}
                                            {member.github && (
                                                <a href={member.github} target="_blank" rel="noopener noreferrer">
                                                    <FaGithub />
                                                </a>
                                            )}
                                            {member.facebook && (
                                                <a href={member.facebook} target="_blank" rel="noopener noreferrer">
                                                    <FaFacebookF />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {team.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                        <p style={{ color: 'var(--text-light)' }}>Team information coming soon.</p>
                    </div>
                )}
            </div>
        </>
    );
}
