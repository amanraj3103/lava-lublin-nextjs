import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://lavalublin.pl"),
  title: {
    default: "LAVA LUBLIN - Crispy Food, Hot Vibes | Best Burgers & Wraps in Lublin",
    template: "%s | LAVA LUBLIN"
  },
  description: "Experience the perfect blend of crispy textures and bold flavors at Lava Lublin. Visit us for the best burgers, wraps, and street food in Lublin, Poland. Order online or visit our restaurant at ul.Nadbystrzycka 45/A.",
  keywords: [
    "LAVA LUBLIN",
    "restaurant Lublin",
    "burgers Lublin",
    "wraps Lublin", 
    "crispy food",
    "street food Lublin",
    "best burgers Poland",
    "food delivery Lublin",
    "restaurant near me",
    "chicken burgers",
    "vegetarian options",
    "fast food Lublin",
    "restaurant menu",
    "online ordering"
  ],
  authors: [{ name: "LAVA LUBLIN", url: "https://lavalublin.pl" }],
  creator: "LAVA LUBLIN",
  publisher: "LAVA LUBLIN",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "LAVA LUBLIN - Crispy Food, Hot Vibes | Best Burgers & Wraps in Lublin",
    description: "Experience the perfect blend of crispy textures and bold flavors at Lava Lublin. Visit us for the best burgers, wraps, and street food in Lublin, Poland.",
    url: "https://lavalublin.pl",
    siteName: "LAVA LUBLIN",
    images: [
      {
        url: "/lava_icon.png",
        width: 1200,
        height: 630,
        alt: "LAVA LUBLIN Restaurant - Crispy Food, Hot Vibes",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LAVA LUBLIN - Crispy Food, Hot Vibes | Best Burgers & Wraps in Lublin",
    description: "Experience the perfect blend of crispy textures and bold flavors at Lava Lublin. Visit us for the best burgers, wraps, and street food in Lublin, Poland.",
    images: ["/lava_icon.png"],
    creator: "@lavalublin",
    site: "@lavalublin",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://lavalublin.pl",
    languages: {
      'en': "https://lavalublin.pl",
      'pl': "https://lavalublin.pl/pl",
      'uk': "https://lavalublin.pl/uk",
    },
  },
  category: "restaurant",
  classification: "Food & Dining",
  other: {
    "geo.region": "PL-LU",
    "geo.placename": "Lublin",
    "geo.position": "51.236164;22.544306",
    "ICBM": "51.236164, 22.544306",
    "DC.title": "LAVA LUBLIN - Crispy Food, Hot Vibes",
    "DC.creator": "LAVA LUBLIN",
    "DC.subject": "Restaurant, Burgers, Wraps, Street Food",
    "DC.description": "Best burgers and wraps in Lublin, Poland",
    "DC.publisher": "LAVA LUBLIN",
    "DC.contributor": "LAVA LUBLIN",
    "DC.date": "2025",
    "DC.type": "Text",
    "DC.format": "text/html",
    "DC.identifier": "https://lavalublin.pl",
    "DC.language": "en",
    "DC.coverage": "Lublin, Poland",
    "DC.rights": "Copyright 2025 LAVA LUBLIN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://static.elfsight.com/platform/platform.js" async></script>
        {/* Structured Data for Restaurant */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "LAVA LUBLIN",
              "description": "Experience the perfect blend of crispy textures and bold flavors at Lava Lublin. Visit us for the best burgers, wraps, and street food in Lublin, Poland.",
              "url": "https://lavalublin.pl",
              "telephone": "+48729397306",
              "email": "info@lavalublin.pl",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "ul.Nadbystrzycka 45/A",
                "addressLocality": "Lublin",
                "postalCode": "20-618",
                "addressCountry": "PL"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 51.236164,
                "longitude": 22.544306
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday"],
                  "opens": "10:00",
                  "closes": "23:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Thursday", "Friday", "Saturday"],
                  "opens": "11:00",
                  "closes": "02:00"
                }
              ],
              "priceRange": "$$",
              "image": "https://lavalublin.pl/lava_icon.png",
              "logo": "https://lavalublin.pl/lava_icon.png",
              "sameAs": [
                "https://www.instagram.com/lava_lublin"
              ],
              "menu": "https://lavalublin.pl/order",
              "acceptsReservations": false,
              "deliveryAvailable": true,
              "takeoutAvailable": true,
              "areaServed": {
                "@type": "City",
                "name": "Lublin",
                "addressCountry": "PL"
              },
              "paymentAccepted": ["Cash", "Credit Card", "Debit Card"],
              "currenciesAccepted": "PLN",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "127",
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": [
                {
                  "@type": "Review",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  },
                  "author": {
                    "@type": "Person",
                    "name": "Anna K."
                  },
                  "reviewBody": "Amazing burgers! The crispy texture and bold flavors are exactly what I was looking for. Highly recommend!"
                },
                {
                  "@type": "Review",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  },
                  "author": {
                    "@type": "Person",
                    "name": "Marek S."
                  },
                  "reviewBody": "Best wraps in Lublin! Fresh ingredients and great service. Will definitely come back."
                }
              ],
              "hasMenu": {
                "@type": "Menu",
                "url": "https://lavalublin.pl/order",
                "name": "LAVA LUBLIN Menu"
              },
              "servesCuisine": ["American", "Street Food", "Burgers", "Wraps", "Fast Food"],
              "dietaryRestrictions": ["Vegetarian Options Available"],
              "amenityFeature": [
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Free WiFi",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Outdoor Seating",
                  "value": false
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Delivery",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Takeout",
                  "value": true
                }
              ]
            })
          }}
        />
        {/* Breadcrumbs Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://lavalublin.pl"
                }
              ]
            })
          }}
        />
        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "LAVA LUBLIN",
              "url": "https://lavalublin.pl",
              "logo": "https://lavalublin.pl/lava_icon.png",
              "description": "Best burgers and wraps in Lublin, Poland",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "ul.Nadbystrzycka 45/A",
                "addressLocality": "Lublin",
                "postalCode": "20-618",
                "addressCountry": "PL"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+48729397306",
                "contactType": "customer service",
                "availableLanguage": ["English", "Polish", "Ukrainian"]
              },
              "sameAs": [
                "https://www.instagram.com/lava_lublin"
              ]
            })
          }}
        />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://static.elfsight.com" />
        <link rel="preconnect" href="https://maps.google.com" />
        <link rel="preconnect" href="https://formspree.io" />
        {/* Favicon and app icons */}
        <link rel="icon" href="/lava_icon.png" />
        <link rel="apple-touch-icon" href="/lava_icon.png" />
        <link rel="manifest" href="/manifest.json" />
+        
+        {/* Hreflang tags for internationalization */}
+        <link rel="alternate" hrefLang="en" href="https://lavalublin.pl" />
+        <link rel="alternate" hrefLang="pl" href="https://lavalublin.pl/pl" />
+        <link rel="alternate" hrefLang="uk" href="https://lavalublin.pl/uk" />
+        <link rel="alternate" hrefLang="x-default" href="https://lavalublin.pl" />
        
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `}
        </Script>
        
        {/* Error Monitoring */}
        <Script id="error-monitoring" strategy="afterInteractive">
          {`
            window.addEventListener('error', function(e) {
              console.error('Global error:', e.error);
              // Send to your error tracking service
              if (typeof gtag !== 'undefined') {
                gtag('event', 'exception', {
                  description: e.error?.message || 'Unknown error',
                  fatal: false
                });
              }
            });
            
            window.addEventListener('unhandledrejection', function(e) {
              console.error('Unhandled promise rejection:', e.reason);
              if (typeof gtag !== 'undefined') {
                gtag('event', 'exception', {
                  description: e.reason?.message || 'Unhandled promise rejection',
                  fatal: false
                });
              }
            });
          `}
        </Script>
        
        {/* Performance Monitoring */}
        <Script id="performance-monitoring" strategy="afterInteractive">
          {`
            if ('performance' in window) {
              window.addEventListener('load', function() {
                setTimeout(function() {
                  const perfData = performance.getEntriesByType('navigation')[0];
                  if (perfData && typeof gtag !== 'undefined') {
                    gtag('event', 'timing_complete', {
                      name: 'load',
                      value: Math.round(perfData.loadEventEnd - perfData.loadEventStart)
                    });
                  }
                }, 0);
              });
            }
          `}
        </Script>
      </head>
      <body className="font-['Montserrat',sans-serif]">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Providers>
          {children}
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
