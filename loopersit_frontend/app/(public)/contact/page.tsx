'use client';

import { useRef, useState } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaClock, FaFacebookF, FaLinkedinIn, FaCheckCircle, FaPaperPlane } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import '@/styles/services.css';
import '@/styles/contact.css';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const turnstileRef = useRef<TurnstileInstance>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!turnstileToken) {
            return; // Widget not yet verified — shouldn't happen in normal flow
        }

        setStatus('sending');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    website: '',           // honeypot — always empty from the real form
                    cfTurnstileToken: turnstileToken,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTurnstileToken(null);
                turnstileRef.current?.reset();
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                console.error('Submission error:', data);
                setStatus('error');
                setTurnstileToken(null);
                turnstileRef.current?.reset();
                setTimeout(() => setStatus('idle'), 4000);
            }
        } catch (error) {
            console.error('Network error:', error);
            setStatus('error');
            setTurnstileToken(null);
            turnstileRef.current?.reset();
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    return (
        <>
            <section className="page-hero">
                <div className="page-hero-content">
                    <h1>Contact Us</h1>
                    <p>
                        Have a project in mind? Let&apos;s discuss how we can help bring
                        your vision to life.
                    </p>
                </div>
            </section>

            <div className="page-content">
                <div className="contact-grid">
                    {/* Contact Info */}
                    <div className="contact-info">
                        <h2>Get in Touch</h2>
                        <p>We&apos;d love to hear from you. Here&apos;s how you can reach us.</p>

                        <div className="contact-item">
                            <div className="contact-item-icon">
                                <FaMapMarkerAlt />
                            </div>
                            <div className="contact-item-content">
                                <h4>Address</h4>
                                <p>Mirpur, Dhaka-1100<br />Bangladesh</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-item-icon">
                                <FaEnvelope />
                            </div>
                            <div className="contact-item-content">
                                <h4>Email</h4>
                                <a href="mailto:support@loopersit.com">support@loopersit.com</a>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-item-icon">
                                <FaClock />
                            </div>
                            <div className="contact-item-content">
                                <h4>Working Hours</h4>
                                <p>Sun - Thu: 10AM - 6PM</p>
                            </div>
                        </div>

                        <div className="contact-social">
                            <a href="https://facebook.com/loopersit" target="_blank" rel="noopener noreferrer">
                                <FaFacebookF />
                            </a>
                            <a href="https://linkedin.com/company/loopersit" target="_blank" rel="noopener noreferrer">
                                <FaLinkedinIn />
                            </a>
                            <a href="https://twitter.com/loopersit" target="_blank" rel="noopener noreferrer">
                                <FaXTwitter />
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form">
                        <h2>Send a Message</h2>
                        <p>Fill out the form below and we&apos;ll get back to you within 24 hours.</p>

                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Your Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Your Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message *</label>
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    placeholder="Tell us about your project..."
                                ></textarea>
                            </div>

                            {/* Honeypot field — hidden from humans, bots will fill it */}
                            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
                                <input
                                    type="text"
                                    name="website"
                                    tabIndex={-1}
                                    autoComplete="off"
                                />
                            </div>

                            {/* Cloudflare Turnstile CAPTCHA */}
                            <div style={{ margin: '1rem 0' }}>
                                <Turnstile
                                    ref={turnstileRef}
                                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                                    onSuccess={(token) => setTurnstileToken(token)}
                                    onExpire={() => setTurnstileToken(null)}
                                    onError={() => setTurnstileToken(null)}
                                    options={{ theme: 'auto' }}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary form-submit"
                                disabled={status === 'sending' || !turnstileToken}
                            >
                                {status === 'sending' ? (
                                    'Sending...'
                                ) : (
                                    <>
                                        <FaPaperPlane style={{ marginRight: '0.5rem' }} /> Send Message
                                    </>
                                )}
                            </button>

                            {status === 'success' && (
                                <div className="form-success">
                                    <FaCheckCircle /> Thank you! We&apos;ll get back to you soon.
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="form-error" style={{ textAlign: 'center', marginTop: '1rem', color: '#ef4444', padding: '1rem', background: '#fee2e2', borderRadius: 'var(--radius)' }}>
                                    Something went wrong. Please try again.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
