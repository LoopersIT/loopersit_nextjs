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
        <div className="about-container">
            <div className="category_name">
                <span className="first_cat">About</span>
                <span className="second_cat">Us</span>
            </div>

            <div className="about-intro">
                <h1>Who We Are</h1>
                <p>
                    LoopersIT is a leading software development company dedicated to helping businesses
                    succeed in the digital world. Founded with a passion for technology and innovation,
                    we have grown into a team of skilled developers, designers, and strategists who work
                    together to deliver exceptional digital solutions.
                </p>
                <p style={{ marginTop: '1rem' }}>
                    Our mission is to empower businesses with cutting-edge technology, beautiful design,
                    and strategic digital marketing to achieve their goals and grow online.
                </p>
            </div>

            <div className="category_name">
                <span className="first_cat">Our</span>
                <span className="second_cat">Team</span>
            </div>

            <div className="team-grid">
                {team.map((member) => (
                    <div key={member.id} className={`team-card ${member.role === 'leader' ? 'leader' : ''}`}>
                        {member.image ? (
                            <img className="team-image" src={member.image} alt={member.name} />
                        ) : (
                            <div className="team-image">
                                {member.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className="team-content">
                            {member.role === 'leader' && (
                                <span className="team-role-badge">Team Leader</span>
                            )}
                            <h3 className="team-name">{member.name}</h3>
                            {member.designation && (
                                <p className="team-designation">{member.designation}</p>
                            )}
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
                <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#6b7280' }}>
                    <i className="bi bi-people" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}></i>
                    <p>Team information coming soon.</p>
                </div>
            )}
        </div>
    );
}
