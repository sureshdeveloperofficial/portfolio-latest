'use client';

import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import '@/app/styles/staggered-menu.css';

export const StaggeredMenu = ({
  position = 'right',
  colors = ['#82a0ff', '#f0befa', '#f5693c'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className = '',
  logoText = 'SURESH',
  accentColor = '#f5693c',
  onMenuOpen,
  onMenuClose
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);
  const bar1Ref = useRef(null);
  const bar2Ref = useRef(null);
  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false);
  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);

  // Initial GSAP setup
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const bar1 = bar1Ref.current;
      const bar2 = bar2Ref.current;
      if (!panel || !bar1 || !bar2) return;

      let preLayers = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer'));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      }

      // Initial state of the 2 hamburger bars
      gsap.set(bar1, { rotate: 0, y: -4, transformOrigin: 'center center' });
      gsap.set(bar2, { rotate: 0, y: 4, transformOrigin: 'center center' });
    });
    return () => ctx.revert();
  }, [position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));

    const offscreen = position === 'left' ? -100 : 100;
    const layerStates = layers.map(el => ({ el, start: offscreen }));
    const panelStart = offscreen;

    if (itemEls.length) {
      gsap.set(itemEls, { yPercent: 120, rotate: 6, opacity: 0 });
    }
    if (numberEls.length) {
      gsap.set(numberEls, { '--sm-num-opacity': 0 });
    }
    if (socialTitle) {
      gsap.set(socialTitle, { opacity: 0, y: 15 });
    }
    if (socialLinks.length) {
      gsap.set(socialLinks, { y: 20, opacity: 0 });
    }

    const tl = gsap.timeline({ paused: true });

    // Underlay sheets sweeping in with staggered delay
    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.48, ease: 'power4.out' }, i * 0.08);
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.08 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.09 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    // Items stagger animation
    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.18;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power4.out',
          stagger: { each: 0.07, from: 'start' }
        },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.5,
            ease: 'power2.out',
            '--sm-num-opacity': 1,
            stagger: { each: 0.06, from: 'start' }
          },
          itemsStart + 0.1
        );
      }
    }

    // Socials stagger animation
    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.35;
      if (socialTitle) {
        tl.to(
          socialTitle,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power2.out'
          },
          socialsStart
        );
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            stagger: { each: 0.06, from: 'start' }
          },
          socialsStart + 0.06
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();
    const offscreen = position === 'left' ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.35,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
        if (itemEls.length) {
          gsap.set(itemEls, { yPercent: 120, rotate: 6, opacity: 0 });
        }
        const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
        if (numberEls.length) {
          gsap.set(numberEls, { '--sm-num-opacity': 0 });
        }
        const socialTitle = panel.querySelector('.sm-socials-title');
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));
        if (socialTitle) gsap.set(socialTitle, { opacity: 0, y: 15 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 20, opacity: 0 });
        busyRef.current = false;
      }
    });
  }, [position]);

  // Animate the round hamburger button icon (2 parallel horizontal bars -> ✕)
  const animateIcon = useCallback((opening) => {
    const bar1 = bar1Ref.current;
    const bar2 = bar2Ref.current;
    if (!bar1 || !bar2) return;

    if (opening) {
      gsap.to(bar1, { y: 0, rotate: 45, duration: 0.35, ease: 'power3.out' });
      gsap.to(bar2, { y: 0, rotate: -45, duration: 0.35, ease: 'power3.out' });
    } else {
      gsap.to(bar1, { y: -4, rotate: 0, duration: 0.35, ease: 'power3.out' });
      gsap.to(bar2, { y: 4, rotate: 0, duration: 0.35, ease: 'power3.out' });
    }
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }
    animateIcon(target);
  }, [playOpen, playClose, animateIcon, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateIcon(false);
    }
  }, [playClose, animateIcon, onMenuClose]);

  // Close on outside click or escape
  React.useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeMenu();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, closeMenu]);

  // Handle smooth navigation when item clicked
  const handleItemClick = (e, link) => {
    if (link && link.startsWith('#')) {
      e.preventDefault();
      closeMenu();
      const targetEl = document.querySelector(link);
      if (targetEl) {
        setTimeout(() => {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else {
      closeMenu();
    }
  };

  return (
    <>
      {/* ─── Circular Hamburger Button (Image 2 design) ─── */}
      <button
        ref={toggleBtnRef}
        className={`sm-toggle-circle ${open ? 'is-open' : ''} ${className}`}
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        aria-controls="staggered-menu-panel"
        onClick={toggleMenu}
        type="button"
        title={open ? 'Close menu' : 'Open menu'}
      >
        <span className="sm-toggle-icon" aria-hidden="true">
          <span ref={bar1Ref} className="sm-bar sm-bar-top" />
          <span ref={bar2Ref} className="sm-bar sm-bar-bottom" />
        </span>
      </button>

      {/* ─── Full-screen Backdrop when opened ─── */}
      <div
        className={`staggered-menu-backdrop ${open ? 'is-visible' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ─── Staggered Menu Container ─── */}
      <div
        className={`staggered-menu-wrapper ${open ? 'is-active' : ''}`}
        style={accentColor ? { '--sm-accent': accentColor } : undefined}
        data-position={position}
        data-open={open || undefined}
      >
        {/* Underlay layers in website colors (blue, pink, orange) */}
        <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
          {colors.slice(0, 3).map((c, i) => (
            <div key={i} className="sm-prelayer" style={{ background: c }} />
          ))}
        </div>

        {/* Main Sliding Panel */}
        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel"
          aria-hidden={!open}
        >
          {/* Header inside panel */}
          <div className="sm-panel-header">
            <div className="sm-panel-logo" aria-label="Brand logo">
              <span className="sm-panel-logo-text">{logoText}</span>
              <span className="sm-panel-logo-dot" />
            </div>
          </div>

          {/* Section List with numbering */}
          <div className="sm-panel-inner">
            <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
              {items && items.length > 0 ? (
                items.map((it, idx) => (
                  <li className="sm-panel-itemWrap" key={it.label + idx}>
                    <a
                      className="sm-panel-item"
                      href={it.link}
                      aria-label={it.ariaLabel || it.label}
                      onClick={(e) => handleItemClick(e, it.link)}
                    >
                      <span className="sm-panel-itemLabel">{it.label}</span>
                    </a>
                  </li>
                ))
              ) : (
                <li className="sm-panel-itemWrap">
                  <span className="sm-panel-item">
                    <span className="sm-panel-itemLabel">No items</span>
                  </span>
                </li>
              )}
            </ul>

            {/* Social Links Footer */}
            {displaySocials && socialItems && socialItems.length > 0 && (
              <div className="sm-socials" aria-label="Social links">
                <h3 className="sm-socials-title">CONNECT</h3>
                <ul className="sm-socials-list" role="list">
                  {socialItems.map((s, i) => (
                    <li key={s.label + i} className="sm-socials-item">
                      <a
                        href={s.link}
                        target={s.link.startsWith('http') ? '_blank' : undefined}
                        rel={s.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="sm-socials-link"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
};

export default StaggeredMenu;
