import '@/styles/portfolio.css';

interface Portfolio {
    id: number;
    title: string;
    duration: string;
    detail: string;
    image: string | null;
    link: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function getPortfolio(): Promise<Portfolio[]> {
    try {
        const res = await fetch(`${API_URL}/api/portfolio`, { cache: 'no-store' });
        if (!res.ok) return [];
        return res.json();
    } catch {
        return [];
    }
}

export const metadata = {
    title: 'Portfolio',
    description: 'Check out our latest projects and case studies.',
};

export default async function PortfolioPage() {
    const projects = await getPortfolio();

    return (
        <div className="portfolio-container">
            <div className="category_name">
                <span className="first_cat">Our</span>
                <span className="second_cat">Portfolio</span>
            </div>

            <div className="portfolio-grid">
                {projects.map((project) => (
                    <div key={project.id} className="portfolio-card">
                        {project.image ? (
                            <img className="portfolio-image" src={project.image} alt={project.title} />
                        ) : (
                            <div className="portfolio-image">
                                <i className="bi bi-folder"></i>
                            </div>
                        )}
                        <div className="portfolio-content">
                            <h2 className="portfolio-title">{project.title}</h2>
                            <span className="portfolio-duration">{project.duration}</span>
                            <p className="portfolio-detail">{project.detail}</p>
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="portfolio-link">
                                    <i className="bi bi-box-arrow-up-right"></i> Visit Project
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {projects.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#6b7280' }}>
                    <i className="bi bi-folder" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}></i>
                    <p>No portfolio items yet.</p>
                </div>
            )}
        </div>
    );
}
