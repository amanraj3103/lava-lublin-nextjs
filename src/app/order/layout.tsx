import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Order Online | LAVA LUBLIN - Best Burgers & Wraps in Lublin",
  description: "Order delicious burgers, wraps, and street food online from LAVA LUBLIN. Fast delivery and pickup available. Browse our menu and place your order today!",
  keywords: [
    "order online LAVA LUBLIN",
    "food delivery Lublin",
    "burger delivery",
    "wrap delivery",
    "online food ordering",
    "LAVA LUBLIN menu",
    "restaurant delivery Lublin",
    "food pickup Lublin"
  ],
  openGraph: {
    title: "Order Online | LAVA LUBLIN - Best Burgers & Wraps in Lublin",
    description: "Order delicious burgers, wraps, and street food online from LAVA LUBLIN. Fast delivery and pickup available.",
    url: "https://lavalublin.pl/order",
    type: "website",
  },
  twitter: {
    title: "Order Online | LAVA LUBLIN - Best Burgers & Wraps in Lublin",
    description: "Order delicious burgers, wraps, and street food online from LAVA LUBLIN. Fast delivery and pickup available.",
  },
  alternates: {
    canonical: "https://lavalublin.pl/order",
  },
}

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Breadcrumbs Structured Data for Order Page */}
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
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Order Online",
                "item": "https://lavalublin.pl/order"
              }
            ]
          })
        }}
      />
      {children}
    </>
  )
} 