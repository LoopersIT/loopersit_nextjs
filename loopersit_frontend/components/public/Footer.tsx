import Link from 'next/link';
import '@/styles/footer.css';

interface Page {
    id: number;
    title: string;
    slug: string;
}

function FooterLogo() {
    return (
        <svg className="footer-logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="12" fill="#3d2f6b" />
            <rect x="12" y="22" width="8" height="8" transform="rotate(-45 12 22)" fill="#23ADAD" />
            <rect x="22" y="25" width="8" height="8" transform="rotate(-45 22 25)" fill="white" />
            <rect x="18.5" y="15" width="8" height="8" transform="rotate(-45 18.5 15)" fill="#23ADAD" />
            <rect x="5.5" y="15" width="8" height="8" transform="rotate(-45 5.5 15)" fill="white" />
        </svg>
    );
}

async function getFooterPages(): Promise<Page[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/pages`, {
            cache: 'no-store',
        });
        if (!res.ok) return [];
        const pages = await res.json();
        return pages.filter((p: Page & { linkOnFooter?: boolean }) => p.linkOnFooter);
    } catch {
        return [];
    }
}

export default async function Footer() {
    const extraPages = await getFooterPages();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <FooterLogo />
                            <span className="footer-logo-text">Loopers<span>IT</span></span>
                        </div>
                        <p className="footer-tagline">Your brand, our efforts</p>
                        <p className="footer-description">
                            We create responsive, custom websites and implement digital marketing strategies to drive business growth online.
                        </p>
                        <div className="footer-social">
                            <a href="https://facebook.com/loopersit" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="https://linkedin.com/company/loopersit" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <i className="bi bi-linkedin"></i>
                            </a>
                            <a href="https://twitter.com/loopersit" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <i className="bi bi-twitter-x"></i>
                            </a>
                            <a href="https://youtube.com/@loopersit" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                <i className="bi bi-youtube"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links-section">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/services">Services</Link></li>
                            <li><Link href="/portfolio">Portfolio</Link></li>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer-links-section">
                        <h4>Services</h4>
                        <ul className="footer-links">
                            <li><Link href="/services">Web Development</Link></li>
                            <li><Link href="/services">Mobile Apps</Link></li>
                            <li><Link href="/services">UI/UX Design</Link></li>
                            <li><Link href="/pricing">Pricing</Link></li>
                            <li><Link href="/faq">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-links-section">
                        <h4>Contact</h4>
                        <div className="footer-contact-item">
                            <i className="bi bi-geo-alt"></i>
                            <span>Mirpur, Dhaka-1100<br />Bangladesh</span>
                        </div>
                        <div className="footer-contact-item">
                            <i className="bi bi-envelope"></i>
                            <a href="mailto:support@loopersit.com">support@loopersit.com</a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {new Date().getFullYear()} LoopersIT. All rights reserved.
                    </p>
                    <div className="footer-bottom-links">
                        {extraPages.map((page) => (
                            <Link key={page.id} href={`/page/${page.slug}`}>
                                {page.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
