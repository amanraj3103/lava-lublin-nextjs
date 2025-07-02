import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Terms of Service | LAVA LUBLIN",
  description: "Read our terms of service and conditions for using LAVA LUBLIN's website and services.",
  alternates: {
    canonical: "https://lavalublin.pl/terms",
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <nav className="mb-8">
          <Link href="/" className="text-orange-500 hover:text-orange-400 transition-colors">
            ← Back to Home
          </Link>
        </nav>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-orange-500">Terms of Service</h1>
        <p className="text-gray-400 mb-8">Last updated: January 15, 2025</p>
        
        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">1. Acceptance of Terms</h2>
            <p className="text-gray-300 mb-4">
              By accessing and using the LAVA LUBLIN website and services, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">2. Use License</h2>
            <p className="text-gray-300 mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on LAVA LUBLIN&apos;s website for personal, non-commercial transitory viewing only.
            </p>
            <p className="text-gray-300 mb-4">This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">3. Online Ordering</h2>
            <p className="text-gray-300 mb-4">
              When placing orders through our website:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
              <li>All prices are in Polish Złoty (PLN) and include applicable taxes</li>
              <li>Orders are subject to availability</li>
              <li>We reserve the right to refuse service to anyone</li>
              <li>Delivery times are estimates and may vary</li>
              <li>Payment is required at the time of ordering</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">4. Disclaimer</h2>
            <p className="text-gray-300 mb-4">
              The materials on LAVA LUBLIN&apos;s website are provided on an &apos;as is&apos; basis. LAVA LUBLIN makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">5. Limitations</h2>
            <p className="text-gray-300 mb-4">
              In no event shall LAVA LUBLIN or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on LAVA LUBLIN&apos;s website, even if LAVA LUBLIN or a LAVA LUBLIN authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">6. Accuracy of Materials</h2>
            <p className="text-gray-300 mb-4">
              The materials appearing on LAVA LUBLIN&apos;s website could include technical, typographical, or photographic errors. LAVA LUBLIN does not warrant that any of the materials on its website are accurate, complete or current. LAVA LUBLIN may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">7. Links</h2>
            <p className="text-gray-300 mb-4">
              LAVA LUBLIN has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by LAVA LUBLIN of the site. Use of any such linked website is at the user&apos;s own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">8. Modifications</h2>
            <p className="text-gray-300 mb-4">
              LAVA LUBLIN may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms of Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">9. Governing Law</h2>
            <p className="text-gray-300 mb-4">
              These terms and conditions are governed by and construed in accordance with the laws of Poland and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">10. Contact Information</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about these Terms of Service, please contact us:
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