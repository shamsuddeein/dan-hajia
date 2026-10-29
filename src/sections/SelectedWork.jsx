import React, { useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import { Play, Video as VideoIcon, ArrowRight } from 'lucide-react';
import { selectedWork } from '../constants/index.js';
import Button from '../components/Button.jsx';

export default function SelectedWork() {
  const [activeVideoId, setActiveVideoId] = useState(null);

  const handlePlayVideo = (id) => {
    // Explicitly pause any other video currently playing on the page
    document.querySelectorAll('video').forEach((v) => {
      if (!v.paused) v.pause();
    });
    setActiveVideoId(id);
  };

  // Page-wide coordination: if another video starts playing (e.g. Gallery modal), pause inactive players
  useEffect(() => {
    const handleGlobalPlay = (e) => {
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

  return (
    <Element
      name="our-work"
      id="our-work"
      className="relative bg-s1 border-b border-s4 py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 max-md:px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-p1" aria-hidden="true" />
              <span className="caption text-p1 font-sans">
                Evidence of Work • Authentic Operations
              </span>
            </div>
            <h2 className="h2 text-text-primary">
              Selected Work &amp; Logistics
            </h2>
            <p className="body-1 text-text-muted mt-4">
              Direct documentary recordings from international cargo staging, container loading, vehicle warehousing, and motorcycle demonstrations.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="#gallery"
              className="inline-flex items-center gap-2 text-xs font-sans text-p1 uppercase tracking-wider hover:text-p2 transition-colors py-2"
            >
              <span>Explore Complete 32-Item Archive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Selected Work Grid (2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {selectedWork.map((item) => {
            const isPlaying = activeVideoId === item.id;

            return (
              <div
                key={item.id}
                className="bg-s2 border border-s4 rounded-lg overflow-hidden flex flex-col group hover:border-s3 transition-all"
              >
                {/* Media Container with Click-to-Play */}
                <div className="aspect-[16/10] bg-s3 relative overflow-hidden flex items-center justify-center">
                  {isPlaying ? (
                    <video
                      controls
                      autoPlay
                      playsInline
                      poster={item.posterPath}
                      className="w-full h-full object-contain bg-black"
                    >
                      <source src={item.mediaPath} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        src={item.posterPath}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-s1/30 group-hover:bg-s1/10 transition-colors" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded bg-s1/85 backdrop-blur-sm border border-s4/60 text-[10px] uppercase tracking-wider font-mono text-text-primary flex items-center gap-1.5">
                          <VideoIcon className="w-3 h-3 text-p1" />
                          <span>{item.category}</span>
                        </span>
                      </div>

                      {/* Duration */}
                      {item.duration && (
                        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-s1/85 font-mono text-[10px] text-text-primary border border-s4/50">
                          {item.duration}
                        </div>
                      )}

                      {/* Play Button Trigger */}
                      <button
                        type="button"
                        onClick={() => handlePlayVideo(item.id)}
                        aria-label={`Play video: ${item.title}`}
                        className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-p1"
                      >
                        <div className="w-14 h-14 rounded-full bg-s1/80 border border-p1/70 text-p1 flex items-center justify-center shadow-xl group-hover:bg-p1 group-hover:text-s1 transition-all">
                          <Play className="w-6 h-6 ml-1" />
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                {/* Card Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-text-primary mb-2 group-hover:text-p1 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-s4/50 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-p1">
                      Documentary Recording
                    </span>
                    <a
                      href="#gallery"
                      className="text-text-muted hover:text-text-primary text-[11px] font-sans flex items-center gap-1"
                    >
                      <span>In Archive</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Footer */}
        <div className="mt-12 text-center">
          <Button href="#gallery" variant="secondary" className="text-xs">
            <span>Browse Full Media Gallery (32 Assets)</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>
    </Element>
  );
}
