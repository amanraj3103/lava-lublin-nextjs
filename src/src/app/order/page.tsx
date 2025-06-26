"use client";

import React, { useState, useRef } from 'react';
import { CartProvider, useCart } from '../../../src/context/CartContext';
import { useMenuData } from '../../../src/hooks/useMenuData';
import Header from '../../../src/components/Order/Header';
import MenuGrid from '../../../src/components/Order/MenuGrid';
import CartDrawer from '../../../src/components/Order/CartDrawer';
import TrendingCarousel from '../../../src/components/Order/TrendingCarousel';
import CategoryNav from '../../../src/components/Order/CategoryNav';
import Recommendations from '../../../src/components/Order/Recommendations';

export default function OrderPage() {
  const { data, loading, error } = useMenuData();
  const [activeCategory, setActiveCategory] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const cart = useCart();

  // Scroll to category section
  const handleSelectCategory = (id: string) => {
    setActiveCategory(id);
    const ref = sectionRefs.current[id];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-xl">Loading menu...</div>
    );
  }
  if (error || !data) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">Failed to load menu.</div>;
  }

  // Gather trending/bestSeller items from all categories
  const trendingItems = data.categories
    .flatMap((cat: any) => cat.items)
    .filter((item: any) => item.bestSeller || item.trending);

  // Gather recommended items (e.g., drinks, sauces)
  const recommendedItems = data.categories
    .flatMap((cat: any) => cat.items)
    .filter((item: any) => item.tags && (item.tags.includes('drink') || item.tags.includes('sauce')))
    .slice(0, 8);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col lg:flex-row pt-20 max-w-7xl mx-auto w-full">
          {/* Sidebar/CategoryNav */}
          <aside className="hidden lg:block w-56 pr-4 sticky top-20 h-[calc(100vh-5rem)]">
            <CategoryNav
              categories={data.categories.map((cat: any) => ({ id: cat.id, name: cat.name }))}
              activeId={activeCategory}
              onSelect={handleSelectCategory}
            />
          </aside>
          <section className="flex-1 flex flex-col gap-12">
            {/* Mobile CategoryNav */}
            <div className="lg:hidden mt-2 mb-4">
              <CategoryNav
                categories={data.categories.map((cat: any) => ({ id: cat.id, name: cat.name }))}
                activeId={activeCategory}
                onSelect={handleSelectCategory}
              />
            </div>
            {/* Trending Carousel */}
            {trendingItems.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Trending & Best Sellers</h2>
                <TrendingCarousel items={trendingItems} />
              </div>
            )}
            {/* Recommendations Section */}
            {recommendedItems.length > 0 && (
              <Recommendations items={recommendedItems} />
            )}
            {/* Menu Categories */}
            {data.categories.map((cat: any) => (
              <div key={cat.id} ref={el => (sectionRefs.current[cat.id] = el)} id={cat.id} className="scroll-mt-24">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{cat.name}</h2>
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
          {/* Cart Drawer (desktop) */}
          <div className="hidden xl:block">
            <CartDrawer open={true} onClose={() => {}} desktop />
          </div>
        </main>
        {/* Floating Cart Button (mobile) */}
        <button
          className="fixed bottom-6 right-6 z-50 xl:hidden bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-lg px-6 py-4 flex items-center gap-2 text-lg"
          onClick={() => setCartOpen(true)}
        >
          <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h8.04a2 2 0 001.83-1.3L17 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" /></svg>
          Cart
          {cart.items.length > 0 && (
            <span className="ml-2 bg-white text-green-700 rounded-full px-2 py-0.5 text-sm font-bold">{cart.items.reduce((sum, i) => sum + i.quantity, 0)}</span>
          )}
        </button>
        {/* Cart Drawer (mobile) */}
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </CartProvider>
  );
} 