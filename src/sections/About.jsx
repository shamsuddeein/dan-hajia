import React from 'react';
import { Element } from 'react-scroll';
import { ShieldCheck, MapPin, Layers, UserCheck } from 'lucide-react';
import { business, aboutContent } from '../constants/index.js';

export default function About() {
  const factCards = [
    {
      id: 'entity',
      icon: ShieldCheck,
      category: 'Legal Registration',
      title: business.registeredLegalName,
      status: 'CAC Registration in Progress',
      details:
        'Step 1 (Company Details) submitted on the CAC portal. Registered scope: wholesale & retail trade, motor vehicles, general import/export, lands, properties, and telecommunications.',
    },
    {
      id: 'director',
      icon: UserCheck,
      category: 'Leadership & Direction',
      title: business.leadership.name,
      status: business.leadership.role,
      details:
        'Direct executive oversight of commercial sourcing, inspections, and customer agreements. Every transaction is handled with direct principal communication.',
    },
    {
      id: 'facility',
      icon: MapPin,
      category: 'Registered Premises',
      title: 'Kaduna Facility & Head Office',
      status: 'Available for Inspection',
      details:
        `${business.publicContacts.streetName} (Post Code: ${business.publicContacts.postCode}, Plus Code: ${business.publicContacts.plusCode}).`,
    },
    {
      id: 'scope',
      icon: Layers,
      category: 'Commercial Scope',
      title: 'Four Core Divisions',
      status: 'Direct Provenance',
      details:
        'Foreign-used motor vehicles, surveyed Kaduna land plots, residential houses, and original smartphones with verified condition.',
    },
  ];

  return (
    <Element
      name="about"
      id="about"
      className="relative bg-s1 border-b border-s4 py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 max-md:px-4">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-p1" aria-hidden="true" />
            <span className="caption text-p1 font-sans">
              {aboutContent.eyebrow}
            </span>
          </div>
          <h2 className="h2 text-text-primary">
            {aboutContent.heading}
          </h2>
          <p className="body-1 text-text-muted mt-4">
            Dan Hajiya Investment is a Nigerian commercial trading enterprise based in Kaduna. Our business model is centered on physical verification, verifiable documentation, and direct principal dealing.
          </p>
        </div>

        {/* Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Main Story Narrative */}
          <div className="lg:col-span-7 bg-s2 border border-s4 p-8 lg:p-10 rounded-sm">
            <span className="caption text-p1 block mb-3 font-sans">
              Operating Philosophy
            </span>
            <blockquote className="font-serif text-2xl lg:text-3xl text-text-primary leading-snug border-l-2 border-p1 pl-6 my-6">
              &ldquo;We deal directly and transparently. Inspect by live video call or visit our Kaduna facility in person before entering any transaction.&rdquo;
            </blockquote>

            <div className="space-y-4 text-xs md:text-sm text-text-muted leading-relaxed">
              {aboutContent.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-s4 flex flex-wrap items-center gap-6 text-xs text-text-muted font-sans">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-p1 shrink-0" />
                <span>Documented pre-shipment and yard video footage</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-p1 shrink-0" />
                <span>Private corporate invoices shared upon transaction agreement</span>
              </div>
            </div>
          </div>

          {/* Leadership & Identity Card */}
          <div className="lg:col-span-5 bg-s2 border border-s4 p-8 lg:p-10 rounded-sm flex flex-col justify-between h-full">
            <div>
              <span className="caption text-p1 block mb-3 font-sans">
                Company &amp; Leadership
              </span>
              <h3 className="h4 text-text-primary mb-2">
                {business.leadership.name}
              </h3>
              <div className="text-xs text-p1 font-mono uppercase tracking-wider mb-6">
                {business.leadership.role}
              </div>

              <div className="space-y-3 p-4 bg-s3 border border-s4 rounded-sm text-xs">
                <div>
                  <span className="text-text-muted block font-sans uppercase tracking-wider text-[10px]">
                    Registered Corporate Entity
                  </span>
                  <span className="font-serif text-sm text-text-primary block mt-1">
                    {business.registeredLegalName}
                  </span>
                </div>
                <div className="pt-2 border-t border-s4/60">
                  <span className="text-text-muted block font-sans uppercase tracking-wider text-[10px]">
                    Registered Operating Premises
                  </span>
                  <span className="text-text-primary block mt-1">
                    {business.publicContacts.address}
                  </span>
                </div>
                <div className="pt-2 border-t border-s4/60">
                  <span className="text-text-muted block font-sans uppercase tracking-wider text-[10px]">
                    CAC Portal Status
                  </span>
                  <span className="text-p1 font-mono text-[11px] block mt-1">
                    Incorporation Step 1 Completed (iCRP Portal)
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-s4 text-[11px] text-text-muted font-mono">
              In-person evaluations welcome by appointment at our Kaduna premises.
            </div>
          </div>
        </div>

        {/* Checkable Credentials Grid */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-s4">
            <h3 className="font-serif text-xl text-text-primary">
              Company Credentials
            </h3>
            <span className="text-xs text-text-muted font-sans">
              Traceable to official records
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {factCards.map((card) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={card.id}
                  className="bg-s2 border border-s4 p-6 rounded-sm flex flex-col justify-between hover:border-p1/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="caption text-text-muted text-[10px]">
                        {card.category}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-s3 border border-s4 flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-p1" />
                      </div>
                    </div>
                    <h4 className="font-serif text-base text-text-primary mb-1">
                      {card.title}
                    </h4>
                    <span className="text-[11px] font-mono text-p1 block mb-3">
                      {card.status}
                    </span>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {card.details}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Element>
  );
}
