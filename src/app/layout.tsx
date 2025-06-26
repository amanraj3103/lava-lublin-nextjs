import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "LAVA LUBLIN - Crispy Food, Hot Vibes",
  description: "Experience the perfect blend of crispy textures and bold flavors at Lava Lublin. Visit us for the best burgers and wraps in Lublin, Poland.",
  keywords: "Lava Lublin, restaurant, burgers, wraps, crispy food, Lublin, Poland",
  authors: [{ name: "LAVA LUBLIN" }],
  openGraph: {
    title: "LAVA LUBLIN - Crispy Food, Hot Vibes",
    description: "Experience the perfect blend of crispy textures and bold flavors at Lava Lublin.",
    url: "https://lavalublin.pl",
    siteName: "LAVA LUBLIN",
    images: [
      {
        url: "/lava_icon.png",
        width: 1200,
        height: 630,
        alt: "LAVA LUBLIN Restaurant",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LAVA LUBLIN - Crispy Food, Hot Vibes",
    description: "Experience the perfect blend of crispy textures and bold flavors at Lava Lublin.",
    images: ["/lava_icon.png"],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script src="https://static.elfsight.com/platform/platform.js" async></script>
      </head>
      <body className="font-['Montserrat',sans-serif]">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
