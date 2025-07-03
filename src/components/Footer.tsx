import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const footerLinks = [
  {
    title: 'Menu',
    links: [
      { name: 'Order Online', href: '/order' },
      { name: 'Our Menu', href: '#menu' },
      { name: 'Special Offers', href: '#offers' },
      { name: 'Catering', href: '#catering' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Story', href: '#story' },
      { name: 'Contact', href: '#contact' },
      { name: 'Careers', href: '#careers' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Help Center', href: '#help' },
      { name: 'FAQs', href: '#faqs' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brandSection}>
            <Link href="/" className={styles.logoLink} aria-label="Go to homepage">
              <span className={styles.logoTitle}>LAVA LUBLIN</span>
            </Link>
            <p className={styles.description}>
              Experience the perfect blend of crispy textures and bold flavors. We serve the finest burgers, wraps, and comfort food in Lublin, Poland. Made fresh, served hot, always delicious.
            </p>
          </div>
          <nav className={styles.linksSection} aria-label="Footer navigation">
            {footerLinks.map((section) => (
              <div key={section.title} className={styles.linkColumn}>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
                <ul className={styles.linkList}>
                  {section.links.map((link) => (
                    <li key={link.name} className={styles.linkItem}>
                      <Link href={link.href} className={styles.link}>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className={styles.bottom}>
          <span className={styles.copyright}>
            © {new Date().getFullYear()} Lavalublin.pl. All rights reserved.
          </span>
          <nav className={styles.legalSection} aria-label="Legal links">
            {legalLinks.map((link) => (
              <Link key={link.name} href={link.href} className={styles.legalLink}>
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
} 