"use client";

import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AccordionGallery from "./AccordionGallery";

gsap.registerPlugin(InertiaPlugin, ScrollTrigger);

const PROJECT_ITEMS = [
    {
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
        label: "Marksorting Platform",
        tech: "NestJS • BullMQ • Redis • Prisma",
        link: "#projects",
        alt: "Marksorting - Machinery Lifecycle Platform",
    },
    {
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        label: "Onetouch Enterprise ERP",
        tech: "React • Node.js • Knex • MySQL",
        link: "#projects",
        alt: "Onetouch Multi-Tenant Enterprise ERP",
    },
    {
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
        label: "SkyNet Logistics Plugin",
        tech: ".NET 9 • CQRS • Shopify & Woo",
        link: "#projects",
        alt: "SkyNet Shipping Integration",
    },
    {
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
        label: "AI & Open Source Systems",
        tech: "FastAPI AI • PyPI • 634+ npm dl",
        link: "#projects",
        alt: "AI Tools & Open Source Starter",
    },
];

export default function MotionCards() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Inertia on floating labels
            const labels = document.querySelectorAll(".motion-card__floating-label");
            labels.forEach((label) => {
                let lastX = 0;
                let lastY = 0;
                let speedX = 0;
                let speedY = 0;

                const startRotation = gsap.getProperty(label, "rotation");
                const startX = gsap.getProperty(label, "x");
                const startY = gsap.getProperty(label, "y");

                const onMove = (e) => {
                    speedX = e.clientX - lastX;
                    speedY = e.clientY - lastY;
                    lastX = e.clientX;
                    lastY = e.clientY;
                };

                const onEnter = (e) => {
                    speedX = 0;
                    speedY = 0;
                    lastX = e.clientX;
                    lastY = e.clientY;
                };

                const onLeave = () => {
                    gsap.to(label, {
                        inertia: {
                            x: { velocity: speedX * 25, end: startX },
                            y: { velocity: speedY * 25, end: startY },
                            rotation: { velocity: speedX * 2, end: startRotation },
                        },
                    });
                };

                label.addEventListener("mousemove", onMove);
                label.addEventListener("mouseenter", onEnter);
                label.addEventListener("mouseleave", onLeave);
            });

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

            {/* ─── Part 2: Accordion Gallery Showcase & Blue Blob ─── */}
            <div className="motion-card__cards-area">
                {/* Blue SVG blob behind everything */}
                <div className="motion-card__blob">
                    <img
                        src="/assets/MotionCard SVG/motion-card-blob.svg"
                        alt=""
                        className="motion-card__blob-svg"
                    />
                </div>

                {/* React Bits AccordionGallery Project Showcase */}
                <div className="motion-card__gallery-container">
                    <AccordionGallery
                        items={PROJECT_ITEMS}
                        defaultIndex={1}
                        expandRatio={0.52}
                        height={480}
                        gap={14}
                        radius={20}
                        accentColor="var(--color-pink)"
                        trigger="hover"
                    />
                </div>

                {/* Floating labels — positioned freely over the cards area */}
                <div ref={containerRef} className="motion-card__floating-labels">
                    <div className="motion-card__floating-label motion-card__floating-label--pink">
                        <p className="motion-card__floating-text">clean architecture & cqrs</p>
                    </div>
                    <div className="motion-card__floating-label motion-card__floating-label--orange">
                        <p className="motion-card__floating-text">75% api latency reduction</p>
                    </div>
                    <div className="motion-card__floating-label motion-card__floating-label--red">
                        <p className="motion-card__floating-text">production hardened</p>
                    </div>
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
        </section>
    );
}
