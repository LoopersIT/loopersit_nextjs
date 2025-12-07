'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import '@/styles/navbar.css';

const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact us', href: '/contact' },
    { name: 'About us', href: '/about' },
];

// LoopersIT Logo SVG Component
function Logo() {
    return (
        <svg className="logoIcon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
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

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="navbar">
            <Link className="logoLink" href="/">
                <div className="svgIcon">
                    <Logo />
                </div>
                <div className="logoLetter">
                    <span className="logoLetter_first">Loopers</span>
                    <span className="logoLetter_second">IT</span>
                </div>
            </Link>

            <div className="navItems">
                <li className="nav_lists">
                    <button className="navItemsMenu_link" onClick={toggleMenu}>
                        <i className={`bi ${menuOpen ? 'bi-x' : 'bi-list'}`}></i>
                    </button>
                    <div className={`menu_list ${menuOpen ? '' : 'hide_nav'}`}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                className={`nav_items_link ${pathname === link.href ? 'active' : ''}`}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </li>
            </div>
        </nav>
    );
}
