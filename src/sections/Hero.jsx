import React from 'react';
import { Element } from 'react-scroll';
import { MessageCircle, ArrowRight } from 'lucide-react';
import Button from '../components/Button.jsx';
import {
  business,
  heroContent,
  getWhatsAppEnquiryUrl,
} from '../constants/index.js';
import heroImage from '../assets/hero-car-interior.jpeg';

export default function Hero() {
  const whatsappUrl = getWhatsAppEnquiryUrl();

  return (
    <Element
      name="home"
      id="home"
      className="relative overflow-hidden bg-s1 pt-28 max-md:pt-24 border-b border-s4"
    >
      <div className="max-w-7xl mx-auto px-6 max-md:px-4">
        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch pt-6 pb-16 lg:pb-24">
          {/* Left Column: Business Identity & Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-between z-10">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-p1" aria-hidden="true" />
                <span className="caption text-p1 font-sans">
                  {heroContent.eyebrow}
                </span>
              </div>

              {/* Editorial Headline */}
              <h1 className="h1 text-text-primary max-w-2xl">
                <span>Commercial Trading, </span>
                <span className="italic text-p2">Vehicle Importation </span>
                <span>&amp; Property Sourcing.</span>
              </h1>

              {/* Sub-line */}
              <p className="body-1 text-text-muted mt-6 max-w-xl">
                {heroContent.subline}
              </p>

              {/* Call-to-Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {whatsappUrl ? (
                  <Button
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    showMarker={true}
                  >
                    <MessageCircle className="w-4 h-4 inline-block mr-1 text-s1" />
                    {heroContent.ctaWhatsApp}
                  </Button>
                ) : (
                  <Button
                    href="#contact"
                    variant="primary"
                    showMarker={true}
                  >
                    <MessageCircle className="w-4 h-4 inline-block mr-1 text-s1" />
                    Contact Kaduna Office
                  </Button>
                )}

                <Button href="#what-we-do" variant="secondary">
                  <span>{heroContent.ctaOverview}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 inline-block text-p1" />
                </Button>
              </div>
            </div>

            {/* Direct Verification Notice */}
            <div className="mt-12 pt-6 border-t border-s4/60 flex items-center gap-3 text-xs text-text-muted">
              <span className="w-2 h-2 rounded-full bg-p1 inline-block shrink-0" aria-hidden="true" />
              <span>
                Registered Kaduna office at {business.publicContacts.streetName}. In-person visits and video consultations welcome.
              </span>
            </div>
          </div>

          {/* Right Column: Documentary Stock Photograph */}
          <div className="lg:col-span-5 relative flex items-center">
            <div className="w-full h-full min-h-[380px] lg:min-h-[500px] bg-s2 border border-s4 relative overflow-hidden group rounded-sm">
              <img
                src={heroImage}
                alt="Documentary interior view of imported Mercedes-Benz sedan"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />

              {/* Vignette Gradient for Depth */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-s1/90 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Photo Verification Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/85 via-black/50 to-transparent pointer-events-none">
                <span className="caption text-p1 block text-[10px] mb-1 font-sans">
                  Documentary Archive
                </span>
                <p className="font-serif text-sm text-text-primary">
                  Mercedes-Benz Luxury Interior
                </p>
                <p className="text-[10px] text-text-muted mt-0.5 font-mono">
                  Mercedes-Benz interior — supplied company archive
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Strip */}
        <div className="border-t border-s4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-text-muted">
          {/* Item 1: Trading Scope */}
          <div className="border-l border-s4/60 pl-4 max-md:border-l-0 max-md:pl-0">
            <span className="caption text-p1 block mb-1">Trading Scope</span>
            <span className="font-serif text-base text-text-primary block">
              Direct Import &amp; Sourcing
            </span>
            <span className="text-[11px] text-text-muted">Vehicles, land, homes &amp; devices</span>
          </div>

          {/* Item 2: Physical Base */}
          <div className="border-l border-s4/60 pl-4 max-md:border-l-0 max-md:pl-0">
            <span className="caption text-p1 block mb-1">Headquarters</span>
            <span className="font-serif text-base text-text-primary block">
              Kaduna, Nigeria
            </span>
            <span className="text-[11px] text-text-muted">Hayan Banki, Kaduna-North LGA</span>
          </div>

          {/* Item 3: Logistics Reach */}
          <div className="border-l border-s4/60 pl-4 max-md:border-l-0 max-md:pl-0">
            <span className="caption text-p1 block mb-1">Regional Logistics</span>
            <span className="font-serif text-base text-text-primary block">
              Nigeria &amp; West Africa
            </span>
            <span className="text-[11px] text-text-muted">Road haulage &amp; container freight</span>
          </div>

          {/* Item 4: Legal Registration Status */}
          <div className="border-l border-s4/60 pl-4 max-md:border-l-0 max-md:pl-0">
            <span className="caption text-p1 block mb-1">Legal Entity</span>
            <span className="font-serif text-base text-text-primary block">
              {business.registeredLegalName}
            </span>
            <span className="text-[11px] text-text-muted">CAC incorporation in progress</span>
          </div>
        </div>
      </div>
    </Element>
  );
}
