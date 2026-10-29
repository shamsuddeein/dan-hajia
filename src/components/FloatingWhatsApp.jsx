import React from 'react';
import { MessageSquare } from 'lucide-react';
import { getWhatsAppEnquiryUrl } from '../constants/index.js';

export default function FloatingWhatsApp() {
  // STRICT REQUIREMENT: Only render when its public number is confirmed by the owner
  const whatsappUrl = getWhatsAppEnquiryUrl('Website visitor inquiry');
  if (!whatsappUrl) return null;

  return (
    <aside aria-label="Floating direct enquiry" className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Enquiry"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-p1 text-s1 font-medium text-xs shadow-xl hover:bg-p2 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-p1"
      >
        <MessageSquare className="w-4 h-4" />
        <span className="font-sans">Chat on WhatsApp</span>
      </a>
    </aside>
  );
}

