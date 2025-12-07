'use client';

import { useState } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaClock, FaFacebookF, FaLinkedinIn, FaCheckCircle, FaPaperPlane } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Form submitted:', formData);
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
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

                            <button type="submit" className="btn btn-primary form-submit" disabled={status === 'sending'}>
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
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
