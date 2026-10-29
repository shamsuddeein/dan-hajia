import React from 'react';
import { ShieldCheck, MapPin } from 'lucide-react';
import { scroller } from 'react-scroll';
import { footerContent, navItems } from '../constants/index.js';

export default function Footer() {
  const handleNavClick = (targetId, event) => {
    if (event) event.preventDefault();
    scroller.scrollTo(targetId, {
      duration: 500,
      smooth: true,
      offset: -90,
    });
  };

  return (
    <footer className="bg-s1 border-t border-s4 text-text-muted py-16 px-6 max-md:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-s4/60">
          {/* Column 1: Brand & Legal Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-p1 flex items-center justify-center font-serif text-p1 font-bold text-xs tracking-tighter">
                DH
              </div>
              <span className="font-serif text-lg text-text-primary tracking-wide">
                {footerContent.brandName}
              </span>
            </div>

            <p className="text-xs text-text-muted leading-relaxed max-w-sm">
              Nigerian commercial trading house supplying foreign-used vehicles, Kaduna land parcels, residential homes, and mobile devices with physical verification.
            </p>

            <div className="pt-2">
              <div className="text-xs font-semibold text-text-primary">
                {footerContent.registeredName}
              </div>
              <div className="text-[11px] text-p1 font-mono flex items-center gap-1.5 mt-1">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>{footerContent.cacStatusNotice}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links Repeat with Native Semantics */}
          <div>
            <span className="caption text-p1 block mb-4 font-sans text-xs">
              Direct Navigation
            </span>
            <ul className="grid grid-cols-2 gap-2 text-xs font-sans">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.href}`}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="text-text-muted hover:text-text-primary hover:underline transition-colors cursor-pointer py-1 block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-p1 rounded"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Physical Office Location */}
          <div className="space-y-3">
            <span className="caption text-p1 block mb-1 font-sans text-xs">
              Registered Office
            </span>
            <div className="flex items-start gap-2 text-xs text-text-primary leading-relaxed">
              <MapPin className="w-4 h-4 text-p1 shrink-0 mt-0.5" />
              <span>{footerContent.address}</span>
            </div>
            <p className="text-[11px] text-text-muted/70 leading-relaxed pt-2">
              All transactions, invoices, and bank payments are handled directly with the business principal through verified private communication.
            </p>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted/60">
          <div>
            {footerContent.rights}
          </div>
          <div>
            {footerContent.disclaimer}
          </div>
        </div>
      </div>
    </footer>
  );
}
