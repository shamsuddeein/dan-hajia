import React from 'react';
import { Element } from 'react-scroll';
import {
  Car,
  Landmark,
  Home,
  Smartphone,
  Video,
  MessageSquare,
  CheckCircle2,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { businessActivities, getWhatsAppEnquiryUrl } from '../constants/index.js';
import Button from '../components/Button.jsx';

export default function Activities() {
  const getIcon = (id) => {
    switch (id) {
      case 'automotive':
        return Car;
      case 'lands':
        return Landmark;
      case 'properties':
        return Home;
      case 'electronics':
        return Smartphone;
      default:
        return ShieldCheck;
    }
  };

  return (
    <Element
      name="what-we-do"
      id="what-we-do"
      className="relative bg-s1 border-b border-s4 py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 max-md:px-4">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-p1" aria-hidden="true" />
            <span className="caption text-p1 font-sans">
              Commercial Operations • Four Business Lines
            </span>
          </div>
          <h2 className="h2 text-text-primary">
            What We Do
          </h2>
          <p className="body-1 text-text-muted mt-4">
            Dan Hajiya Investment conducts commercial trading and sourcing across four primary divisions. Each line operates through physical inspection, documented titles, and direct principal dealing.
          </p>
        </div>

        {/* 2x2 Business Activities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {businessActivities.map((activity) => {
            const Icon = getIcon(activity.id);
            const enquiryUrl = getWhatsAppEnquiryUrl(activity.enquiryTopic);
            const points = activity.points || activity.highlights || [];
            const hasSupportedMedia = activity.id === 'automotive';

            return (
              <div
                key={activity.id}
                id={activity.anchorId}
                className="bg-s2 border border-s4 rounded-lg p-8 flex flex-col justify-between hover:border-s3 transition-all relative group"
              >
                <div>
                  {/* Top Bar with Badge & Icon */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="px-2.5 py-1 rounded bg-p1/10 border border-p1/30 text-p1 font-mono text-[10px] uppercase tracking-wider">
                      {activity.badge}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-s3 border border-s4 flex items-center justify-center text-p1 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-2xl text-text-primary mb-2">
                    {activity.title}
                  </h3>
                  <div className="text-xs text-p1 font-sans font-medium mb-4">
                    {activity.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-text-muted leading-relaxed mb-6">
                    {activity.description}
                  </p>

                  {/* Points Bullet List */}
                  <div className="space-y-2.5 mb-8">
                    {points.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-text-primary/90">
                        <CheckCircle2 className="w-4 h-4 text-p1 shrink-0 mt-0.5" />
                        <span className="leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-6 border-t border-s4/60 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    {enquiryUrl ? (
                      <Button
                        href={enquiryUrl}
                        variant="primary"
                        className="text-xs py-2 px-4"
                      >
                        <MessageSquare className="w-3.5 h-3.5 mr-2" />
                        Direct Enquiry
                      </Button>
                    ) : (
                      <Button
                        href="#contact"
                        variant="primary"
                        className="text-xs py-2 px-4"
                      >
                        <MessageSquare className="w-3.5 h-3.5 mr-2" />
                        Contact Office
                      </Button>
                    )}
                  </div>

                  <div>
                    {hasSupportedMedia ? (
                      <a
                        href="#gallery"
                        className="inline-flex items-center gap-1.5 text-xs font-sans text-text-muted hover:text-p1 transition-colors py-2"
                      >
                        <Video className="w-3.5 h-3.5 text-p1" />
                        <span>View Vehicle Footage</span>
                      </a>
                    ) : (
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-1.5 text-xs font-sans text-text-muted hover:text-p1 transition-colors py-2"
                      >
                        <MapPin className="w-3.5 h-3.5 text-p1" />
                        <span>Kaduna Consultation</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Due Diligence Reassurance Card */}
        <div className="mt-12 bg-s2/80 border border-s4 rounded-lg p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="w-12 h-12 rounded-full bg-s3 border border-s4 flex items-center justify-center shrink-0 text-p1">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-text-primary">
                Physical Inspection &amp; Direct Verification
              </h4>
              <p className="body-2 text-text-muted mt-1 text-xs leading-relaxed">
                We believe in genuine transactions backed by inspection. You or your appointed local mechanic, surveyor, or legal representative can physically examine vehicles and inspect land boundaries before concluding any agreement.
              </p>
            </div>
          </div>

          <div className="shrink-0 max-md:w-full">
            <Button
              href="#our-work"
              variant="secondary"
              className="max-md:w-full text-xs"
            >
              See Selected Work
            </Button>
          </div>
        </div>
      </div>
    </Element>
  );
}

