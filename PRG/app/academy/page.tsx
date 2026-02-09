'use client';

import React from 'react';
import { Footer } from "@/components/layout/Footer";
import Image from 'next/image';

const COURSES = [
    {
        title: "Master Barbering",
        duration: "12 Weeks",
        level: "Beginner to Advanced",
        description: "Learn precise fading, scissor work, and traditional shaving techniques from industry leaders.",
        modules: ["Hygiene & Safety", "Clipper Techniques", "Beard Sculpting", "Business Management"],
        image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Professional Makeup Artistry",
        duration: "10 Weeks",
        level: "Certification",
        description: "From bridal to editorial, master the fundamentals of color theory, contouring, and application.",
        modules: ["Color Theory", "Bridal & Event", "Editorial / High Fashion", "Skin Analysis"],
        image: "https://images.unsplash.com/photo-1455686950540-8f054f5a8685?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Nail Technology",
        duration: "8 Weeks",
        level: "Licensure Prep",
        description: "Comprehensive training in manicuring, pedicuring, and advanced nail art design.",
        modules: ["Anatomy of the Nail", "Gel & Acrylic Application", "Nail Art Trends", "Salon Sanitation"],
        image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop"
    }
];

const AcademyHero = () => (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            <Image
                src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1920&auto=format&fit=crop"
                alt="Academy Hero"
                fill
                className="object-cover opacity-30 blur-sm"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
                <span className="text-prg-secondary text-sm font-bold tracking-[0.3em] uppercase">PRG Beauty Academy</span>
                <h1 className="text-5xl md:text-7xl font-serif leading-tight">
                    Turn Your Passion into a <span className="text-white italic">Profession</span>
                </h1>
                <p className="text-lg text-text-secondary max-w-lg leading-relaxed">
                    Join the next generation of top-tier beauty professionals. Our comprehensive curriculum blends technical mastery with business acumen.
                </p>
                <div className="flex gap-4">
                    <button className="btn-primary px-8 py-4 text-sm tracking-widest uppercase">
                        View Courses
                    </button>
                    <button className="px-8 py-4 border border-white/20 hover:bg-white/5 rounded-lg text-sm tracking-widest uppercase transition-all">
                        Student Portal
                    </button>
                </div>
            </div>
            <div className="relative h-[500px] hidden md:block animate-fade-in delay-200">
                <div className="absolute inset-0 border-2 border-prg-secondary/20 rounded-t-full transform translate-x-4 translate-y-4"></div>
                <Image
                    src="https://images.unsplash.com/photo-1596704017235-d91295fc6a20?q=80&w=800&auto=format&fit=crop"
                    alt="Student Learning"
                    fill
                    className="object-cover rounded-t-full shadow-2xl z-10"
                />
            </div>
        </div>
    </section>
);

const CoursesSection = () => (
    <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif mb-6">Our Programs</h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                    Expert-led courses designed to launch your career in the beauty industry.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {COURSES.map((course, idx) => (
                    <div key={idx} className="glass-noir rounded-2xl overflow-hidden border border-white/5 hover:border-prg-secondary/30 transition-all duration-300 group hover:-translate-y-2">
                        <div className="relative h-64 overflow-hidden">
                            <Image
                                src={course.image}
                                alt={course.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-4 left-4">
                                <span className="px-3 py-1 bg-prg-secondary text-white text-[10px] uppercase font-bold tracking-widest rounded-full">
                                    {course.duration}
                                </span>
                            </div>
                        </div>
                        <div className="p-8 space-y-6">
                            <div>
                                <h3 className="text-2xl font-serif mb-2">{course.title}</h3>
                                <p className="text-xs text-text-muted uppercase tracking-widest">{course.level}</p>
                            </div>
                            <p className="text-text-secondary text-sm leading-relaxed">
                                {course.description}
                            </p>
                            <div className="space-y-2 border-t border-white/10 pt-4">
                                <span className="text-xs font-bold text-white uppercase block mb-2">Key Modules:</span>
                                {course.modules.map((mod, i) => (
                                    <div key={i} className="flex items-center text-sm text-text-secondary">
                                        <svg className="w-4 h-4 text-prg-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        {mod}
                                    </div>
                                ))}
                            </div>
                            <button className="w-full py-3 mt-4 border border-white/10 hover:bg-prg-secondary hover:border-prg-secondary transition-colors rounded-lg text-sm uppercase tracking-widest font-bold">
                                Download Syllabus
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const WhyChooseSection = () => (
    <section className="py-24 bg-prg-primary/5">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1 relative grid grid-cols-2 gap-4">
                    <div className="space-y-4 pt-12">
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg"><Image src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=600&auto=format&fit=crop" alt="Mentor" fill className="object-cover" /></div>
                    </div>
                    <div className="space-y-4">
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg"><Image src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=600&auto=format&fit=crop" alt="Certificate" fill className="object-cover" /></div>
                        <div className="glass-noir p-6 rounded-2xl border border-white/5 text-center">
                            <span className="text-4xl font-bold text-prg-secondary block mb-2">98%</span>
                            <span className="text-xs text-text-muted uppercase">Placement Rate</span>
                        </div>
                    </div>
                </div>
                <div className="order-1 md:order-2 space-y-8">
                    <h2 className="text-4xl md:text-5xl font-serif">Why Choose <br />PRG Academy?</h2>
                    <div className="space-y-6">
                        {[
                            { title: "Industry-Leading Mentors", desc: "Learn directly from award-winning stylists and artists actively working in the field." },
                            { title: "Hands-On Experience", desc: "Gain real-world experience in our student salon, working with real clients under supervision." },
                            { title: "Career Support", desc: "We provide job placement assistance, portfolio building, and business coaching." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-prg-secondary/10 flex items-center justify-center shrink-0 text-prg-secondary font-bold text-xl">
                                    {i + 1}
                                </div>
                                <div>
                                    <h4 className="text-xl font-serif mb-2">{item.title}</h4>
                                    <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const EnrollmentCTA = () => (
    <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
            <div className="bg-gradient-to-r from-prg-primary via-purple-900 to-prg-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                    <h2 className="text-4xl md:text-5xl font-serif text-white font-bold">Ready to Start Your Journey?</h2>
                    <p className="text-lg text-white/80">
                        Applications are now open for our upcoming semester. Secure your spot today and take the first step towards a rewarding career.
                    </p>
                    <form className="glass-noir p-2 rounded-full flex flex-col md:flex-row gap-2 max-w-lg mx-auto">
                        <input type="email" placeholder="Enter your email address" className="bg-transparent border-none outline-none px-6 py-3 flex-1 text-white placeholder:text-white/40" />
                        <button className="btn-accent px-8 py-3 rounded-full whitespace-nowrap">Apply Now</button>
                    </form>
                    <p className="text-xs text-white/50 mt-4">*Limited seats available per cohort.</p>
                </div>
            </div>
        </div>
    </section>
);

export default function AcademyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <main>
                <AcademyHero />
                <CoursesSection />
                <WhyChooseSection />
                <EnrollmentCTA />
            </main>
            <Footer />
        </div>
    );
}
