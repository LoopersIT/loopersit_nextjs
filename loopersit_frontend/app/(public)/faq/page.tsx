'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import '@/styles/services.css';

interface FAQ {
    id: number;
    question: string;
    answer: string;
}

export default function FAQPage() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [openId, setOpenId] = useState<number | null>(null);

    useEffect(() => {
        fetch('/api/faqs')
            .then(res => res.json())
            .then(data => {
                setFaqs(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => {
                setFaqs([]);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <>
                <section className="page-hero">
                    <div className="page-hero-content">
                        <h1>FAQ</h1>
                        <p>Frequently asked questions</p>
                    </div>
                </section>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                    <div style={{ width: '40px', height: '40px', border: '3px solid #e5e7eb', borderTop: '3px solid #23ADAD', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                </div>
            </>
        );
    }

    return (
        <>
            <section className="page-hero">
                <div className="page-hero-content">
                    <h1>Frequently Asked Questions</h1>
                    <p>
                        Find answers to common questions about our services,
                        process, and how we work.
                    </p>
                </div>
            </section>

            <div className="page-content" style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {faqs.map((faq) => (
                        <div
                            key={faq.id}
                            style={{
                                background: 'var(--white)',
                                borderRadius: 'var(--radius-lg)',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow)'
                            }}
                        >
                            <button
                                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                style={{
                                    width: '100%',
                                    padding: '1.25rem 1.5rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    background: openId === faq.id ? 'var(--primary)' : 'var(--white)',
                                    color: openId === faq.id ? 'var(--white)' : 'var(--text)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    textAlign: 'left',
                                    transition: 'var(--transition)',
                                    fontFamily: 'inherit'
                                }}
                            >
                                {faq.question}
                                <i
                                    className={`bi ${openId === faq.id ? 'bi-dash-lg' : 'bi-plus-lg'}`}
                                    style={{
                                        fontSize: '1.25rem',
                                        color: openId === faq.id ? 'var(--secondary)' : 'var(--text-muted)',
                                        flexShrink: 0,
                                        marginLeft: '1rem'
                                    }}
                                ></i>
                            </button>
                            {openId === faq.id && (
                                <div
                                    style={{
                                        padding: '1.5rem',
                                        color: 'var(--text-light)',
                                        lineHeight: 1.7,
                                        borderTop: '1px solid var(--border)'
                                    }}
                                >
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {faqs.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--white)', borderRadius: 'var(--radius-lg)' }}>
                        <i className="bi bi-question-circle" style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'block' }}></i>
                        <p style={{ color: 'var(--text-light)' }}>No FAQs available yet.</p>
                    </div>
                )}

                {/* CTA */}
                <div style={{
                    background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
                    borderRadius: 'var(--radius-lg)',
                    padding: '3rem 2rem',
                    marginTop: '3rem',
                    textAlign: 'center',
                    color: 'var(--white)'
                }}>
                    <h2 style={{ marginBottom: '0.75rem' }}>Still have questions?</h2>
                    <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
                        Can&apos;t find what you&apos;re looking for? We&apos;re here to help!
                    </p>
                    <Link href="/contact" className="btn btn-white">
                        Contact Support
                    </Link>
                </div>
            </div>
        </>
    );
}
