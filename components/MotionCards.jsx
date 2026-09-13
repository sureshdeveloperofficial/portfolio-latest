"use client";

import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";
import GsapProjectCarousel from "./GsapProjectCarousel";
import ProjectCaseStudyModal from "./ProjectCaseStudyModal";

gsap.registerPlugin(InertiaPlugin, ScrollTrigger);

const PROJECT_ITEMS = [
    {
        title: { main: "Premium Mess", sub: "Dubai SaaS" },
        description: "Enterprise meal subscription platform with automated 30-day dynamic billing, dual-location delivery routing, and headless PDF tax invoices.",
        tech: ["Next.js 16", "PostgreSQL", "Prisma", "Tailwind CSS"],
        link: "https://premiummess.com/",
        badge: "Dubai Client SaaS • Live",
        accentColor: "#82a0ff",
        iconType: "cloud",
        hasCaseStudy: true,
    },
    {
        title: { main: "Marksorting", sub: "Platform ERP" },
        description: "Machinery lifecycle management system with BullMQ distributed message queues, Redis caching, and zero database query bottlenecks.",
        tech: ["NestJS", "BullMQ", "Redis", "Prisma ORM"],
        link: "#projects",
        badge: "Enterprise Platform",
        accentColor: "#f5693c",
        iconType: "server",
    },
    {
        title: { main: "Onetouch", sub: "Enterprise ERP" },
        description: "Multi-tenant ERP with granular RBAC permissions, sub-second reporting pipelines, and ACID Knex database transactions.",
        tech: ["React.js", "Node.js", "Knex.js", "MySQL"],
        link: "#projects",
        badge: "Multi-Tenant ERP",
        accentColor: "#f0befa",
        iconType: "database",
    },
    {
        title: { main: "SkyNet", sub: "Logistics Plugin" },
        description: "Event-driven shipping gateway plugin handling carrier rates, label generation, and automated tracking sync across Shopify & WooCommerce.",
        tech: [".NET 9", "CQRS", "Shopify API", "WooCommerce"],
        link: "#projects",
        badge: "Cloud Logistics",
        accentColor: "#29725f",
        iconType: "code",
    },
    {
        title: { main: "AI & Open Source", sub: "Systems & CLI" },
        description: "FastAPI AI microservices, PyPI packages, and open-source boilerplates downloaded over 634+ times by global developers.",
        tech: ["FastAPI", "Python", "LangChain", "Docker"],
        link: "https://github.com/sureshdeveloperofficial",
        githubLink: "https://github.com/sureshdeveloperofficial",
        badge: "Open Source Systems",
        accentColor: "#a0325a",
        iconType: "ai",
    },
];

export default function MotionCards() {
    const sectionRef = useRef(null);
    const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entry Animations: Sticker Pop & Underline Draw
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
            });

            const topStickerImg = sectionRef.current.querySelector(".motion-card__sticker--top img");
            if (topStickerImg) {
                gsap.set(topStickerImg, { scale: 0, opacity: 0, rotation: -30 });
                tl.to(topStickerImg, { scale: 1, opacity: 1, rotation: 0, duration: 1.7, ease: "elastic.out(1, 0.4)" }, 0);
            }

            const underlinePath = sectionRef.current.querySelector(".motion-card__underline-path");
            if (underlinePath) {
                const pathLen = underlinePath.getTotalLength();
                gsap.set(underlinePath, {
                    strokeDasharray: pathLen,
                    strokeDashoffset: pathLen,
                });
                tl.to(
                    underlinePath,
                    {
                        strokeDashoffset: 0,
                        duration: 1.4,
                        ease: "power2.inOut",
                    },
                    0.2
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleCardAction = (item, idx, payload) => {
        if (payload?.type === 'casestudy' || item.hasCaseStudy) {
            setIsCaseStudyOpen(true);
        } else if (item.link && item.link.startsWith("http")) {
            window.open(item.link, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <section ref={sectionRef} className="motion-card" id="projects">
            {/* ─── Part 1: Top Heading Text ─── */}
            <div className="motion-card__header-text">
                <h3 className="motion-card__title">
                    engineered for scale. built for impact.
                </h3>
                <p className="motion-card__subtitle">
                    from microservices to UI.
                    <span className="motion-card__sticker motion-card__sticker--top">
                        <img
                            src="/assets/Footer-Sticker SVG/footer-sticker-hands.svg"
                            alt="Green heart hands sticker"
                            className="motion-card__sticker-img"
                        />
                    </span>
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 634 28" fill="none" className="motion-card__underline-svg">
                    <path className="motion-card__underline-path" d="M2 26C41.0237 23.1556 79.9927 19.9419 118.634 15.5521C169.106 9.98633 227.314 2.42393 275.206 2C280.46 2.57436 264.768 4.99488 262.462 5.55556C257.837 6.43078 252.529 7.47009 247.317 8.59146C239.594 10.3556 212.496 15.8393 226.932 19.8051C239.594 22.6359 263.663 21.9521 280.978 21.3504C314.817 19.9829 349.311 16.7419 383.204 14.7863C465.931 9.5077 549.191 10.547 632 14.1436" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {/* ─── Part 2: GSAP Projects Carousel & Blue Blob ─── */}
            <div className="motion-card__cards-area">
                {/* Blue SVG blob behind everything */}
                <div className="motion-card__blob">
                    <img
                        src="/assets/MotionCard SVG/motion-card-blob.svg"
                        alt=""
                        className="motion-card__blob-svg"
                    />
                </div>

                {/* GSAP Reusable Animated Project Carousel Framed in DoubleSideTunnel */}
                <div className="motion-card__gallery-container">
                    <GsapProjectCarousel
                        items={PROJECT_ITEMS}
                        defaultIndex={1}
                        autoPlay={true}
                        autoPlayInterval={3500}
                        activeScale={1.2}
                        inactiveScale={0.86}
                        cardWidth={310}
                        cardHeight={420}
                        gap={26}
                        onCardClick={handleCardAction}
                        useTunnel={true}
                        tunnelTheme="butterfly-blue"
                        tunnelGlow={true}
                    />
                </div>
            </div>

            {/* ─── Part 3: Bottom Paragraph Text ─── */}
            <div className="motion-card__footer-text">
                <p className="motion-card__description">
                    Software Developer & Freelance Engineer with 3 years of hands-on experience delivering
                    production-grade web applications. Available for high-impact client projects, contract development,
                    and full-time roles: from atomic order state machines and chunked Excel ingestion pipelines to
                    eliminating database query bottlenecks and building CPU-optimized AI services.
                </p>
            </div>

            {/* ─── Case Study Modal for Live Dubai Project ─── */}
            <ProjectCaseStudyModal
                isOpen={isCaseStudyOpen}
                onClose={() => setIsCaseStudyOpen(false)}
            />
        </section>
    );
}
