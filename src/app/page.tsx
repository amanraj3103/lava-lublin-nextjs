'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import GoogleReviews from '../components/GoogleReviews';
import './home.css';
import Footer from '../components/Footer';

// Dynamic imports for code splitting
const TiltedCard = React.lazy(() => import('../components/TiltedCard'));

// Keep static imports for components that are immediately needed
import { HeroStaggerFadeIn, heroChildVariants } from '../components/FadeIn';
import { motion } from 'framer-motion';

// Client-side only wrapper to prevent hydration mismatches
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}

// Navigation Component
function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'menu', label: t('nav.menu') },
    { id: 'about', label: t('nav.about') },
    { id: 'location', label: t('nav.visit') },
    { id: 'contact', label: t('nav.contact') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-black bg-opacity-80 nav-main" role="navigation" aria-label="Main navigation">
      <div className="flex justify-between items-center mx-4">
        {/* Logo */}
        <div className="nav-logo-container" role="banner">
          <h1 className="nav-logo" id="site-title">
            LAVA LUBLIN
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8" role="menubar">
          <LanguageSwitcher />
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              role="menuitem"
              aria-label={`Navigate to ${item.label} section`}
              className="bg-transparent border-none hover:text-yellow-300 transition-colors cursor-pointer nav-button"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
          <LanguageSwitcher />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="text-white p-2 rounded"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center gap-1">
              <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-white px-4" id="mobile-menu" role="menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              role="menuitem"
              aria-label={`Navigate to ${item.label} section`}
              className="bg-transparent border-none block w-full text-left hover:text-yellow-300 py-2 cursor-pointer nav-button"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

export default function Home() {
  const [formFeedback, setFormFeedback] = useState('');
  const [feedbackColor, setFeedbackColor] = useState('text-green-400');
  const { t } = useTranslation();

  // Create menu items with translations
  const translatedMenuItems = [
    {
      img: '/Burger.png',
      title: t('menu.lavaBurger'),
      desc: t('menu.lavaBurgerDesc'),
    },
    {
      img: '/lava_gold_burger.png',
      title: t('menu.lavaGoldBurger'),
      desc: t('menu.lavaGoldBurgerDesc'),
    },
    {
      img: '/golden_wings.png',
      title: t('menu.goldenWings'),
      desc: t('menu.goldenWingsDesc'),
    },
    {
      img: '/lava_power_wrap.png',
      title: t('menu.lavaPowerWrap'),
      desc: t('menu.lavaPowerWrapDesc'),
    },
    {
      img: '/Burger.png',
      title: t('menu.lavaBurger'),
      desc: t('menu.lavaBurgerDesc'),
    },
    {
      img: '/lava_gold_burger.png',
      title: t('menu.lavaGoldBurger'),
      desc: t('menu.lavaGoldBurgerDesc'),
    },
    {
      img: '/golden_wings.png',
      title: t('menu.goldenWings'),
      desc: t('menu.goldenWingsDesc'),
    },
    {
      img: '/lava_power_wrap.png',
      title: t('menu.lavaPowerWrap'),
      desc: t('menu.lavaPowerWrapDesc'),
    },
    {
      img: '/Burger.png',
      title: t('menu.lavaBurger'),
      desc: t('menu.lavaBurgerDesc'),
    },
    {
      img: '/lava_gold_burger.png',
      title: t('menu.lavaGoldBurger'),
      desc: t('menu.lavaGoldBurgerDesc'),
    },
    {
      img: '/golden_wings.png',
      title: t('menu.goldenWings'),
      desc: t('menu.goldenWingsDesc'),
    },
    {
      img: '/lava_power_wrap.png',
      title: t('menu.lavaPowerWrap'),
      desc: t('menu.lavaPowerWrapDesc'),
    },
    {
      img: '/Burger.png',
      title: t('menu.lavaBurger'),
      desc: t('menu.lavaBurgerDesc'),
    },
    {
      img: '/lava_gold_burger.png',
      title: t('menu.lavaGoldBurger'),
      desc: t('menu.lavaGoldBurgerDesc'),
    },
    {
      img: '/golden_wings.png',
      title: t('menu.goldenWings'),
      desc: t('menu.goldenWingsDesc'),
    },
  ];

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('_replyto') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    try {
      const response = await fetch('https://formspree.io/f/xblydwjk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (response.ok) {
        setFormFeedback('Thank you for your message! We\'ll get back to you soon.');
        setFeedbackColor('text-green-400');
        e.currentTarget.reset();
      } else {
        setFormFeedback('Sorry, there was an error sending your message. Please try again.');
        setFeedbackColor('text-red-400');
      }
    } catch {
      setFormFeedback('Sorry, there was an error sending your message. Please try again.');
      setFeedbackColor('text-red-400');
    }
  };

  return (
    <ClientOnly>
      <div className="bg-black text-white font-['Montserrat',sans-serif] min-h-screen page-wrapper">
        <Navigation />
        
        <main id="main-content" role="main" aria-labelledby="site-title">
          {/* Hero Section */}
          <section className="pt-40 pb-16 bg-gradient-to-b from-black via-orange-900 to-black relative overflow-hidden">
            <div className="flex flex-col items-center text-center relative z-10 px-4 sm:px-6 lg:px-8">
              <HeroStaggerFadeIn className="flex flex-col items-center text-center relative z-10 px-4 sm:px-6 lg:px-8">
                <motion.div variants={heroChildVariants}>
                  <div className="hero-image">
                    <Image 
                      src="/lava_icon.png" 
                      alt="LAVA LUBLIN restaurant logo featuring crispy food" 
                      width={500} 
                      height={500} 
                      className="rounded-2xl shadow-2xl w-96 h-96 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] object-contain" 
                      priority 
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAn8B9n6l9wAAAABJRU5ErkJggg=="
                    />
                  </div>
                </motion.div>
                <motion.h1 className="hero-heading" variants={heroChildVariants}>
                  Where Crispiness Meets Happiness
                </motion.h1>
                <motion.p className="text-lg md:text-xl text-gray-200 mb-4 max-w-2xl font-bold" variants={heroChildVariants}>
                  Lublin&apos;s boldest street food. Urban energy. Indulgent flavors.
                </motion.p>
                <motion.div className="flex flex-col sm:flex-row gap-4" variants={heroChildVariants}>
                  <Link 
                    href="#menu" 
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105"
                    aria-label="View our menu offerings"
                  >
                    View Menu
                  </Link>
                  <Link 
                    href="/order" 
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105"
                    aria-label="Order food online from LAVA LUBLIN"
                  >
                    Order Now
                  </Link>
                  <Link 
                    href="#location" 
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105"
                    aria-label="Find our restaurant location"
                  >
                    Find Us
                  </Link>
                </motion.div>
              </HeroStaggerFadeIn>
            </div>
          </section>

          {/* Menu Section */}
          <section id="menu" className="py-16 bg-black" aria-labelledby="menu-title">
            <div className="px-4 sm:px-6 lg:px-8">
              <h2 id="menu-title" className="font-bold text-center text-orange-400 mb-12 menu-title">
                {t('menu.title')}
              </h2>
              <div className="max-w-6xl mx-auto">
                <div className="menu-container scrollbar-hide">
                  {translatedMenuItems.map((item, index) => (
                    <Link href="/order" key={index} >
                      <Suspense fallback={<div className="w-[200px] h-[200px] bg-gray-800 rounded-lg animate-pulse"></div>}>
                        <TiltedCard
                          imageSrc={item.img}
                          altText={item.title}
                          captionText={item.title}
                          containerHeight="200px"
                          containerWidth="200px"
                          imageHeight="200px"
                          imageWidth="200px"
                          rotateAmplitude={12}
                          scaleOnHover={1.1}
                          showMobileWarning={false}
                          showTooltip={true}
                          displayOverlayContent={false}
                          overlayContent={
                            <p className="tilted-card-demo-text">
                              {item.title}
                            </p>
                          }
                        />
                      </Suspense>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-24 about-section" aria-labelledby="about-title">
            <div className="text-center px-4 sm:px-6 lg:px-8 about-container">
              <h2 id="about-title" className="text-4xl md:text-5xl font-bold mb-8 about-heading">
                About LAVA LUBLIN
              </h2>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed about-description">
                Born in the heart of Lublin, LAVA brings the crunch, fire, and urban energy to every bite. 
                Our signature dishes fuse bold flavors with high-impact visuals—perfect for foodies and trendsetters. 
                Experience indulgence, street vibes, and a taste you&apos;ll never forget.
              </p>
              <div className="about-visual-design">
                <div className="about-line-left"></div>
                <div className="about-dot"></div>
                <div className="about-line-right"></div>
              </div>
            </div>
          </section>

          {/* Google Reviews Section */}
          <section className="py-24 bg-gradient-to-r from-gray-900 to-black" aria-labelledby="testimonials-title">
            <div className="container mx-auto px-4">
              <h2 id="testimonials-title" className="text-4xl md:text-5xl font-bold text-center mb-16 text-orange-500">
                What Our Customers Say
              </h2>
              <GoogleReviews 
                placeId="ChIJN1t_tDeuEmsRUsoyG83frY4"
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || ''}
                maxReviews={6}
              />
            </div>
          </section>

          {/* Instagram Section */}
          <section className="py-16 bg-black" aria-labelledby="instagram-title">
            <div className="text-center px-2 sm:px-4 lg:px-6">
              <h2 id="instagram-title" className="text-3xl md:text-4xl font-bold mb-8 instagram-heading">
                See What&apos;s Hot on Instagram
              </h2>
              <div className="bg-gray-800 rounded-lg p-4 sm:p-6 lg:p-8 mb-2">
                <div className="elfsight-app-8284f645-8cdd-40d8-83b4-83d140da9323" data-elfsight-app-lazy></div>
              </div>
              <a 
                href="https://www.instagram.com/lava_lublin" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-400 underline hover:text-orange-600 text-lg instagram-link"
                aria-label="Follow LAVA LUBLIN on Instagram (opens in new tab)"
              >
                Follow us @lavalublin
              </a>
            </div>
          </section>

          {/* Location Section */}
          <section id="location" className="py-12 bg-black location-section" aria-labelledby="location-heading">
            <div className="text-center px-4 sm:px-6 lg:px-8">
              <h2 id="location-heading" className="text-4xl md:text-5xl font-bold location-heading">
                Find Us
              </h2>
              <div className="mb-2">
                <p className="text-xl text-gray-300 mb-0 location-address">
                  ul.Nadbystrzycka 45/A, 20-618 Lublin, Poland
                </p>
                <div className="opening-hours-container">
                  <p className="opening-hours-title">
                    <span>Opening Hours:</span>
                  </p>
                  <p className="opening-hours-text">Sunday–Wednesday: 10:00–23:00</p>
                  <p className="opening-hours-text">Thursday–Saturday: 11:00–02:00</p>
                </div>
              </div>
              <div className="mb-4 flex justify-center location-map-container">
                <div className="location-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2498.0722436702226!2d22.54430577678669!3d51.23616437175291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472257fcbded0caf%3A0xd637f35efbd83c0b!2sLAVA!5e0!3m2!1sen!2spl!4v1749202931476!5m2!1sen!2spl"
                    width="100%"
                    height="100%"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="LAVA LUBLIN Location"
                    aria-label="Interactive map showing LAVA LUBLIN restaurant location"
                  ></iframe>
                </div>
              </div>
              <a 
                href="https://maps.app.goo.gl/WWooUG3wJwMRomKx6" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 inline-block directions-button"
                aria-label="Get directions to LAVA LUBLIN (opens in new tab)"
              >
                Get Directions
              </a>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="bg-gradient-to-l from-black via-red-900 to-black contact-section" aria-labelledby="contact-heading">
            <div className="text-center px-4 sm:px-6 lg:px-8 contact-container">
              <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold text-orange-400 mb-8 contact-heading">
                Contact Us
              </h2>
              <form
                action="https://formspree.io/f/xblydwjk"
                method="POST"
                className="space-y-6 mb-8 max-w-md mx-auto contact-form"
                onSubmit={handleContactSubmit}
                aria-labelledby="contact-heading"
              >
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Name" 
                  required 
                  className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-orange-500 focus:outline-none transition-colors duration-200 contact-form-input" 
                  aria-label="Your name"
                />
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="Phone" 
                  className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-orange-500 focus:outline-none transition-colors duration-200 contact-form-input" 
                  aria-label="Your phone number"
                />
                <textarea 
                  name="message" 
                  placeholder="Message" 
                  required 
                  rows={4}
                  className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-orange-500 focus:outline-none transition-colors duration-200 resize-none contact-form-textarea" 
                  aria-label="Your message"
                ></textarea>
                <input 
                  type="email" 
                  name="_replyto" 
                  placeholder="Your Email" 
                  required 
                  className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-orange-500 focus:outline-none transition-colors duration-200 contact-form-input" 
                  aria-label="Your email address"
                />
                <button 
                  type="submit" 
                  className="w-full bg-orange-500 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 contact-form-button"
                  aria-label="Send contact message"
                >
                  Send
                </button>
                {formFeedback && (
                  <div className={`${feedbackColor} font-semibold text-center`} role="status" aria-live="polite">
                    {formFeedback}
                  </div>
                )}
              </form>
              <div className="space-y-4">
                <p className="text-gray-300">
                  📞 <a href="tel:+48729397306" className="underline hover:text-orange-400 contact-link">
                    +48 729 397 306
                  </a>
                </p>
                <p className="text-gray-300">
                  ✉️ <a href="mailto:info@lavalublin.pl" className="underline hover:text-orange-400 contact-link">
                    info@lavalublin.pl
                  </a>
                </p>
                <div className="flex justify-center">
                  <a 
                    href="https://www.instagram.com/lava_lublin" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform duration-200"
                    aria-label="Follow us on Instagram (opens in new tab)"
                  >
                    <Image 
                      src="/instagram_icon.png" 
                      width={32} 
                      height={32} 
                      alt="Instagram" 
                      className="w-8 h-8" 
                    />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ClientOnly>
  );
} 