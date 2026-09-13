'use client';

import React from 'react';
import '@/app/styles/double-side-tunnel.css';

/**
 * DoubleSideTunnel
 * High-performance, reusable dual-sided tunnel portal component.
 * Frames horizontal card tracks or carousels with entrance and exit tunnels
 * styled using website brand colors and hardware-accelerated CSS 3D lighting.
 *
 * @param {React.ReactNode} children - The carousel or content to frame
 * @param {string} theme - 'green' | 'cream' | 'orange' | 'dark' | 'lightblue'
 * @param {string} accentColor - Optional custom hex or CSS variable for the portal rim
 * @param {boolean} glow - Whether to render subtle ambient glow around tunnel mouths
 * @param {boolean} showRails - Whether to render top/bottom guide rail accents
 * @param {string} className - Additional CSS classes
 */
export default function DoubleSideTunnel({
    children,
    theme = 'butterfly-blue',
    accentColor,
    glow = true,
    showRails = false,
    className = '',
}) {
    // Dynamic custom property override if a custom accentColor is provided
    const customStyle = accentColor ? { '--tunnel-accent-custom': accentColor } : {};

    return (
        <div
            className={`double-tunnel double-tunnel--theme-${theme} ${glow ? 'double-tunnel--glow' : ''} ${className}`}
            style={customStyle}
            role="region"
            aria-label="Tunnel Framed Carousel"
        >
            {/* Optional top & bottom guide rails connecting tunnels */}
            {showRails && (
                <div className="double-tunnel__rails" aria-hidden="true">
                    <span className="double-tunnel__rail double-tunnel__rail--top" />
                    <span className="double-tunnel__rail double-tunnel__rail--bottom" />
                </div>
            )}

            {/* Left Tunnel Entrance / Exit Portal */}
            <div className="double-tunnel__portal double-tunnel__portal--left" aria-hidden="true">
                <div className="double-tunnel__body">
                    {/* Cylindrical pipe body */}
                    <div className="double-tunnel__pipe">
                        <div className="double-tunnel__pipe-highlight" />
                        <div className="double-tunnel__pipe-sheen" />
                    </div>

                    {/* Protruding collar flange / lip */}
                    <div className="double-tunnel__lip">
                        <div className="double-tunnel__lip-bevel" />
                        <div className="double-tunnel__lip-accent" />
                        <div className="double-tunnel__lip-rim" />
                    </div>

                    {/* Soft inner mouth shadow inside the pipe */}
                    <div className="double-tunnel__mouth-inner-shadow" />
                </div>
            </div>

            {/* Main Stage (holds the carousel/cards) */}
            <div className="double-tunnel__content">
                {children}
            </div>

            {/* Right Tunnel Entrance / Exit Portal (100% mirrored via scaleX) */}
            <div className="double-tunnel__portal double-tunnel__portal--right" aria-hidden="true">
                <div className="double-tunnel__body">
                    {/* Cylindrical pipe body */}
                    <div className="double-tunnel__pipe">
                        <div className="double-tunnel__pipe-highlight" />
                        <div className="double-tunnel__pipe-sheen" />
                    </div>

                    {/* Protruding collar flange / lip */}
                    <div className="double-tunnel__lip">
                        <div className="double-tunnel__lip-bevel" />
                        <div className="double-tunnel__lip-accent" />
                        <div className="double-tunnel__lip-rim" />
                    </div>

                    {/* Soft inner mouth shadow inside the pipe */}
                    <div className="double-tunnel__mouth-inner-shadow" />
                </div>
            </div>
        </div>
    );
}
