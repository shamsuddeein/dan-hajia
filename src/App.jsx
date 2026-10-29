import React from 'react';
import Header from './components/Header.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Activities from './sections/Activities.jsx';
import SelectedWork from './sections/SelectedWork.jsx';
import MediaGallery from './sections/MediaGallery.jsx';
import DealingFaq from './sections/DealingFaq.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './components/Footer.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-s1 text-text-primary selection:bg-p1 selection:text-s1">
      {/* Header & Fixed Navigation */}
      <Header />

      {/* Main Content Sections: Exact Corporate Profile Sequence */}
      <main id="main-content">
        {/* 1. Introduction: Commercial Profile & Proposition */}
        <Hero />

        {/* 2. Company & Owner: Leadership, CAC Entity & Registered Facility */}
        <About />

        {/* 3. What We Do: Four Core Trading Lines */}
        <Activities />

        {/* 4. Selected Work: Highlighted Documentary Logistics & Staging */}
        <SelectedWork />

        {/* 5. Complete Gallery: All 32 Preserved Media Records */}
        <MediaGallery />

        {/* 6. Process & FAQ: Commercial Trading Due Diligence */}
        <DealingFaq />

        {/* 7. Company Details & Contact: Kaduna Registered Facility */}
        <Contact />
      </main>

      {/* Footer Navigation & Legal Entity Summary */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />
    </div>
  );
}
