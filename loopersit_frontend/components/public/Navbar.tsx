'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import '@/styles/navbar.css';

const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'FAQ', href: '/faq' },
];

function Logo() {
    return (
        <svg className="logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="12" fill="#2A1D51" />
            <rect x="12" y="22" width="8" height="8" transform="rotate(-45 12 22)" fill="#23ADAD" />
            <rect x="22" y="25" width="8" height="8" transform="rotate(-45 22 25)" fill="white" />
            <rect x="18.5" y="15" width="8" height="8" transform="rotate(-45 18.5 15)" fill="#23ADAD" />
            <rect x="5.5" y="15" width="8" height="8" transform="rotate(-45 5.5 15)" fill="white" />
        </svg>
    );
}

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="navbar-container">
                    <Link className="logo" href="/" onClick={closeMenu}>
                        <Logo />
                        <span className="logo-text">
                            <span className="logo-text-primary">Loopers</span>
                            <span className="logo-text-secondary">IT</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="nav-links">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                                    href={link.href}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="nav-cta">
                        <Link href="/contact" className="btn btn-primary">
                            Contact Us
                        </Link>
                    </div>

                    {/* Hamburger Button */}
                    <button
                        className={`menu-toggle ${menuOpen ? 'active' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                <ul className="mobile-nav-links">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                className={`mobile-nav-link ${pathname === link.href ? 'active' : ''}`}
                                href={link.href}
                                onClick={closeMenu}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="mobile-cta">
                    <Link href="/contact" className="btn btn-primary" onClick={closeMenu}>
                        Contact Us
                    </Link>
                </div>
            </div>

            <div className="navbar-spacer"></div>
        </>
    );
}
