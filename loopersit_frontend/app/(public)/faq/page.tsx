'use client';

import { useState, useEffect } from 'react';
import '@/styles/base.css';

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
                setFaqs(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const toggleFaq = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid #f3f3f3', borderTop: '3px solid #23ADAD', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
        );
    }

    return (
        <div style={{ padding: '1rem', maxWidth: '900px', margin: '0 auto' }}>
            <div className="category_name">
                <span className="first_cat">Frequently</span>
                <span className="second_cat">Asked Questions</span>
            </div>

            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem' }}>
                Find answers to common questions about our services and process.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {faqs.map((faq) => (
                    <div
                        key={faq.id}
                        style={{
                            background: '#fff',
                            borderRadius: '15px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                        }}
                    >
                        <button
                            onClick={() => toggleFaq(faq.id)}
                            style={{
                                width: '100%',
                                padding: '1.25rem 1.5rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: openId === faq.id ? '#2A1D51' : '#fff',
                                color: openId === faq.id ? '#fff' : '#1f2937',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: 500,
                                textAlign: 'left',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {faq.question}
                            <i
                                className={`bi ${openId === faq.id ? 'bi-dash' : 'bi-plus'}`}
                                style={{ fontSize: '1.5rem', color: openId === faq.id ? '#23ADAD' : '#6b7280' }}
                            ></i>
                        </button>
                        {openId === faq.id && (
                            <div
                                style={{
                                    padding: '1.5rem',
                                    color: '#4b5563',
                                    lineHeight: 1.7,
                                    borderTop: '1px solid #e5e7eb'
                                }}
                            >
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {faqs.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#6b7280', background: '#fff', borderRadius: '15px' }}>
                    <i className="bi bi-question-circle" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}></i>
                    <p>No FAQs available yet.</p>
                </div>
            )}

            <div style={{ background: 'linear-gradient(135deg, #2A1D51, #23ADAD)', borderRadius: '15px', padding: '2rem', marginTop: '3rem', textAlign: 'center', color: '#fff' }}>
                <h2 style={{ marginBottom: '1rem' }}>Still have questions?</h2>
                <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
                    Can&apos;t find what you&apos;re looking for? We&apos;re here to help!
                </p>
                <a href="/contact" className="btn-secondary" style={{ background: '#fff', color: '#2A1D51' }}>
                    Contact Support
                </a>
            </div>
        </div>
    );
}
