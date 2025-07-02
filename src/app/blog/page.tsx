import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: "Blog & News | LAVA LUBLIN - Latest Updates & Food Stories",
  description: "Stay updated with the latest news, food stories, and special offers from LAVA LUBLIN. Discover our culinary journey and upcoming events in Lublin.",
  keywords: [
    "LAVA LUBLIN blog",
    "restaurant news Lublin",
    "food stories",
    "restaurant updates",
    "Lublin food blog",
    "burger news",
    "restaurant events"
  ],
  openGraph: {
    title: "Blog & News | LAVA LUBLIN - Latest Updates & Food Stories",
    description: "Stay updated with the latest news, food stories, and special offers from LAVA LUBLIN.",
    url: "https://lavalublin.pl/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://lavalublin.pl/blog",
  },
}

const blogPosts = [
  {
    id: 1,
    title: "The Perfect Crispy Burger: Our Secret Recipe Revealed",
    excerpt: "Discover what makes our burgers so special and why customers keep coming back for more.",
    image: "/lava_gold_burger.png",
    date: "2025-01-15",
    category: "Food Stories",
    slug: "perfect-crispy-burger-secret-recipe"
  },
  {
    id: 2,
    title: "New Menu Items: Introducing Our Signature Wraps",
    excerpt: "We're excited to announce our new line of signature wraps, crafted with the finest ingredients.",
    image: "/lava_power_wrap.png",
    date: "2025-01-10",
    category: "Menu Updates",
    slug: "new-signature-wraps-menu"
  },
  {
    id: 3,
    title: "Why LAVA LUBLIN is the Best Fast Food in Lublin",
    excerpt: "From our commitment to quality ingredients to our unique cooking methods, here's what sets us apart.",
    image: "/lava_outside_view.png",
    date: "2025-01-05",
    category: "Restaurant",
    slug: "best-fast-food-lublin"
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-orange-500 py-16">
        <div className="container mx-auto px-4">
          <nav className="mb-8">
            <Link href="/" className="text-white hover:text-orange-200 transition-colors">
              ← Back to Home
            </Link>
          </nav>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Blog & News</h1>
          <p className="text-xl text-orange-100 max-w-2xl">
            Stay updated with the latest news, food stories, and special offers from LAVA LUBLIN
          </p>
        </div>
      </header>

      {/* Blog Posts */}
      <main className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-orange-500 text-sm font-semibold">{post.category}</span>
                  <time className="text-gray-400 text-sm">{new Date(post.date).toLocaleDateString()}</time>
                </div>
                <h2 className="text-xl font-bold mb-3 hover:text-orange-500 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-orange-500 hover:text-orange-400 transition-colors"
                >
                  Read More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-orange-100 mb-6 max-w-md mx-auto">
            Subscribe to our newsletter for exclusive offers, new menu items, and behind-the-scenes content.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-8 mb-4 md:mb-0">
              <Link href="/" className="text-white hover:text-orange-500 transition-colors">
                Home
              </Link>
              <Link href="/order" className="text-white hover:text-orange-500 transition-colors">
                Order Online
              </Link>
              <Link href="/blog" className="text-orange-500 font-semibold">
                Blog
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 LAVA LUBLIN. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 