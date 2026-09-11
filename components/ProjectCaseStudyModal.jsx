'use client';

import React, { useEffect } from 'react';
import { PREMIUM_MESS_DATA } from '@/lib/data';

export default function ProjectCaseStudyModal({ isOpen, onClose }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="case-modal__backdrop" onClick={onClose} role="dialog" aria-modal="true">
            <div className="case-modal__container" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="case-modal__header">
                    <div className="case-modal__header-left">
                        <span className="case-modal__pill">
                            <span className="case-modal__pill-dot" />
                            Dubai Client Project • Production Live
                        </span>
                        <h2 className="case-modal__title">{PREMIUM_MESS_DATA.title}</h2>
                        <p className="case-modal__subtitle">
                            Full-Stack SaaS engineered by <strong>Suresh</strong> • Next.js 16, TypeScript, PostgreSQL, Prisma &amp; Tailwind CSS
                        </p>
                    </div>

                    <div className="case-modal__header-actions">
                        <a
                            href={PREMIUM_MESS_DATA.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="case-modal__btn case-modal__btn--primary"
                        >
                            <span>Visit Live Site</span>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="7" y1="17" x2="17" y2="7" />
                                <polyline points="7 7 17 7 17 17" />
                            </svg>
                        </a>
                        <button className="case-modal__close-btn" onClick={onClose} aria-label="Close modal">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Modal Body */}
                <div className="case-modal__body">
                    {/* Live Screenshot Showcase with Browser Chrome */}
                    <div className="case-modal__browser-frame">
                        <div className="case-modal__browser-bar">
                            <div className="case-modal__browser-dots">
                                <span className="case-modal__dot case-modal__dot--red" />
                                <span className="case-modal__dot case-modal__dot--yellow" />
                                <span className="case-modal__dot case-modal__dot--green" />
                            </div>
                            <div className="case-modal__browser-url">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                <span>https://premiummess.com/</span>
                            </div>
                            <a
                                href={PREMIUM_MESS_DATA.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="case-modal__browser-ext"
                            >
                                Open ↗
                            </a>
                        </div>
                        <img
                            src={PREMIUM_MESS_DATA.heroImage}
                            alt="Premium Mess live platform screenshot"
                            className="case-modal__screenshot"
                        />
                    </div>

                    {/* Impact Metrics Grid */}
                    <div className="case-modal__metrics-grid">
                        {PREMIUM_MESS_DATA.metrics.map((m, idx) => (
                            <div key={idx} className="case-modal__metric-card">
                                <span className="case-modal__metric-val">{m.value}</span>
                                <span className="case-modal__metric-lbl">{m.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Executive Problem & Value Proposition */}
                    <div className="case-modal__section">
                        <h3 className="case-modal__section-heading">
                            <span>01</span> The Problem &amp; Business Solution
                        </h3>
                        <p className="case-modal__section-desc">
                            In urban hubs like Dubai, UAE, traditional meal subscription (&quot;mess&quot;) providers suffer from messy manual WhatsApp coordination, untracked cash-on-delivery payments, uncounted Sunday feasts, and 15–20% food waste due to guesswork in kitchen prep.
                        </p>
                        
                        <div className="case-modal__table-wrap">
                            <table className="case-modal__table">
                                <thead>
                                    <tr>
                                        <th>Operational Dimension</th>
                                        <th>Traditional Tiffin Operations</th>
                                        <th>With Premium Mess Platform</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Order Placement</strong></td>
                                        <td>WhatsApp texts &amp; messy phone calls</td>
                                        <td><span className="case-modal__highlight-cell">Self-serve web portal with live menu previews</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Menu Customization</strong></td>
                                        <td>Fixed static menu with zero choice</td>
                                        <td><span className="case-modal__highlight-cell">Day-by-day dish selection across Lunch &amp; Dinner</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Dual Delivery Addresses</strong></td>
                                        <td>Mixed up paper notes &amp; lost food</td>
                                        <td><span className="case-modal__highlight-cell">Native split-routing (Brunch/Lunch at office, Dinner at apartment)</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Weekend / Feast Logic</strong></td>
                                        <td>Manual counting of Sundays &amp; revenue leaks</td>
                                        <td><span className="case-modal__highlight-cell">Dynamic calculation separating 26 workdays from Sunday feast add-ons</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Invoicing &amp; Billing</strong></td>
                                        <td>End-of-month manual calculations</td>
                                        <td><span className="case-modal__highlight-cell">Automated serverless Chromium PDF invoices with instant email receipts</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Core System Architecture */}
                    <div className="case-modal__section">
                        <h3 className="case-modal__section-heading">
                            <span>02</span> Technical Architecture &amp; System Flow
                        </h3>
                        <div className="case-modal__arch-grid">
                            <div className="case-modal__arch-card">
                                <div className="case-modal__arch-tag">PRESENTATION LAYER</div>
                                <h4>Next.js 16 App Router</h4>
                                <p>Hybrid Server-Side Rendering (SSR) for blazing SEO &amp; fast initial page loads. NextAuth.js credentials provider with JWT session management.</p>
                            </div>
                            <div className="case-modal__arch-card">
                                <div className="case-modal__arch-tag">DATA &amp; ORM</div>
                                <h4>PostgreSQL + Prisma ORM</h4>
                                <p>Relational integrity across customers, orders, menu categories, and system settings. Cascade handling and zero-downtime migrations.</p>
                            </div>
                            <div className="case-modal__arch-card">
                                <div className="case-modal__arch-tag">BUSINESS LOGIC</div>
                                <h4>Dynamic Scheduling &amp; Routing</h4>
                                <p>30-day projection algorithm mapping customer slot choices, handling Sunday feast add-ons, and generating day-level kitchen manifests.</p>
                            </div>
                            <div className="case-modal__arch-card">
                                <div className="case-modal__arch-tag">SERVERLESS RENDERING</div>
                                <h4>Headless Puppeteer PDF Engine</h4>
                                <p>Dedicated print route rendered via @sparticuz/chromium generating vectorized, tax-compliant A4 PDF invoices with QR verification.</p>
                            </div>
                        </div>
                    </div>

                    {/* Engineering Challenges Solved */}
                    <div className="case-modal__section">
                        <h3 className="case-modal__section-heading">
                            <span>03</span> Engineering Challenges &amp; Solutions
                        </h3>
                        <div className="case-modal__challenges-list">
                            <div className="case-modal__challenge-item">
                                <div className="case-modal__challenge-num">01</div>
                                <div className="case-modal__challenge-content">
                                    <h4>Dynamic Date &amp; Recurring Schedule Matrix</h4>
                                    <p>
                                        <strong>Challenge:</strong> Unlike standard e-commerce carts with static item quantities, meal subscriptions span a dynamic 30-day rolling timeline with weekend exclusions and meal slot variations (Lunch only vs. Lunch + Dinner).
                                    </p>
                                    <p>
                                        <strong>Solution:</strong> Engineered a reactive scheduling resolver calculating rolling dates from <code>startDate</code>, isolating Sundays as modular add-ons, and persisting active fulfillment dates in PostgreSQL as <code>activeDates: string[]</code>.
                                    </p>
                                </div>
                            </div>

                            <div className="case-modal__challenge-item">
                                <div className="case-modal__challenge-num">02</div>
                                <div className="case-modal__challenge-content">
                                    <h4>Pixel-Perfect Server-Side PDF Invoicing</h4>
                                    <p>
                                        <strong>Challenge:</strong> Client-side canvas utilities frequently distort layouts and fail to embed Arabic/regional typography accurately for official UAE tax receipts.
                                    </p>
                                    <p>
                                        <strong>Solution:</strong> Built an isolated Next.js print route (<code>/invoice/print/[id]</code>) using <code>@media print</code> CSS. Triggered on-demand through ephemeral Chromium instances, delivering crisp, vectorized PDF receipts instantly to customer inboxes.
                                    </p>
                                </div>
                            </div>

                            <div className="case-modal__challenge-item">
                                <div className="case-modal__challenge-num">03</div>
                                <div className="case-modal__challenge-content">
                                    <h4>Frictionless Guest-to-Authenticated Checkout</h4>
                                    <p>
                                        <strong>Challenge:</strong> Requiring customer registration upfront before custom meal selection caused a severe 60%+ checkout drop-off rate.
                                    </p>
                                    <p>
                                        <strong>Solution:</strong> Implemented client-side cached dish selection. At final confirmation, NextAuth seamlessly verifies or creates the account, transitions session tokens, and dispatches the order payload without losing user selections.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tech Stack Badges */}
                    <div className="case-modal__section">
                        <h3 className="case-modal__section-heading">
                            <span>04</span> Technology Ecosystem
                        </h3>
                        <div className="case-modal__tech-tags">
                            {PREMIUM_MESS_DATA.stack.map((t, idx) => (
                                <span key={idx} className="case-modal__tech-tag">{t}</span>
                            ))}
                        </div>
                    </div>

                    {/* Modal Bottom CTA */}
                    <div className="case-modal__footer-cta">
                        <div className="case-modal__footer-cta-text">
                            <h4>Interested in building a production SaaS or custom ERP?</h4>
                            <p>Available for freelance contracts, full-stack MVPs, and enterprise architecture.</p>
                        </div>
                        <div className="case-modal__footer-btns">
                            <a
                                href={PREMIUM_MESS_DATA.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="case-modal__btn case-modal__btn--primary"
                            >
                                Open Live Client Site ↗
                            </a>
                            <a
                                href="https://wa.me/919361880749"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="case-modal__btn case-modal__btn--secondary"
                            >
                                Chat on WhatsApp 💬
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
