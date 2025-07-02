import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Privacy Policy | LAVA LUBLIN",
  description: "Learn how LAVA LUBLIN collects, uses, and protects your personal information. Read our comprehensive privacy policy.",
  alternates: {
    canonical: "https://lavalublin.pl/privacy",
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <nav className="mb-8">
          <Link href="/" className="text-orange-500 hover:text-orange-400 transition-colors">
            ← Back to Home
          </Link>
        </nav>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-orange-500">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: January 15, 2025</p>
        
        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">1. Information We Collect</h2>
            <p className="text-gray-300 mb-4">
              We collect information you provide directly to us, such as when you:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
              <li>Place an order through our website</li>
              <li>Contact us via email or phone</li>
              <li>Subscribe to our newsletter</li>
              <li>Visit our restaurant</li>
            </ul>
            <p className="text-gray-300">
              This may include your name, email address, phone number, delivery address, and order history.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">2. How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our services and website</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">3. Information Sharing</h2>
            <p className="text-gray-300 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties except:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
              <li>With your explicit consent</li>
              <li>To comply with legal requirements</li>
              <li>To protect our rights and safety</li>
              <li>With service providers who assist in our operations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">4. Data Security</h2>
            <p className="text-gray-300 mb-4">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">5. Your Rights</h2>
            <p className="text-gray-300 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Withdraw consent for marketing communications</li>
              <li>Lodge a complaint with supervisory authorities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">6. Cookies and Tracking</h2>
            <p className="text-gray-300 mb-4">
              We use cookies and similar technologies to improve your browsing experience and analyze website traffic. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">7. Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-300">
                <strong>Email:</strong> info@lavalublin.pl<br />
                <strong>Phone:</strong> +48 729 397 306<br />
                <strong>Address:</strong> ul.Nadbystrzycka 45/A, 20-618 Lublin, Poland
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 