import Link from 'next/link';
import { FaHome, FaSearch, FaEnvelope } from 'react-icons/fa';

export default function NotFound() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            padding: '2rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <div style={{
                textAlign: 'center',
                maxWidth: '600px'
            }}>
                {/* 404 Number */}
                <div style={{
                    fontSize: 'clamp(100px, 20vw, 180px)',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #23ADAD, #4fd1c5)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1,
                    marginBottom: '1rem',
                    textShadow: '0 0 60px rgba(35, 173, 173, 0.3)'
                }}>
                    404
                </div>

                {/* Title */}
                <h1 style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    color: '#ffffff',
                    marginBottom: '1rem',
                    fontWeight: 700
                }}>
                    Oops! Page Not Found
                </h1>

                {/* Description */}
                <p style={{
                    fontSize: '1.1rem',
                    color: '#94a3b8',
                    marginBottom: '2.5rem',
                    lineHeight: 1.7
                }}>
                    The page you're looking for seems to have wandered off into the digital void.
                    Don't worry, let's get you back on track!
                </p>

                {/* Action Buttons */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <Link href="/" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.875rem 1.75rem',
                        background: 'linear-gradient(135deg, #23ADAD, #1a8a8a)',
                        color: '#ffffff',
                        borderRadius: '50px',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 20px rgba(35, 173, 173, 0.4)'
                    }}>
                        <FaHome /> Go Home
                    </Link>

                    <Link href="/services" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.875rem 1.75rem',
                        background: 'transparent',
                        color: '#23ADAD',
                        border: '2px solid #23ADAD',
                        borderRadius: '50px',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                    }}>
                        <FaSearch /> Browse Services
                    </Link>

                    <Link href="/contact" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.875rem 1.75rem',
                        background: 'transparent',
                        color: '#94a3b8',
                        border: '2px solid #475569',
                        borderRadius: '50px',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                    }}>
                        <FaEnvelope /> Contact Us
                    </Link>
                </div>

                {/* Decorative Elements */}
                <div style={{
                    marginTop: '4rem',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.5rem'
                }}>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: i === 2 ? '#23ADAD' : '#475569',
                            opacity: i === 2 ? 1 : 0.5
                        }} />
                    ))}
                </div>

                {/* Logo */}
                <Link href="/" style={{
                    marginTop: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none'
                }}>
                    <img
                        src="/loopersit_logo_1.png"
                        alt="LoopersIT Logo"
                        style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                    />
                    <div style={{ fontSize: '1.1rem' }}>
                        <span style={{ color: '#23ADAD', fontWeight: 600 }}>Loopers</span>
                        <span style={{ color: '#ffffff', fontWeight: 600, marginLeft: '2px' }}>IT</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}
