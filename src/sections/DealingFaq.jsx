import React, { useState } from 'react';
import { Element } from 'react-scroll';
import {
  Plus,
  Minus,
  ShieldCheck,
  ArrowRight,
  Video,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';
import { dealingProcess, companyFaqs, getWhatsAppEnquiryUrl } from '../constants/index.js';
import Button from '../components/Button.jsx';

export default function DealingFaq() {
  const [activeId, setActiveId] = useState(null);

  const half = Math.ceil(companyFaqs.length / 2);
  const col1 = companyFaqs.slice(0, half);
  const col2 = companyFaqs.slice(half);

  const toggleFaq = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const stepBadges = [
    'Direct Consultation',
    'Physical or Video Inspection',
    'Official Bank Invoice',
    'Freight & Transport',
    'Documented Handover',
  ];

  const generalWhatsAppUrl = getWhatsAppEnquiryUrl(
    'General enquiry regarding dealing process, inspection, and payment terms'
  );

  return (
    <Element
      name="process"
      id="process"
      className="relative bg-s1 border-b border-s4 py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 max-md:px-4">
        {/* =========================================================================
            PART 1: HOW WE TRADE (DEALING FLOW)
           ========================================================================= */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-px bg-p1" aria-hidden="true" />
                <span className="caption text-p1 font-sans">
                  Dealing Flow • Transparent Commercial Process
                </span>
              </div>
              <h2 className="h2 text-text-primary">
                How We Conduct Business
              </h2>
              <p className="body-1 text-text-muted mt-4">
                We operate through direct commercial agreements rather than anonymous online carts. Every vehicle, parcel of land, residential property, or equipment order is personally reviewed, physically inspectable, and concluded with direct principal communication.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href="#our-work"
                className="inline-flex items-center gap-2 text-xs font-sans text-p1 uppercase tracking-wider hover:text-p2 transition-colors py-2"
              >
                <Video className="w-4 h-4" />
                <span>See Logistics in Action</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Numbered Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {dealingProcess.map((step, index) => (
              <div
                key={step.step}
                className="bg-s2 border border-s4 rounded-lg p-6 flex flex-col justify-between hover:border-s3 transition-colors relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-3xl font-light text-p1">
                      {step.step}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-s3 text-text-muted border border-s4/60">
                      Step {index + 1}
                    </span>
                  </div>
                  <h3 className="font-sans font-semibold text-text-primary text-base mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-s4/50">
                  <span className="text-[11px] text-p1 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{stepBadges[index] || 'Verified Protocol'}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Inspection Reassurance Banner */}
          <div className="mt-8 bg-s2/70 border border-s4 rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-s3 border border-s4 flex items-center justify-center shrink-0 text-p1">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans font-semibold text-text-primary text-sm">
                  Physical Yard &amp; Registered Office Consultation
                </h4>
                <p className="text-xs text-text-muted mt-1 leading-relaxed">
                  Before finalizing transaction terms, you or your appointed representative can inspect goods at our Kaduna facility (No U11, Barrack Road, Hayan Banki, Kaduna) or request live interactive video examination.
                </p>
              </div>
            </div>
            <div className="shrink-0 max-md:w-full">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 text-xs font-sans text-p1 uppercase tracking-wider hover:text-p2 transition-colors py-2 px-4 border border-s4 rounded bg-s3/40 hover:bg-s3 max-md:w-full"
              >
                <span>View Kaduna Office</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <div className="my-20 border-t border-s4 relative">
          <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-8 h-3 bg-s1 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-p1" />
          </div>
        </div>

        {/* =========================================================================
            PART 2: FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION)
           ========================================================================= */}
        <div id="faq">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-p1" aria-hidden="true" />
              <span className="caption text-p1 font-sans">
                Due Diligence • Clarity &amp; Answers
              </span>
            </div>
            <h2 className="h2 text-text-primary">
              Frequently Asked Questions
            </h2>
            <p className="body-1 text-text-muted mt-4">
              Straightforward answers regarding physical inspections, corporate bank transfers, regional logistics, and land title verification.
            </p>
          </div>

          {/* Two-column desktop split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Column 1 */}
            <div className="space-y-4">
              {col1.map((item) => {
                const isOpen = activeId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`border rounded-lg transition-colors overflow-hidden ${
                      isOpen
                        ? 'bg-s2 border-p1/40'
                        : 'bg-s2 border-s4 hover:border-s3'
                    }`}
                  >
                    <button
                      type="button"
                      id={`faq-btn-${item.id}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${item.id}`}
                      onClick={() => toggleFaq(item.id)}
                      className="w-full flex items-center justify-between p-5 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-p1"
                    >
                      <span className="font-sans font-medium text-sm md:text-base text-text-primary pr-4 leading-snug">
                        {item.question}
                      </span>
                      <span
                        className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors duration-200 ${
                          isOpen
                            ? 'bg-p1 text-s1 border-p1'
                            : 'border-s4 bg-s3/70 text-text-muted hover:text-text-primary'
                        }`}
                        aria-hidden="true"
                      >
                        {isOpen ? (
                          <Minus className="w-3.5 h-3.5" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                      </span>
                    </button>

                    <div
                      id={`faq-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${item.id}`}
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                          ? 'grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 pb-5 pt-1 border-t border-s4/40 mt-1">
                          <p className="body-2 text-text-muted text-xs md:text-sm leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              {col2.map((item) => {
                const isOpen = activeId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`border rounded-lg transition-colors overflow-hidden ${
                      isOpen
                        ? 'bg-s2 border-p1/40'
                        : 'bg-s2 border-s4 hover:border-s3'
                    }`}
                  >
                    <button
                      type="button"
                      id={`faq-btn-${item.id}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${item.id}`}
                      onClick={() => toggleFaq(item.id)}
                      className="w-full flex items-center justify-between p-5 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-p1"
                    >
                      <span className="font-sans font-medium text-sm md:text-base text-text-primary pr-4 leading-snug">
                        {item.question}
                      </span>
                      <span
                        className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors duration-200 ${
                          isOpen
                            ? 'bg-p1 text-s1 border-p1'
                            : 'border-s4 bg-s3/70 text-text-muted hover:text-text-primary'
                        }`}
                        aria-hidden="true"
                      >
                        {isOpen ? (
                          <Minus className="w-3.5 h-3.5" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                      </span>
                    </button>

                    <div
                      id={`faq-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${item.id}`}
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                          ? 'grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 pb-5 pt-1 border-t border-s4/40 mt-1">
                          <p className="body-2 text-text-muted text-xs md:text-sm leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Prompt */}
          <div className="mt-12 bg-s2 border border-s4 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="caption text-p1 block mb-2 font-sans">
                Direct Communication
              </span>
              <h3 className="h3 text-text-primary text-xl">
                Have a Specific Enquiry or Sourcing Request?
              </h3>
              <p className="body-2 text-text-muted mt-2">
                We are available to answer questions, coordinate live video examinations, or schedule a physical appointment at our Kaduna premises.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0 max-md:w-full">
              {generalWhatsAppUrl ? (
                <Button
                  href={generalWhatsAppUrl}
                  variant="primary"
                  className="max-md:w-full"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat on WhatsApp
                </Button>
              ) : (
                <Button
                  href="#contact"
                  variant="primary"
                  className="max-md:w-full"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Kaduna Office
                </Button>
              )}
              <Button
                href="#contact"
                variant="secondary"
                className="max-md:w-full"
              >
                View Kaduna Address
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Element>
  );
}
