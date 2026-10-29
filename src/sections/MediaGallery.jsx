import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Element } from 'react-scroll';
import {
  Play,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Video as VideoIcon,
  ArrowRight,
  Info,
} from 'lucide-react';
import { mediaGallery, galleryCategories } from '../constants/index.js';

export default function MediaGallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(12);
  const [modalItem, setModalItem] = useState(null);

  // References for focus containment and restoration
  const openerRef = useRef(null);
  const modalDialogRef = useRef(null);
  const modalCloseButtonRef = useRef(null);

  // Dynamically derive category counts from mediaGallery so counts never drift
  const categoriesWithCounts = galleryCategories.map((cat) => {
    const count =
      cat.slug === 'all'
        ? mediaGallery.length
        : mediaGallery.filter((item) => item.category === cat.slug).length;
    return { ...cat, count };
  });

  // Filter items based on active category
  const filteredItems = mediaGallery.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const displayedItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleCategoryChange = (slug) => {
    setActiveCategory(slug);
    setVisibleCount(12);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, filteredItems.length));
  };

  // Open modal viewer and coordinate page-wide video playback
  const handleOpenModal = (item, event) => {
    // Explicitly pause any active video playing on the page (e.g. in Selected Work)
    document.querySelectorAll('video').forEach((v) => {
      if (!v.paused) v.pause();
    });
    openerRef.current = event.currentTarget;
    setModalItem(item);
  };

  // Close modal viewer, pause any playing video, and restore focus
  const handleCloseModal = () => {
    if (modalDialogRef.current) {
      modalDialogRef.current.querySelectorAll('video').forEach((v) => {
        if (!v.paused) v.pause();
      });
    }
    setModalItem(null);
    if (openerRef.current) {
      openerRef.current.focus();
    }
  };

  // Navigation inside modal viewer
  const handlePrevItem = () => {
    if (!modalItem) return;
    const currentIndex = filteredItems.findIndex((it) => it.id === modalItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setModalItem(filteredItems[prevIndex]);
  };

  const handleNextItem = () => {
    if (!modalItem) return;
    const currentIndex = filteredItems.findIndex((it) => it.id === modalItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setModalItem(filteredItems[nextIndex]);
  };

  // Page-wide single active video playback coordination
  useEffect(() => {
    const handleGlobalPlay = (e) => {
      // Whenever any video starts playing, pause all other videos across the entire document
      document.querySelectorAll('video').forEach((v) => {
        if (v !== e.target && !v.paused) {
          v.pause();
        }
      });
    };

    document.addEventListener('play', handleGlobalPlay, true);
    return () => {
      document.removeEventListener('play', handleGlobalPlay, true);
    };
  }, []);

  // Accessible Keyboard trap, inert background, and body scroll lock for portaled modal
  useEffect(() => {
    if (!modalItem) return;

    // Set background content inert so focus and assistive tech cannot reach outside the portaled dialog
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.setAttribute('inert', '');
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCloseModal();
        return;
      }

      // If user is focused on the video element, let arrow keys control native video seeking
      const isVideoFocused =
        document.activeElement &&
        (document.activeElement.tagName === 'VIDEO' ||
          document.activeElement.closest('video'));

      if (e.key === 'ArrowLeft' && !isVideoFocused) {
        e.preventDefault();
        handlePrevItem();
      } else if (e.key === 'ArrowRight' && !isVideoFocused) {
        e.preventDefault();
        handleNextItem();
      } else if (e.key === 'Tab') {
        // Trap focus inside portaled modal dialog
        if (!modalDialogRef.current) return;
        const focusableElements = modalDialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), video'
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
      if (modalCloseButtonRef.current) {
        modalCloseButtonRef.current.focus();
      }
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      if (rootElement) {
        rootElement.removeAttribute('inert');
      }
    };
  }, [modalItem, filteredItems]);

  const formatDuration = (seconds) => {
    if (!seconds) return null;
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Element
      name="gallery"
      id="gallery"
      className="relative bg-s1 border-b border-s4 py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 max-md:px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-p1" aria-hidden="true" />
              <span className="caption text-p1 font-sans">
                Documentary Archive • All 32 Supplied Records
              </span>
            </div>
            <h2 className="h2 text-text-primary">
              Complete Media Gallery
            </h2>
            <p className="body-1 text-text-muted mt-4">
              Explore the entire collection of 32 photographic and video records documenting vehicle stock, international freight shipping, motorcycle walkarounds, facility visits, and archived promotional artwork.
            </p>
          </div>

          <div className="shrink-0 text-xs text-text-muted font-mono">
            <span>Showing {displayedItems.length} of {filteredItems.length} in view</span>
            <span className="block text-[11px] text-p1 mt-1 font-sans">
              32 Total Preserved Records
            </span>
          </div>
        </div>

        {/* Category Filters Bar with derived counts */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scroll-hide">
          {categoriesWithCounts.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => handleCategoryChange(cat.slug)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-sans transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-p1 text-s1 font-semibold shadow-md'
                    : 'bg-s2 border border-s4 text-text-muted hover:text-text-primary hover:border-s3'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-s1/20 text-s1' : 'bg-s3 text-text-muted'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedItems.map((item) => {
            const isVideo = item.type === 'video';
            const durationStr = formatDuration(item.duration);

            return (
              <div
                key={item.id}
                className="bg-s2 border border-s4 rounded-lg overflow-hidden flex flex-col group hover:border-s3 transition-all"
              >
                {/* Media Preview Box */}
                <button
                  type="button"
                  onClick={(e) => handleOpenModal(item, e)}
                  aria-label={`Open media viewer for ${item.title}`}
                  className="aspect-[16/10] bg-s3 relative overflow-hidden block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-p1"
                >
                  <img
                    src={item.poster}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Visual Overlay */}
                  <div className="absolute inset-0 bg-s1/30 group-hover:bg-s1/10 transition-colors" />

                  {/* Type Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-s1/85 backdrop-blur-sm border border-s4/60 text-[10px] uppercase tracking-wider font-mono text-text-primary">
                    {isVideo ? (
                      <>
                        <VideoIcon className="w-3 h-3 text-p1" />
                        <span>Video</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-3 h-3 text-p1" />
                        <span>{item.isPromotional ? 'Archived Graphic' : 'Photo'}</span>
                      </>
                    )}
                  </div>

                  {/* Play or Zoom indicator */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {isVideo ? (
                      <div className="w-12 h-12 rounded-full bg-s1/80 border border-p1/60 text-p1 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-p1 group-hover:text-s1 transition-all">
                        <Play className="w-5 h-5 ml-0.5" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-s1/70 border border-s4 text-text-primary opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all group-hover:scale-110">
                        <Eye className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Duration Tag for videos */}
                  {isVideo && durationStr && (
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-s1/85 font-mono text-[10px] text-text-primary border border-s4/50">
                      {durationStr}
                    </div>
                  )}
                </button>

                {/* Card Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="caption text-p1 text-[10px]">
                        {item.category === 'promotional' ? 'Promotional Archive' : item.category}
                      </span>
                    </div>

                    <h4 className="font-sans font-medium text-text-primary text-sm leading-snug mb-2 group-hover:text-p1 transition-colors">
                      {item.title}
                    </h4>

                    <p className="text-xs text-text-muted leading-relaxed">
                      {item.caption}
                    </p>
                  </div>

                  {/* Promotional Archive Disclaimer */}
                  {item.isPromotional && (
                    <div className="mt-4 pt-3 border-t border-s4/50">
                      <span className="text-[10px] text-text-muted font-mono block leading-tight flex items-start gap-1">
                        <Info className="w-3 h-3 text-p1 shrink-0 mt-0.5" />
                        <span>Historical artwork. Does not establish current stock or pricing.</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Control */}
        {hasMore ? (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-s4 bg-s2 text-xs font-sans text-text-primary hover:border-p1/60 hover:text-p1 transition-colors"
            >
              <span>Load More Media ({filteredItems.length - displayedItems.length} remaining)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="mt-12 text-center text-xs text-text-muted font-mono">
            All {filteredItems.length} records in this view are displayed.
          </div>
        )}
      </div>

      {/* =========================================================================
          ACCESSIBLE MODAL MEDIA VIEWER (PORTALED TO DOCUMENT.BODY)
          Rendered directly into document.body to maintain clean accessibility tree
         ========================================================================= */}
      {modalItem &&
        createPortal(
          <div
            id="gallery-dialog-portal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-media-title"
            className="fixed inset-0 z-50 bg-s1/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-6"
          >
            {/* Backdrop click to close */}
            <div
              className="absolute inset-0"
              onClick={handleCloseModal}
              aria-hidden="true"
            />

            {/* Modal Container */}
            <div
              ref={modalDialogRef}
              className="relative z-10 bg-s2 border border-s4 rounded-xl max-w-5xl w-full max-h-[96vh] flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Modal Top Header */}
              <div className="py-2.5 px-4 sm:px-6 border-b border-s4 flex items-center justify-between gap-4 bg-s3/40 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[11px] font-mono text-p1 uppercase tracking-wider px-2 py-0.5 rounded bg-s1 border border-s4 shrink-0">
                    {modalItem.category === 'promotional' ? 'Promotional Archive' : modalItem.category}
                  </span>
                  <h3
                    id="modal-media-title"
                    className="font-sans font-medium text-text-primary text-sm truncate"
                  >
                    {modalItem.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    ref={modalCloseButtonRef}
                    onClick={handleCloseModal}
                    aria-label="Close media viewer"
                    className="w-8 h-8 rounded-full border border-s4 bg-s2 flex items-center justify-center text-text-muted hover:text-text-primary hover:border-p1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-p1 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Media Body Container: bounded size using object-fit contain that guarantees portrait fit */}
              <div
                className="relative min-h-0 flex-1 w-full bg-black overflow-hidden flex items-center justify-center"
                style={{
                  height: 'min(58vh, calc(100vh - 140px))',
                  minHeight: '180px',
                }}
              >
                {modalItem.type === 'video' ? (
                  <video
                    key={modalItem.id}
                    controls
                    autoPlay
                    playsInline
                    preload="none"
                    poster={modalItem.poster}
                    className="absolute inset-0 w-full h-full object-contain"
                  >
                    <source src={modalItem.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={modalItem.src}
                    alt={modalItem.alt}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                )}

                {/* Prev / Next Overlay Buttons */}
                <button
                  type="button"
                  onClick={handlePrevItem}
                  aria-label="Previous media record"
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-s1/75 border border-s4 text-text-primary hover:text-p1 hover:border-p1 flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-p1"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleNextItem}
                  aria-label="Next media record"
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-s1/75 border border-s4 text-text-primary hover:text-p1 hover:border-p1 flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-p1"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Modal Bottom Footer */}
              <div className="py-2.5 px-4 sm:px-6 border-t border-s4 bg-s2/95 flex flex-col md:flex-row md:items-center justify-between gap-2.5 text-xs shrink-0">
                <div className="max-w-2xl">
                  <p className="text-text-muted leading-relaxed text-[11px] sm:text-xs">
                    {modalItem.caption}
                  </p>
                  {modalItem.isPromotional && (
                    <span className="text-[10px] text-p1 font-mono block mt-0.5">
                      Historical promotional artwork. For archival reference only.
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 font-mono text-[10px] sm:text-[11px] text-text-muted">
                  <span className="text-p1">
                    Esc to close • ← / → to navigate
                  </span>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </Element>
  );
}
