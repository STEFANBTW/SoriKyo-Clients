'use client';

import { BookingWizard } from "@/components/booking/BookingWizard";
import Scene from "@/components/3d/Scene";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { MasterArtists } from "@/components/sections/MasterArtists";
import { TransformationGallery } from "@/components/sections/TransformationGallery";
import { TestimonialsGrid } from "@/components/sections/TestimonialsGrid";
// SocialProof and BookingCallout removed as per requirements

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-prg-secondary/30 selection:text-white">

      <main className="relative flex flex-col">
        {/* Hero Section with Dedicated Background */}
        <div className="relative min-h-screen">
          {/* 3D Background Layer - Scoped to Hero */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Static Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 dark:opacity-20"
              style={{ backgroundImage: "url('https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1920')" }}
            ></div>
            {/* Purple Rain Scene Overlay - Full Opacity for Vibrancy */}
            <div className="absolute inset-0">
              <Scene />
            </div>
            {/* Gradient Overlay for text readability - Lighter to show rain */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background/80"></div>
          </div>

          {/* Narrative Flow */}
          <div className="relative z-10">
            <Hero />
          </div>
        </div>

        <TrustBadges />

        <div className="space-y-24 mb-32 bg-background relative z-10 pt-12">
          <ServicesGrid />
          <MasterArtists />
          <TransformationGallery />
          <TestimonialsGrid />
        </div>

        {/* The Functional Core: Booking Wizard */}
        <div id="booking-wizard-trigger" className="w-full py-32 px-6 flex justify-center glass-noir border-t border-prg-secondary/10 relative z-10 bg-background">
          <div className="w-full max-w-4xl">
            <div className="text-center space-y-4 mb-16">
              <span className="text-prg-secondary text-xs font-bold tracking-[0.3em] uppercase">Book Your Visit</span>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground">Secure Your Session</h2>
              <p className="text-text-secondary text-sm max-w-md mx-auto">
                Choose your service and preferred time. We&apos;ll confirm your appointment within 24 hours.
              </p>
            </div>
            <BookingWizard />
          </div>
        </div>
      </main>

      {/* Footer is relative z-10 to be scrollable and clickable */}
      <div className="relative z-10 bg-background">
        <Footer />
      </div>
    </div>
  );
}
