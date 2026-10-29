import React from 'react';
import { Element } from 'react-scroll';
import {
  MapPin,
  ShieldCheck,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  business,
  getWhatsAppEnquiryUrl,
} from '../constants/index.js';
import Button from '../components/Button.jsx';

export default function Contact() {
  const confirmedWhatsApp = getWhatsAppEnquiryUrl(
    'General enquiry regarding business consultation and verification'
  );
  const publicPhone = business.publicContacts.phone;
  const publicEmail = business.publicContacts.email;

  return (
    <Element
      name="contact"
      id="contact"
      className="relative bg-s1 border-b border-s4 py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 max-md:px-4">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-p1" aria-hidden="true" />
            <span className="caption text-p1 font-sans">
              Kaduna Headquarters • Direct Communication
            </span>
          </div>
          <h2 className="h2 text-text-primary">
            Contact &amp; Physical Office
          </h2>
          <p className="body-1 text-text-muted mt-4">
            We welcome direct enquiries, consultation by appointment, and live video verifications. In-person inspections can be scheduled at our Kaduna registered premises or on-site at vehicle yards and land parcels.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
          {/* Card 1: Registered Head Office & Premises */}
          <div className="bg-s2 border border-s4 rounded-lg p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="caption text-p1 font-sans">
                  Registered Premises
                </span>
                <span className="px-2.5 py-1 rounded bg-state-success/10 border border-state-success/30 text-state-success font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Visits by Appointment</span>
                </span>
              </div>

              <h3 className="font-serif text-2xl text-text-primary mb-3">
                Kaduna Registered Office
              </h3>

              <div className="flex items-start gap-3 text-text-primary text-base font-sans mb-4">
                <MapPin className="w-5 h-5 text-p1 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {business.publicContacts.address}
                </p>
              </div>

              <p className="body-2 text-text-muted text-xs leading-relaxed mb-6">
                Located in Kaduna-North Local Government Area, Kaduna State. International buyers and domestic clients are invited to schedule an in-person meeting or send an independent surveyor or mechanic to inspect goods before payment.
              </p>
            </div>

            <div className="pt-6 border-t border-s4/50 grid grid-cols-3 gap-4 text-xs font-mono text-text-muted">
              <div>
                <span className="text-text-primary block font-sans font-medium mb-1">
                  Jurisdiction
                </span>
                <span>Kaduna State</span>
              </div>
              <div>
                <span className="text-text-primary block font-sans font-medium mb-1">
                  Post Code
                </span>
                <span>{business.publicContacts.postCode || '800283'}</span>
              </div>
              <div>
                <span className="text-text-primary block font-sans font-medium mb-1">
                  Location Code
                </span>
                <span>{business.publicContacts.plusCode || 'HCHR+M9F'}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Legal Registration & Direct Channels */}
          <div className="space-y-6">
            {/* CAC Status Card */}
            <div className="bg-s2 border border-s4 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="caption text-p1 font-sans">
                  Entity Verification
                </span>
                <span className="px-2 py-0.5 rounded bg-p1/10 border border-p1/30 text-p1 font-mono text-[10px] uppercase tracking-wider">
                  CAC Step 1 Completed
                </span>
              </div>

              <h4 className="font-serif text-xl text-text-primary mb-2">
                {business.registeredLegalName}
              </h4>

              <p className="text-xs text-text-muted leading-relaxed mb-4">
                CAC incorporation in progress on the Corporate Affairs Commission (iCRP) portal. Step 1 (Company Details) submitted 2026-10-28 for wholesale and retail trade, motor vehicles, general imports/exports, and properties.
              </p>

              <div className="text-[11px] font-mono text-text-muted/70 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-p1 shrink-0" />
                <span>Certificate issuance and RC Number pending final filing steps.</span>
              </div>
            </div>

            {/* Direct Communication Channels */}
            <div className="bg-s2 border border-s4 rounded-lg p-6">
              <span className="caption text-p1 block mb-4 font-sans">
                Direct Contact Channels
              </span>

              <div className="space-y-4">
                {/* WhatsApp */}
                <div className="flex items-center justify-between p-3.5 rounded bg-s3/40 border border-s4">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-p1" />
                    <div>
                      <span className="text-xs font-medium text-text-primary block">
                        Direct WhatsApp
                      </span>
                      <span className="text-[11px] font-mono text-text-muted">
                        {publicPhone}
                      </span>
                    </div>
                  </div>

                  {confirmedWhatsApp && (
                    <Button
                      href={confirmedWhatsApp}
                      variant="primary"
                      className="text-xs py-1.5 px-3"
                    >
                      Chat on WhatsApp
                    </Button>
                  )}
                </div>

                {/* Telephone */}
                <div className="flex items-center justify-between p-3.5 rounded bg-s3/40 border border-s4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-p1" />
                    <div>
                      <span className="text-xs font-medium text-text-primary block">
                        Telephone Call
                      </span>
                      <span className="text-[11px] font-mono text-text-muted">
                        {publicPhone}
                      </span>
                    </div>
                  </div>

                  <a
                    href={`tel:${publicPhone.replace(/\s+/g, '')}`}
                    className="text-xs text-p1 font-sans hover:underline px-3 py-1.5 rounded border border-s4 bg-s1 hover:border-p1/60 transition-colors"
                  >
                    Call Office
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between p-3.5 rounded bg-s3/40 border border-s4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-p1" />
                    <div>
                      <span className="text-xs font-medium text-text-primary block">
                        Direct Email
                      </span>
                      <span className="text-[11px] font-mono text-text-muted">
                        {publicEmail}
                      </span>
                    </div>
                  </div>

                  <a
                    href={`mailto:${publicEmail}`}
                    className="text-xs text-p1 font-sans hover:underline px-3 py-1.5 rounded border border-s4 bg-s1 hover:border-p1/60 transition-colors"
                  >
                    Send Email
                  </a>
                </div>
              </div>

              <div className="mt-4 p-3 rounded bg-s3/20 border border-s4/60 flex items-start gap-2.5 text-[11px] text-text-muted">
                <AlertCircle className="w-4 h-4 text-p1 shrink-0 mt-0.5" />
                <span>
                  To prevent payment fraud, corporate bank account details are never published on this website. Official invoices and payment instructions are shared privately upon formal agreement.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Element>
  );
}
