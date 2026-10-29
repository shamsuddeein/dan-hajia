import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { scroller } from 'react-scroll';
import { Menu, X, MessageSquare, MapPin } from 'lucide-react';
import clsx from 'clsx';
import { business, navItems, getWhatsAppEnquiryUrl } from '../constants/index.js';

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef(null);
  const toggleButtonRef = useRef(null);

  // Monitor scroll for header compression
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 32);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Lock body scroll, trap focus, make background inert, and listen for Escape key when mobile drawer is open
  useEffect(() => {
    if (!isOpen) return;

    // Make background content inert while mobile drawer is active
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.setAttribute('inert', '');
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        if (toggleButtonRef.current) {
          toggleButtonRef.current.focus();
        }
        return;
      }

      if (e.key === 'Tab') {
        const drawer = document.getElementById('mobile-navigation-drawer');
        if (!drawer) return;
        const focusableElements = drawer.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    setTimeout(() => {
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      if (rootElement) {
        rootElement.removeAttribute('inert');
      }
      if (toggleButtonRef.current) {
        toggleButtonRef.current.focus();
      }
    };
  }, [isOpen]);

  const handleNavClick = (targetId, event) => {
    if (event) event.preventDefault();
    setIsOpen(false);
    scroller.scrollTo(targetId, {
      duration: 500,
      smooth: true,
      offset: -90,
    });
  };

  const confirmedWhatsApp = getWhatsAppEnquiryUrl();

  return (
    <>
      {/* Primary Fixed Header Bar */}
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full',
          hasScrolled
            ? 'py-3.5 bg-s1/95 backdrop-blur-md border-b border-s4 shadow-lg shadow-black/40'
            : 'py-6 bg-transparent border-b border-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 max-md:px-4 flex items-center justify-between">
          {/* Brand Identity / Home Link */}
          <a
            href="#home"
            onClick={(e) => handleNavClick('home', e)}
            className="group flex items-center gap-3.5 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-p1 rounded-sm"
            aria-label={`${business.name} Home`}
          >
            {/* Monogram Badge */}
            <div className="w-10 h-10 border border-p1/60 rounded-full flex items-center justify-center font-serif text-p1 text-lg tracking-tighter transition-colors group-hover:border-p1 group-hover:bg-p1/10">
              DH
            </div>

            {/* Wordmark Typography */}
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-wider font-medium text-text-primary group-hover:text-p1 transition-colors uppercase">
                {business.name}
              </span>
              <span className="text-[9px] tracking-[0.25em] text-p1 uppercase font-sans -mt-0.5">
                Kaduna • Nigeria
              </span>
            </div>
          </a>

          {/* Desktop Navigation Row (hidden on mobile/tablet) */}
          <nav aria-label="Desktop Navigation" className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-7 text-[13px] font-medium tracking-wide">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.href}`}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="cursor-pointer transition-colors duration-200 block py-1.5 text-text-muted hover:text-p1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-p1 rounded"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>

            {confirmedWhatsApp && (
              <a
                href={confirmedWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-p1/40 bg-p1/10 text-p1 text-xs hover:bg-p1 hover:text-s1 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            )}
          </nav>

          {/* Mobile Hamburger Toggle Button */}
          <button
            ref={toggleButtonRef}
            type="button"
            onClick={() => setIsOpen(true)}
            className="lg:hidden flex items-center justify-center w-10 h-10 border border-s4 rounded-md text-text-primary hover:text-p1 hover:border-p1/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-p1"
            aria-label="Open mobile navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation-drawer"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* =========================================================================
          PORTALED FULL-VIEWPORT MOBILE NAVIGATION DRAWER
          Rendered directly into document.body to avoid containing block restrictions
         ========================================================================= */}
      {isOpen &&
        createPortal(
          <div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            style={{ backgroundColor: 'rgba(10, 10, 11, 0.98)' }}
            className="fixed inset-0 z-50 h-screen w-screen bg-s1/[0.98] backdrop-blur-xl flex flex-col justify-between p-6 sm:p-8 overflow-y-auto"
          >
            {/* Top Bar inside Drawer */}
            <div className="flex items-center justify-between border-b border-s4/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 border border-p1 rounded-full flex items-center justify-center font-serif text-p1 font-bold text-sm">
                  DH
                </div>
                <span className="font-serif text-base tracking-wide text-text-primary uppercase">
                  {business.name}
                </span>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 border border-s4 rounded-full flex items-center justify-center text-text-primary hover:text-p1 hover:border-p1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-p1 transition-colors"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links in Drawer */}
            <nav className="my-auto py-8">
              <ul className="flex flex-col gap-6 text-center">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.href}`}
                      onClick={(e) => handleNavClick(item.href, e)}
                      className="block font-serif text-2xl sm:text-3xl text-text-primary hover:text-p1 transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-p1"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Bottom Location & Contact Details in Drawer */}
            <div className="pt-6 border-t border-s4/60 text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs text-text-muted">
                <MapPin className="w-3.5 h-3.5 text-p1" />
                <span>{business.publicContacts.streetName}</span>
              </div>

              {confirmedWhatsApp && (
                <a
                  href={confirmedWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center gap-2 w-full max-w-xs mx-auto py-2.5 px-4 rounded-lg bg-p1 text-s1 font-medium text-xs hover:bg-p2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              )}

              <div className="text-[11px] font-mono text-text-muted/60">
                Press Escape or tap close to return
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
