'use client';

import React from 'react';
import '@/app/styles/morph-card.css';

// SVG Icon Map for Project Domains
const PROJECT_ICONS = {
    server: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
            <line x1="6" y1="6" x2="6.01" y2="6" />
            <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
    ),
    database: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
    ),
    code: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </svg>
    ),
    cloud: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
    ),
    ai: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4" />
            <path d="m4.93 4.93 2.83 2.83" />
            <path d="M2 12h4" />
            <path d="m4.93 19.07 2.83-2.83" />
            <path d="M12 22v-4" />
            <path d="m19.07 19.07-2.83-2.83" />
            <path d="M22 12h-4" />
            <path d="m19.07 4.93-2.83 2.83" />
            <circle cx="12" cy="12" r="4" />
        </svg>
    ),
};

function hexToRgb(hex) {
    if (!hex) return '245, 105, 60';
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map((x) => x + x).join('');
    const num = parseInt(c, 16);
    if (isNaN(num)) return '245, 105, 60';
    return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
}

// Curated theme palettes matched to project colors from the portfolio's UI design system
const PROJECT_THEMES = {
    // SkyNet: Cloud Logistics Green (UI Token: --color-green #29725f)
    '#29725f': {
        panelStart: '#1e5648',
        panelEnd: '#133a30',
        cardHoverBg: '#29725f',
        glow: 'rgba(41, 114, 95, 0.45)',
        badgeText: '#a4ebd2',
    },
    // Marksorting: Platform ERP Orange (UI Token: --color-orange #f5693c)
    '#f5693c': {
        panelStart: '#d65125',
        panelEnd: '#ac3a14',
        cardHoverBg: '#f5693c',
        glow: 'rgba(245, 105, 60, 0.45)',
        badgeText: '#ffe3d8',
    },
    // Premium Mess: Dubai SaaS Blue (UI Token: --color-lightblue #82a0ff)
    '#82a0ff': {
        panelStart: '#2d50d6',
        panelEnd: '#1a359c',
        cardHoverBg: '#476df0',
        glow: 'rgba(68, 106, 240, 0.45)',
        badgeText: '#d7e3ff',
    },
    // AI & Open Source: Systems Maroon (UI Token: --color-maroon #a0325a)
    '#a0325a': {
        panelStart: '#822244',
        panelEnd: '#59132d',
        cardHoverBg: '#a0325a',
        glow: 'rgba(160, 50, 90, 0.45)',
        badgeText: '#ffd4e3',
    },
    // Onetouch: Enterprise ERP Pink (UI Token: --color-pink #f0befa)
    '#f0befa': {
        panelStart: '#7c2b82',
        panelEnd: '#56175b',
        cardHoverBg: '#94349c',
        glow: 'rgba(148, 52, 156, 0.45)',
        badgeText: '#fedfff',
    },
};

function getProjectTheme(hex) {
    if (!hex) return PROJECT_THEMES['#f5693c'];
    const key = hex.toLowerCase();
    if (PROJECT_THEMES[key]) {
        return PROJECT_THEMES[key];
    }
    return {
        panelStart: hex,
        panelEnd: hex,
        cardHoverBg: hex,
        glow: 'rgba(0, 0, 0, 0.25)',
        badgeText: '#ffffff',
    };
}

export default function MorphProjectCard({
    title,
    description,
    tech = [],
    badge,
    accentColor = '#f5693c',
    iconType = 'server',
    link,
    githubLink,
    hasCaseStudy = false,
    isActive = false,
    onAction,
    className = '',
}) {
    // Format split title (main title and subtitle)
    const titleMain = typeof title === 'object' && title?.main
        ? title.main
        : typeof title === 'string'
        ? title.split('—')[0]?.trim() || title.split('-')[0]?.trim() || title
        : 'Project';

    const titleSub = typeof title === 'object' && title?.sub
        ? title.sub
        : typeof title === 'string' && title.includes('—')
        ? title.split('—')[1]?.trim()
        : typeof title === 'string' && title.includes('-')
        ? title.split('-')[1]?.trim()
        : '';

    // Convert tech string to array if needed
    const techList = Array.isArray(tech)
        ? tech
        : typeof tech === 'string'
        ? tech.split('•').map((t) => t.trim()).filter(Boolean)
        : [];

    const rgbValue = hexToRgb(accentColor);
    const theme = getProjectTheme(accentColor);
    const restingIcon = PROJECT_ICONS[iconType] || PROJECT_ICONS.server;

    const handleActionClick = (e, type) => {
        e.stopPropagation();
        if (onAction) {
            onAction({ title, link, githubLink, hasCaseStudy, type });
        }
    };

    return (
        <div
            className={`morph-card ${isActive ? 'morph-card--active' : ''} ${className}`}
            style={{
                '--card-accent': accentColor,
                '--card-accent-rgb': rgbValue,
                '--card-panel-start': theme.panelStart,
                '--card-panel-end': theme.panelEnd,
                '--card-hover-bg': theme.cardHoverBg,
                '--card-glow': theme.glow,
                '--card-badge-text': theme.badgeText,
            }}
            tabIndex={0}
            role="article"
            aria-label={`Project: ${titleMain} ${titleSub}`}
        >
            {/* Top Retracting Blob */}
            <div className="morph-card__blob" aria-hidden="true" />

            {/* Center Morphing Element */}
            <div className="morph-card__img">
                {/* Resting State Category Icon */}
                <div className="morph-card__resting-icon" aria-hidden="true">
                    {restingIcon}
                </div>

                {/* Hover Expanded Content Container */}
                <div className="morph-card__expanded-content">
                    {badge && (
                        <div className="morph-card__expanded-badge">
                            <span className="morph-card__expanded-badge-dot" />
                            <span>{badge}</span>
                        </div>
                    )}

                    {description && (
                        <p className="morph-card__expanded-desc">{description}</p>
                    )}

                    {techList.length > 0 && (
                        <div className="morph-card__expanded-tech">
                            {techList.slice(0, 4).map((item, idx) => (
                                <span key={idx} className="morph-card__tech-pill">
                                    {item}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Resting State Main Body Content (Fills the card with rich design) */}
            <div className="morph-card__resting-body">
                {/* Title and Subtitle */}
                <h2 className="morph-card__title">
                    {titleMain}
                    {titleSub && <span>{titleSub}</span>}
                </h2>

                {/* Category Badge */}
                {badge && (
                    <span className="morph-card__resting-badge">
                        {badge}
                    </span>
                )}

                {/* Decorative Divider */}
                <div className="morph-card__divider" aria-hidden="true">
                    <span className="morph-card__divider-line" />
                    <span className="morph-card__divider-dot" />
                    <span className="morph-card__divider-line" />
                </div>

                {/* Resting Tech Stack Preview Pills */}
                {techList.length > 0 && (
                    <div className="morph-card__resting-tech">
                        {techList.slice(0, 3).map((item, idx) => (
                            <span key={idx} className="morph-card__resting-pill">
                                {item}
                            </span>
                        ))}
                    </div>
                )}

                {/* Resting Footer with Interactive Hint */}
                <div className="morph-card__resting-footer">
                    <span className="morph-card__explore-hint">
                        Explore Details
                        <svg className="morph-card__explore-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </span>
                </div>
            </div>

            {/* Bottom Actions Bar (Revealed on Hover) */}
            <div className="morph-card__actions">
                <p className="morph-card__action-text">{titleMain}</p>

                <div className="morph-card__action-icons">
                    {/* Case Study Modal Trigger Button */}
                    {hasCaseStudy && (
                        <button
                            type="button"
                            className="morph-card__icon-btn"
                            title="View Case Study"
                            aria-label="View Detailed Case Study"
                            onClick={(e) => handleActionClick(e, 'casestudy')}
                        >
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                            </svg>
                        </button>
                    )}

                    {/* GitHub Code Link */}
                    {githubLink && (
                        <a
                            href={githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="morph-card__icon-btn"
                            title="View Source Code"
                            aria-label="View Source Code on GitHub"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                            </svg>
                        </a>
                    )}

                    {/* External Live Link */}
                    {link && link !== '#projects' && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="morph-card__icon-btn"
                            title="Visit Live Application"
                            aria-label="Visit Live Application"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="7" y1="17" x2="17" y2="7" />
                                <polyline points="7 7 17 7 17 17" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
