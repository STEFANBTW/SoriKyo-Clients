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
        {/* Fixed Background Layer - Parallax Effect */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Static Background */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-100 .dark:opacity-20"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1920')" }}
          ></div>
          {/* Purple Rain Scene Overlay */}
          <div className="absolute inset-0">
            <Scene />
          </div>
          {/* DESIGNER CONTROL: Parallax Transition Gradient (Bottom)
              Change h-[20%] to increase/decrease overlap with Services.
              Effect: Blends the floating 3D scene with the white background content. */}
          <div className="absolute bottom-0 left-0 w-full h-[20%] z-10 bg-gradient-to-t from-white .dark:from-[#0A0510] to-transparent"></div>

        </div>

        {/* Scrollable Hero Content - Slides up naturally */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center">
          <Hero />
        </div>

        {/* Trust Badges - Slides up */}
        <div className="relative z-10 border-b border-white/5 bg-transparent backdrop-blur-none">
          <TrustBadges />
        </div>

        {/* Services - Plain White in Light Mode, Deep Charcoal in Dark Mode */}
        <div className="relative z-20 bg-white .dark:bg-background text-prg-primary .dark:text-white pt-24 pb-24">
          <div className="reveal">
            <ServicesGrid />
          </div>
        </div>

        {/* Gallery - Light Shade of Purple in Light Mode, Deeper Purple in Dark Mode */}
        <div className="relative z-20 bg-prg-surface text-prg-primary .dark:text-white py-24">
          <div className="reveal">
            <TransformationGallery />
          </div>
        </div>

        {/* Testimonials - Darker Shade of Light Purple in Light Mode, Consistent Deep Background in Dark Mode */}
        <div className="relative z-20 bg-[#F3E5F9] .dark:bg-prg-surface text-prg-primary .dark:text-white py-24">
          <div className="reveal">
            <TestimonialsGrid />
          </div>
        </div>

        {/* Meet Our Artists - Plain White in Light Mode, Deep Background in Dark Mode */}
        <div className="relative z-20 bg-white .dark:bg-background text-prg-primary .dark:text-white py-24 shadow-2xl">
          <div className="reveal">
            <MasterArtists />
          </div>
        </div>

        {/* Booking Wizard & Footer */}
        <div className="relative z-20 bg-black/30 backdrop-blur-md pt-12">
          <div id="booking-wizard-trigger" className="w-full py-32 px-6 flex justify-center glass-noir border-t border-prg-secondary/10">
            <div className="reveal w-full max-w-4xl">
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

          <Footer />
        </div>
      </main>
    </div>
  );
}
