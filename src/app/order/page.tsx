"use client";

import React, { useState, useRef } from 'react';
import { CartProvider, useCart } from '../../context/CartContext';
import { useMenuData, MenuData } from '../../hooks/useMenuData';
import Header, { CartIconRefContext } from '../../components/Order/Header';
import MenuGrid from '../../components/Order/MenuGrid';
import CartDrawer from '../../components/Order/CartDrawer';
import TrendingCarousel from '../../components/Order/TrendingCarousel';
import CategoryNav from '../../components/Order/CategoryNav';
import styles from './page.module.css';
import OrderLoading from '../../components/Order/OrderLoading';

export default function OrderPage() {
  const { data, loading, error } = useMenuData();
  const [activeCategory, setActiveCategory] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const cartIconRef = useRef<HTMLButtonElement>(null);

  if (loading) {
    return <OrderLoading />;
  }
  if (error || !data) {
    return <div className={styles.orderMain} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#ef4444', fontSize: '1.25rem' }}>Failed to load menu.</div>;
  }

  return (
    <CartProvider>
      <CartIconRefContext.Provider value={cartIconRef}>
        <OrderPageContent
          data={data}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          sectionRefs={sectionRefs}
          cartIconRef={cartIconRef}
        />
      </CartIconRefContext.Provider>
    </CartProvider>
  );
}

function OrderPageContent({ data, activeCategory, setActiveCategory, cartOpen, setCartOpen, sectionRefs, cartIconRef }: {
  data: MenuData;
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sectionRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  cartIconRef: React.RefObject<HTMLButtonElement>;
}) {
  const cart = useCart();

  // Scroll to category section
  const handleSelectCategory = (id: string) => {
    setActiveCategory(id);
    if (id === 'trending') {
      const trendingSection = document.getElementById('trending-section');
      if (trendingSection) {
        trendingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    const ref = sectionRefs.current[id];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };


  // Gather trending/bestSeller items from all categories, EXCLUDING recommended items
  const trendingItems = data.categories
    .flatMap((cat) => cat.items)
    .filter((item) => (item.bestSeller || item.trending) && !(item.tags && (item.tags.includes('drink') || item.tags.includes('sauce'))));

  // Filter out recommended items from each menu category
  const filteredCategories = data.categories.map((cat) => ({
    ...cat,
    items: cat.items.filter(item => !(item.tags && (item.tags.includes('drink') || item.tags.includes('sauce'))))
  }));

  return (
    <div className={styles.orderMain}>
      <Header setCartOpen={setCartOpen} cartIconRef={cartIconRef} />
      <main className={styles.mainContent}>
        {/* Sidebar/CategoryNav */}
        <aside className={styles.sidebar}>
          <CategoryNav
            categories={data.categories.map((cat) => ({ id: cat.id, name: cat.name }))}
            activeId={activeCategory}
            onSelect={handleSelectCategory}
          />
        </aside>
        <section style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3rem', minWidth: 0 }}>
          {/* Mobile CategoryNav */}
          <div style={{ display: 'none' }} className="mobileCategoryNav">
            {/* You can add a mobile nav here if needed */}
          </div>
          {/* Trending Carousel */}
          {trendingItems.length > 0 && (
            <div className={styles.section} id="trending-section">
              <h2 className={styles.sectionTitle}>Trending & Best Sellers</h2>
              <TrendingCarousel items={trendingItems} />
        </div>
          )}
          {/* Menu Categories */}
          {filteredCategories.map((cat) => (
            <div key={cat.id} ref={(el) => { sectionRefs.current[cat.id] = el; }} id={cat.id} className={styles.section}>
              <h2 className={styles.sectionTitle}>{cat.name}</h2>
              <MenuGrid
                items={cat.items}
                cartItems={cart.items}
                onAdd={item => cart.addItem({ ...item, quantity: 1 })}
                onRemove={cart.removeItem}
                onUpdateQuantity={cart.updateQuantity}
              />
            </div>
          ))}
        </section>
      </main>
      {/* Cart Modal Popup */}
      {cartOpen && (
        <div className={styles.cartModalOverlay} onClick={() => setCartOpen(false)}>
          <div className={styles.cartModal} onClick={e => e.stopPropagation()}>
            <CartDrawer open={true} onClose={() => setCartOpen(false)} />
            </div>
          </div>
        )}
    </div>
  );
} # Updated order page
