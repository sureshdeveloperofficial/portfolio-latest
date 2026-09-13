'use client';

import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import VimeoHero from '@/components/VimeoHero';
import ServiceCards from '@/components/ServiceCards';
import MotionCards from '@/components/MotionCards';
import Showreel from '@/components/Showreel';
import DoubleMarquee from '@/components/DoubleMarquee';
import Footer from '@/components/Footer';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';

import HorizontalWords from '@/components/HorizontalWords';

export default function Home() {
    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />
            <header className="main-header" id="hero">
                <Navbar />
                <VimeoHero />
            </header>
            <HorizontalWords />
            <main>
                <div className="content-section motion-cards-wrapper" id="projects">
                    <MotionCards />
                </div>
                <Showreel />
                <div className="content-section service-cards-wrapper" id="services">
                    <ServiceCards />
                </div>
            </main>
            <section className="Double-marquee" id="marquee">
                <DoubleMarquee />
            </section>
            <footer className="main-footer" id="contact">
                <Footer />
            </footer>
            <TransitionScribble />
        </>
    );
}
