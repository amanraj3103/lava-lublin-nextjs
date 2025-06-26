'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import './home.css';
import SplitText from '../components/SplitText';
import { HeroStaggerFadeIn, heroChildVariants } from '../components/FadeIn';
import TiltedCard from '../components/TiltedCard';
import { motion } from 'framer-motion';

// Client-side only wrapper to prevent hydration mismatches
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-black text-white font-['Montserrat',sans-serif] min-h-screen page-wrapper">
        <div className="fixed top-0 left-0 right-0 w-full z-50 bg-black bg-opacity-80 nav-main">
          <div className="flex justify-between items-center mx-4">
            <div className="nav-logo-container">
              <h1 className="nav-logo">LAVA LUBLIN</h1>
            </div>
            <div className="hidden lg:flex items-center space-x-8">
              <div className="relative group">
                <button className="bg-transparent border-none flex items-center gap-2 text-white hover:text-orange-400 p-3">
                  <span className="text-2xl">🌐</span>
                  <span className="hidden sm:inline text-2xl">EN</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-40 pb-16 bg-gradient-to-b from-black via-orange-900 to-black relative overflow-hidden">
          <div className="flex flex-col items-center text-center relative z-10 px-4 sm:px-6 lg:px-8">
            <HeroStaggerFadeIn className="flex flex-col items-center text-center relative z-10 px-4 sm:px-6 lg:px-8">
              <motion.div variants={heroChildVariants}>
                <div className="hero-image">
                  <Image 
                    src="/lava_icon.png" 
                    alt="Crispy Food" 
                    width={500} 
                    height={500} 
                    className="rounded-2xl shadow-2xl w-96 h-96 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] object-contain" 
                    priority 
                  />
                </div>
              </motion.div>
              <motion.h1 className="hero-heading" variants={heroChildVariants}>
                Where Crispiness Meets Happiness
              </motion.h1>
              <motion.p className="text-lg md:text-xl text-gray-200 mb-4 max-w-2xl font-bold" variants={heroChildVariants}>
                Lublin's boldest street food. Urban energy. Indulgent flavors.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4" variants={heroChildVariants}>
                <a href="#menu" className="bg-orange-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">
                  See Menu
                </a>
                <Link href="/order" className="bg-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105">
                  Order Now
                </Link>
                <a href="#location" className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105">
                  Visit Us
                </a>
              </motion.div>
            </HeroStaggerFadeIn>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Navigation Component
function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-black bg-opacity-80 nav-main">
      <div className="flex justify-between items-center mx-4">
        {/* Logo */}
        <div className="nav-logo-container">
          <h1 className="nav-logo">
            LAVA LUBLIN
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <LanguageSwitcher />
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
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
        <div className="lg:hidden mt-4 pt-4 border-t border-white px-4">
          {navItems.map((item) => (
        <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
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
    // Additional items to complete 5×3 grid (15 total items)
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
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' },
      });
      
      if (response.ok) {
        setFormFeedback("Thank you! We'll get back to you soon.");
        setFeedbackColor('text-green-400');
        form.reset();
      } else {
        setFormFeedback('Oops! Something went wrong. Please try again.');
        setFeedbackColor('text-red-400');
      }
    } catch {
      setFormFeedback('Error: Unable to send your message.');
      setFeedbackColor('text-red-400');
    }
    
    setTimeout(() => setFormFeedback(''), 3500);
  };

  return (
    <ClientOnly>
      <div className="bg-black text-white font-['Montserrat',sans-serif] min-h-screen page-wrapper">
        <Navigation />

      {/* Hero Section */}
        <section className="pt-40 pb-16 bg-gradient-to-b from-black via-orange-900 to-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-red-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-yellow-500 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>
          <div className="flex flex-col items-center text-center relative z-10 px-4 sm:px-6 lg:px-8">
            <HeroStaggerFadeIn className="flex flex-col items-center text-center relative z-10 px-4 sm:px-6 lg:px-8">
              <motion.div variants={heroChildVariants}>
                <div className="hero-image">
                  <Image 
                    src="/lava_icon.png" 
                    alt="Crispy Food" 
                    width={500} 
                    height={500} 
                    className="rounded-2xl shadow-2xl w-96 h-96 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] object-contain" 
                    priority 
                  />
                </div>
              </motion.div>
              <motion.h1 className="hero-heading" variants={heroChildVariants}>
                Where Crispiness Meets Happiness
              </motion.h1>
              <motion.p className="text-lg md:text-xl text-gray-200 mb-4 max-w-2xl font-bold" variants={heroChildVariants}>
                Lublin's boldest street food. Urban energy. Indulgent flavors.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4" variants={heroChildVariants}>
                <a href="#menu" className="bg-orange-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">
                  See Menu
                </a>
                <Link href="/order" className="bg-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105">
                  Order Now
                </Link>
                <a href="#location" className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105">
                  Visit Us
                </a>
              </motion.div>
            </HeroStaggerFadeIn>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 bg-black">
          <div className="px-4 sm:px-6 lg:px-8">
            <h2 className="font-bold text-center text-orange-400 mb-12 menu-title">
              {t('menu.title')}
            </h2>
            <div className="max-w-6xl mx-auto">
              <div className="menu-container scrollbar-hide">
                {translatedMenuItems.map((item, index) => (
                  <Link href="/order" key={index} >
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
                  </Link>
                ))}
          </div>
          </div>
        </div>
      </section>

        {/* About Section */}
        <section id="about" className="py-24 about-section">
          <div className="text-center px-4 sm:px-6 lg:px-8 about-container">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 about-heading">
              About LAVA LUBLIN
            </h2>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed about-description">
              Born in the heart of Lublin, LAVA brings the crunch, fire, and urban energy to every bite. 
              Our signature dishes fuse bold flavors with high-impact visuals—perfect for foodies and trendsetters. 
              Experience indulgence, street vibes, and a taste you'll never forget.
            </p>
            <div className="about-visual-design">
              <div className="about-line-left"></div>
              <div className="about-dot"></div>
              <div className="about-line-right"></div>
            </div>
        </div>
      </section>

        {/* Instagram Section */}
        <section className="py-16 bg-black">
          <div className="text-center px-2 sm:px-4 lg:px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 instagram-heading">
              See What's Hot on Instagram
            </h2>
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6 lg:p-8 mb-2">
            <div className="elfsight-app-8284f645-8cdd-40d8-83b4-83d140da9323" data-elfsight-app-lazy></div>
          </div>
            <a 
              href="https://www.instagram.com/lava_lublin" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-400 underline hover:text-orange-600 text-lg instagram-link"
            >
              Follow us @lavalublin
          </a>
        </div>
      </section>

        {/* Location Section */}
        <section id="location" className="py-12 bg-black location-section">
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
            ></iframe>
          </div>
            </div>
            <a 
              href="https://maps.app.goo.gl/WWooUG3wJwMRomKx6" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 inline-block directions-button"
            >
              Get Directions
            </a>
        </div>
      </section>

        {/* Contact Section */}
        <section id="contact" className="bg-gradient-to-l from-black via-red-900 to-black contact-section">
          <div className="text-center px-4 sm:px-6 lg:px-8 contact-container">
            <h2 className="text-4xl md:text-5xl font-bold text-orange-400 mb-8 contact-heading">
              Contact Us
            </h2>
            <form
              action="https://formspree.io/f/xblydwjk"
              method="POST"
              className="space-y-6 mb-8 max-w-md mx-auto contact-form"
              onSubmit={handleContactSubmit}
            >
              <input 
                type="text" 
                name="name" 
                placeholder="Name" 
                required 
                className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-orange-500 focus:outline-none transition-colors duration-200 contact-form-input" 
              />
              <input 
                type="tel" 
                name="phone" 
                placeholder="Phone" 
                className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-orange-500 focus:outline-none transition-colors duration-200 contact-form-input" 
              />
              <textarea 
                name="message" 
                placeholder="Message" 
                required 
                rows={4}
                className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-orange-500 focus:outline-none transition-colors duration-200 resize-none contact-form-textarea" 
              ></textarea>
              <input 
                type="email" 
                name="_replyto" 
                placeholder="Your Email" 
                required 
                className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-orange-500 focus:outline-none transition-colors duration-200 contact-form-input" 
              />
              <button 
                type="submit" 
                className="w-full bg-orange-500 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 contact-form-button"
              >
                Send
              </button>
              {formFeedback && (
                <div className={`${feedbackColor} font-semibold text-center`}>
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

        {/* Footer */}
        <footer className="bg-black py-8 text-center text-gray-500 footer">
          <p className="footer-text">&copy; 2025 LAVA LUBLIN. All rights reserved.</p>
        </footer>
    </div>
    </ClientOnly>
  );
} 
