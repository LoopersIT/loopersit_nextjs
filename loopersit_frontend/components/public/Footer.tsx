import Link from 'next/link';
import '@/styles/footer.css';

interface Page {
    id: number;
    title: string;
    slug: string;
}

// LoopersIT Logo SVG Component
function Logo() {
    return (
        <svg className="footer_logoIcon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <rect width="25.7234" height="25.7234" rx="10" fill="#2A1D51" />
            <rect x="7.71704" y="13.8789" width="5.0747" height="5.0747" transform="rotate(-45 7.71704 13.8789)" fill="#23ADAD" />
            <rect x="13.8906" y="15.9355" width="5.0747" height="5.0747" transform="rotate(-45 13.8906 15.9355)" fill="white" />
            <rect x="11.8328" y="9.76172" width="5.0747" height="5.0747" transform="rotate(-45 11.8328 9.76172)" fill="#23ADAD" />
            <rect x="3.60132" y="9.76172" width="5.0747" height="5.0747" transform="rotate(-45 3.60132 9.76172)" fill="white" />
            <circle cx="12.6045" cy="13.1193" r="11.59" stroke="white" />
            <path d="M19.7482 22.6317L18.1074 24.97L18.3652 23.3874L16.8941 22.7495L19.7482 22.6317Z" fill="white" />
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
        <div className="footer_background">
            <span className="brand_slogan">Your brand, our efforts</span>

            <ul className="footer_icon">
                <li className="footer_icon_list">
                    <a className="footer_icon_link" href="https://facebook.com/loopersit" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-facebook"></i>
                    </a>
                </li>
                <li className="footer_icon_list">
                    <a className="footer_icon_link" href="https://www.linkedin.com/company/loopersit/" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-linkedin"></i>
                    </a>
                </li>
                <li className="footer_icon_list">
                    <a className="footer_icon_link" href="https://x.com/loopersit" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-twitter"></i>
                    </a>
                </li>
                <li className="footer_icon_list">
                    <a className="footer_icon_link" href="https://youtube.com/@loopersit" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-youtube"></i>
                    </a>
                </li>
            </ul>

            <ul className="footer_nav_items">
                <li className="footer_nav_items_list">
                    <Link className="footer_nav_items_link" href="/">Home</Link>
                </li>
                <li className="footer_nav_items_list">
                    <Link className="footer_nav_items_link" href="/about">About</Link>
                </li>
                <li className="footer_nav_items_list">
                    <Link className="footer_nav_items_link" href="/services">Services</Link>
                </li>
                <li className="footer_nav_items_list">
                    <Link className="footer_nav_items_link" href="/contact">Contact us</Link>
                </li>
                <li className="footer_nav_items_list">
                    <Link className="footer_nav_items_link" href="/portfolio">Portfolio</Link>
                </li>
            </ul>

            {extraPages.length > 0 && (
                <ul className="footer_nav_items">
                    {extraPages.map((page) => (
                        <li key={page.id} className="footer_nav_items_list">
                            <Link className="footer_nav_items_link" href={`/page/${page.slug}`}>
                                {page.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            <div className="footer_end">
                <Link className="footer_logoLink" href="/">
                    <div className="footer_svgIcon">
                        <Logo />
                    </div>
                    <div className="footer_logoLetter">
                        <span className="footer_logoLetter_first">Loopers</span>
                        <span className="footer_logoLetter_second">IT</span>
                    </div>
                </Link>
                <span className="credit">Developed by LoopersIT</span>
                <span className="location">
                    Mirpur, Dhaka-1100, Bangladesh
                    <br />
                    <a className="loopers_mail" href="mailto:support@loopersit.com">support@loopersit.com</a>
                </span>
            </div>
        </div>
    );
}
