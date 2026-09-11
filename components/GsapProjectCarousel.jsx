'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import MorphProjectCard from './MorphProjectCard';
import '@/app/styles/gsap-carousel.css';

const DEFAULT_PROJECTS = [
    {
        title: { main: 'Premium Mess', sub: 'Dubai SaaS' },
        description: 'Enterprise meal subscription SaaS with automated 30-day billing, custom workday menus, split delivery routing, and headless PDF tax invoices.',
        tech: ['Next.js 16', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
        link: 'https://premiummess.com/',
        badge: 'Dubai Client SaaS • Live',
        accentColor: '#82a0ff',
        iconType: 'cloud',
        hasCaseStudy: true,
    },
    {
        title: { main: 'Marksorting', sub: 'Platform ERP' },
        description: 'Machinery lifecycle platform powered by NestJS microservices, BullMQ distributed job queues, and high-throughput Redis caching.',
        tech: ['NestJS', 'BullMQ', 'Redis', 'Prisma ORM'],
        link: '#projects',
        badge: 'Enterprise Platform',
        accentColor: '#f5693c',
        iconType: 'server',
    },
    {
        title: { main: 'Onetouch', sub: 'Enterprise ERP' },
        description: 'Multi-tenant ERP with granular RBAC permissions, sub-second reporting pipelines, and ACID Knex database transactions.',
        tech: ['React.js', 'Node.js', 'Knex.js', 'MySQL'],
        link: '#projects',
        badge: 'Multi-Tenant ERP',
        accentColor: '#f0befa',
        iconType: 'database',
    },
    {
        title: { main: 'SkyNet', sub: 'Logistics Plugin' },
        description: 'Event-driven shipping gateway plugin handling carrier rates, label generation, and automated tracking sync across Shopify & WooCommerce.',
        tech: ['.NET 9', 'CQRS', 'Shopify API', 'WooCommerce'],
        link: '#projects',
        badge: 'Cloud Logistics',
        accentColor: '#29725f',
        iconType: 'code',
    },
    {
        title: { main: 'AI & Open Source', sub: 'Systems & CLI' },
        description: 'FastAPI AI microservices, PyPI packages, and open-source boilerplates downloaded over 634+ times by global developers.',
        tech: ['FastAPI', 'Python', 'LangChain', 'Docker'],
        link: 'https://github.com/sureshdeveloperofficial',
        githubLink: 'https://github.com/sureshdeveloperofficial',
        badge: 'Open Source Systems',
        accentColor: '#a0325a',
        iconType: 'ai',
    },
];

export default function GsapProjectCarousel({
    items = DEFAULT_PROJECTS,
    speed = 32, // seconds per full loop
    gap = 28,
    cardWidth = 310,
    cardHeight = 420,
    onCardClick,
    className = '',
}) {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const tweenRef = useRef(null);

    const [dynamicCardWidth, setDynamicCardWidth] = useState(cardWidth);
    const [dynamicCardHeight, setDynamicCardHeight] = useState(cardHeight);
    const [isPaused, setIsPaused] = useState(false);

    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const dragProgressRef = useRef(0);

    // Responsive dimensions
    const updateDimensions = useCallback(() => {
        if (typeof window === 'undefined') return;
        const winWidth = window.innerWidth;
        if (winWidth < 480) {
            setDynamicCardWidth(Math.min(270, winWidth * 0.78));
            setDynamicCardHeight(370);
        } else if (winWidth < 768) {
            setDynamicCardWidth(290);
            setDynamicCardHeight(390);
        } else if (winWidth < 1024) {
            setDynamicCardWidth(300);
            setDynamicCardHeight(410);
        } else {
            setDynamicCardWidth(cardWidth);
            setDynamicCardHeight(cardHeight);
        }
    }, [cardWidth, cardHeight]);

    useEffect(() => {
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, [updateDimensions]);

    // Build duplicated items for seamless infinite scroll
    // 3 repetitions guarantee zero gaps on any ultrawide screen
    const loopItems = [...items, ...items, ...items];
    const singleSetCount = items.length;

    // Continuous Automatic Scrolling via GSAP
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const singleSetWidth = singleSetCount * (dynamicCardWidth + gap);

        // Reset track position
        gsap.set(track, { x: 0 });

        // Create continuous infinite loop tween
        const tween = gsap.to(track, {
            x: -singleSetWidth,
            duration: speed,
            ease: 'none',
            repeat: -1,
        });

        tweenRef.current = tween;

        if (isPaused) {
            tween.pause();
        }

        return () => {
            tween.kill();
        };
    }, [dynamicCardWidth, gap, speed, singleSetCount]);

    // Handle Hover Pause / Resume
    const handleMouseEnter = () => {
        setIsPaused(true);
        tweenRef.current?.pause();
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
        tweenRef.current?.resume();
    };

    // Drag / Touch Scrub Gestures
    const handlePointerDown = (e) => {
        isDraggingRef.current = true;
        startXRef.current = e.clientX;
        if (tweenRef.current) {
            dragProgressRef.current = tweenRef.current.progress();
            tweenRef.current.pause();
        }
    };

    const handlePointerMove = (e) => {
        if (!isDraggingRef.current || !tweenRef.current) return;
        const diffX = e.clientX - startXRef.current;
        const singleSetWidth = singleSetCount * (dynamicCardWidth + gap);
        const progressDelta = -diffX / singleSetWidth;
        let newProgress = (dragProgressRef.current + progressDelta) % 1;
        if (newProgress < 0) newProgress += 1;
        tweenRef.current.progress(newProgress);
    };

    const handlePointerUp = () => {
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;
        if (!isPaused && tweenRef.current) {
            tweenRef.current.resume();
        }
    };

    // Smooth nudge scroll controls
    const nudge = (direction) => {
        if (!tweenRef.current) return;
        const currentProg = tweenRef.current.progress();
        const step = 1 / singleSetCount;
        const targetProg = (currentProg + (direction === 'next' ? step : -step) + 1) % 1;
        gsap.to(tweenRef.current, {
            progress: targetProg,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => {
                if (!isPaused) tweenRef.current?.resume();
            },
        });
    };

    return (
        <div
            ref={containerRef}
            className={`gsap-carousel ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="region"
            aria-label="Continuous Scrolling Projects Carousel"
        >
            {/* Viewport & Scrolling Track */}
            <div
                className="gsap-carousel__viewport"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
            >
                <div
                    ref={trackRef}
                    className="gsap-carousel__track"
                    style={{ gap: `${gap}px` }}
                >
                    {loopItems.map((item, idx) => {
                        const originalIndex = idx % items.length;

                        return (
                            <div
                                key={`${originalIndex}-${idx}`}
                                className="gsap-carousel__card"
                                style={{
                                    width: `${dynamicCardWidth}px`,
                                    height: `${dynamicCardHeight}px`,
                                }}
                            >
                                <MorphProjectCard
                                    title={item.title || item.label}
                                    description={item.description}
                                    tech={item.tech}
                                    badge={item.badge}
                                    accentColor={item.accentColor || '#f5693c'}
                                    iconType={item.iconType || 'server'}
                                    link={item.link}
                                    githubLink={item.githubLink}
                                    hasCaseStudy={item.hasCaseStudy}
                                    onAction={(payload) => {
                                        if (onCardClick) {
                                            onCardClick(item, originalIndex, payload);
                                        }
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Status & Control Bar */}
            <div className="gsap-carousel__controls">
                <button
                    type="button"
                    className="gsap-carousel__nav-btn"
                    onClick={() => nudge('prev')}
                    aria-label="Scroll left"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                <div className="gsap-carousel__status-badge">
                    <span className="gsap-carousel__status-dot" />
                    <span>{isPaused ? 'Paused on hover' : 'Auto-scrolling showcase'}</span>
                </div>

                <button
                    type="button"
                    className="gsap-carousel__nav-btn"
                    onClick={() => nudge('next')}
                    aria-label="Scroll right"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
