'use client';

export default function Showreel() {
    return (
        <section className="showreel-section" id="showreel-section">
            <div className="showreel__container">
                <div className="showreel__header">
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '8px' }}>
                        <span className="showreel__badge">Full-Stack Engineer & Freelancer</span>
                        <span className="showreel__badge" style={{ backgroundColor: 'var(--color-pink)', color: 'var(--color-white)' }}>Available for Freelance & Contracts</span>
                    </div>
                    <h2 className="showreel__title">
                        metrics that <em>deliver.</em>
                    </h2>
                </div>

                {/* 4 Stat Metrics */}
                <div className="showreel__stats-grid">
                    <div className="showreel__stat-card">
                        <div className="showreel__stat-number" style={{ color: 'var(--color-lightgreen)' }}>3+</div>
                        <div className="showreel__stat-label">Years of Production Web & Backend Engineering</div>
                    </div>
                    <div className="showreel__stat-card">
                        <div className="showreel__stat-number" style={{ color: 'var(--color-orange)' }}>75%</div>
                        <div className="showreel__stat-label">Backend API Response Latency Reduction in ERP</div>
                    </div>
                    <div className="showreel__stat-card">
                        <div className="showreel__stat-number" style={{ color: 'var(--color-pink)' }}>634+</div>
                        <div className="showreel__stat-label">Downloads for suresh-node-ts-starter on npm</div>
                    </div>
                    <div className="showreel__stat-card">
                        <div className="showreel__stat-number" style={{ color: 'var(--color-lightblue)' }}>~5s</div>
                        <div className="showreel__stat-label">Vectorization Speed for Suresh SVG Converter v0.2.0</div>
                    </div>
                </div>

                {/* Open Source & Achievements */}
                <div className="showreel__projects-grid">
                    <div className="showreel__project-box">
                        <div>
                            <span className="showreel__project-tag">AI Microservice • PyPI</span>
                            <h3 className="showreel__project-title">background-remover-model</h3>
                            <p className="showreel__project-desc">
                                Production FastAPI service engineered for CPU-optimized image and video background removal. Published on PyPI & GitHub.
                            </p>
                        </div>
                        <span className="showreel__project-tech">FastAPI • Python • OpenCV • Docker</span>
                    </div>

                    <div className="showreel__project-box">
                        <div>
                            <span className="showreel__project-tag">Open Source Tool</span>
                            <h3 className="showreel__project-title">Suresh SVG Converter v0.2.0</h3>
                            <p className="showreel__project-desc">
                                High-speed parallelized image-to-SVG vectorization engine achieving approximately 5-second turnaround times.
                            </p>
                        </div>
                        <span className="showreel__project-tech">TypeScript • Node.js • Vectorization</span>
                    </div>

                    <div className="showreel__project-box">
                        <div>
                            <span className="showreel__project-tag">npm Package • 634+ Downloads</span>
                            <h3 className="showreel__project-title">suresh-node-ts-starter</h3>
                            <p className="showreel__project-desc">
                                Production TypeScript backend template featuring Express, Prisma, PostgreSQL, JWT auth, and Redis caching.
                            </p>
                        </div>
                        <span className="showreel__project-tech">Node.js • TypeScript • Prisma • Redis</span>
                    </div>
                </div>

                {/* Certifications Bar */}
                <div className="showreel__certs-bar">
                    <div className="showreel__cert-pill" style={{ borderColor: 'var(--color-lightgreen)' }}>
                        <span className="showreel__cert-dot" style={{ backgroundColor: 'var(--color-lightgreen)' }} />
                        <span>Freelance Available • Worldwide Remote</span>
                    </div>
                    <div className="showreel__cert-pill">
                        <span className="showreel__cert-dot" />
                        <span>HackerRank Software Engineer Certified</span>
                    </div>
                    <div className="showreel__cert-pill">
                        <span className="showreel__cert-dot" />
                        <span>B.Sc. Computer Science (CGPA 8.1 / 10.0)</span>
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
        </section>
    );
}
