import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { SensoryDashboard } from '@/components/accessibility/SensoryDashboard';
import { AccessibilityProvider } from '@/components/accessibility/AccessibilityProvider';
import { Navbar } from '@/components/layout/Navbar';
import { GeminiChatWrapper } from '@/components/ai/GeminiChatWrapper';
import { WhatsAppConcierge } from '@/components/features/WhatsAppConcierge';
import { UnifiedChatButton } from '@/components/features/UnifiedChatButton';
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";
import { ThemeToggle } from '@/components/ui/ThemeToggle';
// import { SmoothScroll } from '@/components/ui/SmoothScroll';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

// GEO Optimization Metadata
const geoMetadata = {
  other: {
    'geo.region': 'NG-PL', // Nigeria, Plateau
    'geo.placename': 'Jos',
    'geo.position': '9.8965;8.8583', // Lat;Long for Jos
    'ICBM': '9.8965, 8.8583',
  },
};

// SEO & PWA Metadata
export const metadata: Metadata = {
  title: 'Purple Rain Galore | Luxury Unisex Salon & Spa in Jos',
  description: 'Experience premium beauty services at Purple Rain Galore. Hair, nails, spa, and beauty academy in the heart of Jos, Nigeria.',
  applicationName: 'Purple Rain Galore',
  authors: [{ name: 'Purple Rain Galore', url: 'https://serenityspa.com' }],
  keywords: ['salon in jos', 'spa in jos', 'beauty academy jos', 'hair salon', 'nails jos', 'purple rain galore'],
  creator: 'SoriKyo Systems',
  publisher: 'Purple Rain Galore',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'PRG Salon',
  },
  ...geoMetadata.other, // Add Geo tags
};

export const viewport: Viewport = {
  themeColor: '#10B981',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

// GEO JSON-LD for Local Discovery
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: 'Purple Rain Galore',
  image: 'https://serenityspa.com/images/og-image.jpg',
  '@id': 'https://serenityspa.com',
  url: 'https://serenityspa.com',
  telephone: '+2348000000000',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rayfield Road',
    addressLocality: 'Jos',
    addressRegion: 'Plateau',
    postalCode: '930101',
    addressCountry: 'NG',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 9.8965,
    longitude: 8.8583,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  sameAs: [
    'https://www.facebook.com/purpleraiingalore',
    'https://www.instagram.com/purpleraiingalore',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${jakarta.variable} antialiased bg-background text-foreground transition-colors duration-300`}
        suppressHydrationWarning
      >
        <AccessibilityProvider>
          {/* <SmoothScroll /> */}
          <ThemeToggle />
          <Navbar />
          {children}
          <SensoryDashboard />
          <GeminiChatWrapper />
          <WhatsAppConcierge />
          <UnifiedChatButton />
          <AnalyticsProvider />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
