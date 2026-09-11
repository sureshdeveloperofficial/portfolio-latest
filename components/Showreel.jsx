'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GridScan from './GridScan';
import MagicBento, { MagicBentoCard } from './MagicBento';
import ProjectCaseStudyModal from './ProjectCaseStudyModal';

export default function Showreel() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const sectionRef = useRef(null);
    const numYearsRef = useRef(null);
    const numUptimeRef = useRef(null);
    const numApisRef = useRef(null);
    const numLatencyRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!sectionRef.current) return;

        let hasAnimated = false;

        const animateIn = () => {
            if (hasAnimated) return;
            hasAnimated = true;

            // ─── 1. Entrance Reveal via fromTo (Never gets stuck at opacity 0) ───
            gsap.fromTo(
                '.showreel__header',
                { y: 35, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
            );

            gsap.fromTo(
                '.showreel__stat-card',
                { y: 40, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.75, ease: 'back.out(1.2)' }
            );

            gsap.fromTo(
                '.showreel__project-box',
                { y: 45, opacity: 0, scale: 0.96 },
                { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out' }
            );

            gsap.fromTo(
                '.showreel__certs-bar',
                { y: 25, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
            );

            // ─── 2. Animated Numbers Roll-up (Real-World Software Engineering Metrics) ───
            const counts = { years: 0, uptime: 0, apis: 0, latency: 0 };
            gsap.to(counts, {
                years: 3,
                uptime: 99.9,
                apis: 50,
                latency: 100,
                duration: 1.8,
                ease: 'power2.out',
                onUpdate: () => {
                    if (numYearsRef.current) numYearsRef.current.textContent = `${Math.floor(counts.years)}+`;
                    if (numUptimeRef.current) numUptimeRef.current.textContent = `${counts.uptime.toFixed(1)}%`;
                    if (numApisRef.current) numApisRef.current.textContent = `${Math.floor(counts.apis)}+`;
                    if (numLatencyRef.current) numLatencyRef.current.textContent = `<${Math.floor(counts.latency)}ms`;
                },
            });
        };

        // If section is already within viewport on load, animate immediately!
        const initialRect = sectionRef.current.getBoundingClientRect();
        if (initialRect.top < window.innerHeight * 0.9 && initialRect.bottom > 0) {
            animateIn();
        }

        // Viewport intersection trigger (immune to ScrollTrigger pin offset lag)
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateIn();
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
        );

        observer.observe(sectionRef.current);

        // Also refresh ScrollTrigger after pins have settled
        const refreshTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 600);

        return () => {
            clearTimeout(refreshTimer);
            observer.disconnect();
            ScrollTrigger.getAll().forEach((t) => {
                if (t.vars.trigger === sectionRef.current) t.kill();
            });
        };
    }, []);

    return (
        <section className="showreel-section" id="showreel-section" ref={sectionRef}>
            {/* 3D WebGL GridScan Tunnel Background */}
            <div className="showreel__grid-bg" aria-hidden="true">
                <GridScan
                    sensitivity={0.55}
                    lineThickness={1}
                    linesColor="#2F293A"
                    gridScale={0.1}
                    scanColor="#FF9FFC"
                    scanOpacity={0.4}
                    enablePost
                    bloomIntensity={0.6}
                    chromaticAberration={0.002}
                    noiseIntensity={0.01}
                />
            </div>

            {/* Top gradient mask to guarantee no navbar clashing */}
            <div className="showreel__top-fade" aria-hidden="true" />

            <div className="showreel__container">
                {/* Header with Clearance */}
                <div className="showreel__header">
                    <div className="showreel__badges-row">
                        <span className="showreel__badge showreel__badge--pulse">
                            <span className="showreel__badge-dot" />
                            Full-Stack Engineer & Freelancer
                        </span>
                        <span className="showreel__badge showreel__badge--accent">
                            Available for Worldwide Remote & Contracts
                        </span>
                    </div>
                    <h2 className="showreel__title">
                        metrics that <em>deliver.</em>
                    </h2>
                </div>

                {/* React Bits MagicBento Interactive Grid Wrapper */}
                <MagicBento
                    glowColor="147, 51, 234"
                    spotlightRadius={360}
                    enableStars={true}
                    enableSpotlight={true}
                    enableBorderGlow={true}
                    enableTilt={true}
                    enableMagnetism={true}
                    clickEffect={true}
                >
                    {/* 4 Stat Metrics: Real-World Software Engineering */}
                    <div className="showreel__stats-grid">
                        {/* Stat 1: Production Experience */}
                        <MagicBentoCard
                            className="showreel__stat-card showreel__stat-card--green"
                            glowColor="69, 219, 140"
                            particleCount={12}
                            enableTilt={true}
                            enableMagnetism={true}
                            clickEffect={true}
                        >
                            <div className="showreel__card-reticle showreel__card-reticle--tl" />
                            <div className="showreel__card-reticle showreel__card-reticle--br" />
                            <div className="showreel__stat-header">
                                <span className="showreel__stat-tag">// PRODUCTION EXPERIENCE</span>
                                <div className="showreel__stat-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="16 18 22 12 16 6" />
                                        <polyline points="8 6 2 12 8 18" />
                                    </svg>
                                </div>
                            </div>
                            <div className="showreel__stat-number" ref={numYearsRef}>3+</div>
                            <div className="showreel__stat-label">Years of Production Web & Backend Engineering</div>
                        </MagicBentoCard>

                        {/* Stat 2: System Reliability */}
                        <MagicBentoCard
                            className="showreel__stat-card showreel__stat-card--orange"
                            glowColor="255, 140, 66"
                            particleCount={12}
                            enableTilt={true}
                            enableMagnetism={true}
                            clickEffect={true}
                        >
                            <div className="showreel__card-reticle showreel__card-reticle--tl" />
                            <div className="showreel__card-reticle showreel__card-reticle--br" />
                            <div className="showreel__stat-header">
                                <span className="showreel__stat-tag">// SYSTEM RELIABILITY</span>
                                <div className="showreel__stat-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        <polyline points="9 12 11 14 15 10" />
                                    </svg>
                                </div>
                            </div>
                            <div className="showreel__stat-number" ref={numUptimeRef}>99.9%</div>
                            <div className="showreel__stat-label">Production Service & API Uptime SLA Delivered</div>
                        </MagicBentoCard>

                        {/* Stat 3: Production APIs */}
                        <MagicBentoCard
                            className="showreel__stat-card showreel__stat-card--pink"
                            glowColor="255, 159, 252"
                            particleCount={12}
                            enableTilt={true}
                            enableMagnetism={true}
                            clickEffect={true}
                        >
                            <div className="showreel__card-reticle showreel__card-reticle--tl" />
                            <div className="showreel__card-reticle showreel__card-reticle--br" />
                            <div className="showreel__stat-header">
                                <span className="showreel__stat-tag">// PRODUCTION APIS</span>
                                <div className="showreel__stat-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                                        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                                        <line x1="6" y1="6" x2="6.01" y2="6" />
                                        <line x1="6" y1="18" x2="6.01" y2="18" />
                                    </svg>
                                </div>
                            </div>
                            <div className="showreel__stat-number" ref={numApisRef}>50+</div>
                            <div className="showreel__stat-label">Scalable Microservices, Webhooks & APIs Shipped</div>
                        </MagicBentoCard>

                        {/* Stat 4: Low-Latency Speed */}
                        <MagicBentoCard
                            className="showreel__stat-card showreel__stat-card--blue"
                            glowColor="125, 249, 255"
                            particleCount={12}
                            enableTilt={true}
                            enableMagnetism={true}
                            clickEffect={true}
                        >
                            <div className="showreel__card-reticle showreel__card-reticle--tl" />
                            <div className="showreel__card-reticle showreel__card-reticle--br" />
                            <div className="showreel__stat-header">
                                <span className="showreel__stat-tag">// LOW-LATENCY SPEED</span>
                                <div className="showreel__stat-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                    </svg>
                                </div>
                            </div>
                            <div className="showreel__stat-number" ref={numLatencyRef}>&lt;100ms</div>
                            <div className="showreel__stat-label">P95 Response Time via Redis Caching &amp; DB Indexing</div>
                        </MagicBentoCard>
                    </div>

                    {/* Open Source & Featured Engineering Projects */}
                    <div className="showreel__projects-grid">
                        {/* Project 1 */}
                        <MagicBentoCard
                            className="showreel__project-box"
                            glowColor="255, 140, 66"
                            particleCount={14}
                            enableTilt={true}
                            enableMagnetism={true}
                            clickEffect={true}
                        >
                            <div className="showreel__card-reticle showreel__card-reticle--tl" />
                            <div className="showreel__card-reticle showreel__card-reticle--br" />
                            <div>
                                <div className="showreel__project-top">
                                    <span className="showreel__project-tag showreel__project-tag--orange">
                                        <span className="showreel__project-dot" />
                                        AI Microservice • PyPI
                                    </span>
                                    <div className="showreel__project-arrow" aria-hidden="true">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="7" y1="17" x2="17" y2="7" />
                                            <polyline points="7 7 17 7 17 17" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="showreel__project-title">background-remover-model</h3>
                                <p className="showreel__project-desc">
                                    Production FastAPI service engineered for CPU-optimized image and video background removal. Published on PyPI & GitHub.
                                </p>
                            </div>
                            <div className="showreel__tech-chips">
                                <span className="showreel__tech-chip">FastAPI</span>
                                <span className="showreel__tech-chip">Python</span>
                                <span className="showreel__tech-chip">OpenCV</span>
                                <span className="showreel__tech-chip">Docker</span>
                            </div>
                        </MagicBentoCard>

                        {/* Project 2 */}
                        <MagicBentoCard
                            className="showreel__project-box"
                            glowColor="125, 249, 255"
                            particleCount={14}
                            enableTilt={true}
                            enableMagnetism={true}
                            clickEffect={true}
                        >
                            <div className="showreel__card-reticle showreel__card-reticle--tl" />
                            <div className="showreel__card-reticle showreel__card-reticle--br" />
                            <div>
                                <div className="showreel__project-top">
                                    <span className="showreel__project-tag showreel__project-tag--cyan">
                                        <span className="showreel__project-dot" />
                                        Open Source Tool
                                    </span>
                                    <div className="showreel__project-arrow" aria-hidden="true">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="7" y1="17" x2="17" y2="7" />
                                            <polyline points="7 7 17 7 17 17" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="showreel__project-title">Suresh SVG Converter v0.2.0</h3>
                                <p className="showreel__project-desc">
                                    High-speed parallelized image-to-SVG vectorization engine achieving approximately 5-second turnaround times.
                                </p>
                            </div>
                            <div className="showreel__tech-chips">
                                <span className="showreel__tech-chip">TypeScript</span>
                                <span className="showreel__tech-chip">Node.js</span>
                                <span className="showreel__tech-chip">Vectorization</span>
                                <span className="showreel__tech-chip">CLI</span>
                            </div>
                        </MagicBentoCard>

                        {/* Project 3 */}
                        <MagicBentoCard
                            className="showreel__project-box"
                            glowColor="255, 159, 252"
                            particleCount={14}
                            enableTilt={true}
                            enableMagnetism={true}
                            clickEffect={true}
                        >
                            <div className="showreel__card-reticle showreel__card-reticle--tl" />
                            <div className="showreel__card-reticle showreel__card-reticle--br" />
                            <div>
                                <div className="showreel__project-top">
                                    <span className="showreel__project-tag showreel__project-tag--pink">
                                        <span className="showreel__project-dot" />
                                        npm Package • 634+ DLs
                                    </span>
                                    <div className="showreel__project-arrow" aria-hidden="true">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="7" y1="17" x2="17" y2="7" />
                                            <polyline points="7 7 17 7 17 17" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="showreel__project-title">suresh-node-ts-starter</h3>
                                <p className="showreel__project-desc">
                                    Production TypeScript backend template featuring Express, Prisma, PostgreSQL, JWT auth, and Redis caching.
                                </p>
                            </div>
                            <div className="showreel__tech-chips">
                                <span className="showreel__tech-chip">Express</span>
                                <span className="showreel__tech-chip">TypeScript</span>
                                <span className="showreel__tech-chip">Prisma</span>
                                <span className="showreel__tech-chip">Redis</span>
                            </div>
                        </MagicBentoCard>
                    </div>
                </MagicBento>

                {/* Certifications & Badges Bar */}
                <div className="showreel__certs-bar">
                    <div className="showreel__cert-pill showreel__cert-pill--active">
                        <span className="showreel__cert-pulse" />
                        <span>Freelance Available • Worldwide Remote</span>
                    </div>
                    <div className="showreel__cert-pill">
                        <span className="showreel__cert-dot" />
                        <span>HackerRank Software Engineer Certified</span>
                    </div>
                    <div className="showreel__cert-pill">
                        <span className="showreel__cert-dot" />
                        <span>Udemy: Generative AI & LLM Systems</span>
                    </div>
                    <div className="showreel__cert-pill">
                        <span className="showreel__cert-dot" />
                        <span>Udemy: Resilience Patterns in Microservices</span>
                    </div>
                </div>
            </div>

            {/* Deep-Dive Technical Case Study Modal */}
            <ProjectCaseStudyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
}
