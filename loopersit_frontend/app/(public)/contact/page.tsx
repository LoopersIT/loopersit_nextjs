'use client';

import { useState } from 'react';
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

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        // In production, you would send this to your API
        console.log('Form submitted:', formData);

        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });

        setTimeout(() => setStatus('idle'), 3000);
    };

    return (
        <div className="contact-container">
            <div className="category_name">
                <span className="first_cat">Contact</span>
                <span className="second_cat">Us</span>
            </div>

            <div className="contact-wrapper">
                <div className="contact-info">
                    <h2>Get in Touch</h2>

                    <div className="contact-item">
                        <div className="contact-icon">
                            <i className="bi bi-geo-alt"></i>
                        </div>
                        <div className="contact-item-content">
                            <h3>Address</h3>
                            <p>Mirpur, Dhaka-1100, Bangladesh</p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-icon">
                            <i className="bi bi-envelope"></i>
                        </div>
                        <div className="contact-item-content">
                            <h3>Email</h3>
                            <a href="mailto:support@loopersit.com">support@loopersit.com</a>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-icon">
                            <i className="bi bi-phone"></i>
                        </div>
                        <div className="contact-item-content">
                            <h3>Phone</h3>
                            <a href="tel:+8801XXX">+880 1XXX-XXXXXX</a>
                        </div>
                    </div>

                    <div className="contact-social">
                        <a href="https://facebook.com/loopersit" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-facebook"></i>
                        </a>
                        <a href="https://linkedin.com/company/loopersit" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-linkedin"></i>
                        </a>
                        <a href="https://twitter.com/loopersit" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-twitter"></i>
                        </a>
                    </div>
                </div>

                <div className="contact-form">
                    <h2>Send us a Message</h2>
                    <form onSubmit={handleSubmit}>
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

                        <button type="submit" className="submit-btn" disabled={status === 'sending'}>
                            {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                        </button>

                        {status === 'success' && (
                            <p style={{ color: '#23ADAD', marginTop: '1rem', textAlign: 'center' }}>
                                Thank you! We&apos;ll get back to you soon.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
