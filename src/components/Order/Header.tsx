'use client';
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import styles from '../../app/order/page.module.css';
import LanguageSwitcher from '../LanguageSwitcher';

export const CartIconRefContext = React.createContext<React.RefObject<HTMLButtonElement | null> | null>(null);

interface HeaderProps {
  setCartOpen: (open: boolean) => void;
  cartIconRef: React.RefObject<HTMLButtonElement | null>;
}

export default function Header({ setCartOpen, cartIconRef }: HeaderProps) {
  const [search, setSearch] = useState('');
  const { items } = useCart();
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <button className={styles.brandButton} onClick={handleHomeClick}>
          <span className={styles.brandName}>LAVA LUBLIN</span>
        </button>
        <div className={styles.headerActions}>
          <LanguageSwitcher />
          <input
            className={styles.searchInput}
            placeholder="Search for dishes or drinks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            className={styles.cartButton}
            onClick={() => setCartOpen(true)}
            ref={cartIconRef}
            aria-label="Open cart"
          >
            <svg className={styles.cartIcon} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h8.04a2 2 0 001.83-1.3L17 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" />
            </svg>
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
} 