import { FaFolder, FaExternalLinkAlt } from 'react-icons/fa';
import '@/styles/services.css';
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
        const data = await res.json();
        return Array.isArray(data) ? data : [];
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
        <>
            <section className="page-hero">
                <div className="page-hero-content">
                    <h1>Our Portfolio</h1>
                    <p>
                        Explore our recent work and see how we&apos;ve helped businesses
                        achieve their digital goals.
                    </p>
                </div>
            </section>

            <div className="page-content">
                <div className="portfolio-masonry">
                    {projects.map((project, index) => (
                        <div key={project.id} className={`portfolio-item ${index === 0 ? 'featured' : ''}`}>
                            <div className="portfolio-image">
                                {project.image ? (
                                    <img src={project.image} alt={project.title} />
                                ) : (
                                    <div className="portfolio-placeholder">
                                        <FaFolder />
                                    </div>
                                )}
                                <div className="portfolio-overlay">
                                    <span className="portfolio-duration-badge">{project.duration}</span>
                                </div>
                            </div>
                            <div className="portfolio-content">
                                <h3>{project.title}</h3>
                                <p>{project.detail}</p>
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="portfolio-link">
                                        View Project <FaExternalLinkAlt size={12} />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {projects.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                        <FaFolder style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '1rem' }} />
                        <p style={{ color: 'var(--text-light)' }}>No portfolio items yet.</p>
                    </div>
                )}
            </div>
        </>
    );
}
