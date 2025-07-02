"use client";

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { CartProvider, useCart } from '../../context/CartContext';
import { useMenuData, MenuData, MenuItem } from '../../hooks/useMenuData';
import Header, { CartIconRefContext } from '../../components/Order/Header';
import MenuGrid from '../../components/Order/MenuGrid';
import TrendingCarousel from '../../components/Order/TrendingCarousel';
import CategoryNav from '../../components/Order/CategoryNav';
import styles from './page.module.css';
// Dynamic imports for code splitting
const CartDrawer = React.lazy(() => import('../../components/Order/CartDrawer'));
const OrderLoading = React.lazy(() => import('../../components/Order/OrderLoading'));
const RecommendationsPanel = React.lazy(() => import('../../components/Order/RecommendationsPanel'));

// Loading fallback component
const LoadingFallback = () => (
  <div className={styles.orderMain} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#f97316', fontSize: '1.25rem' }}>
    Loading...
  </div>
);

export default function OrderPage() {
  const { data, loading, error } = useMenuData();
  const [activeCategory, setActiveCategory] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const cartIconRef = useRef<HTMLButtonElement>(null);

  if (loading) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <OrderLoading />
      </Suspense>
    );
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
          checkoutOpen={checkoutOpen}
          setCheckoutOpen={setCheckoutOpen}
          sectionRefs={sectionRefs}
          cartIconRef={cartIconRef}
        />
      </CartIconRefContext.Provider>
    </CartProvider>
  );
}

function OrderPageContent({ data, activeCategory, setActiveCategory, cartOpen, setCartOpen, checkoutOpen, setCheckoutOpen, sectionRefs, cartIconRef }: {
  data: MenuData;
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  checkoutOpen: boolean;
  setCheckoutOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sectionRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  cartIconRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const cart = useCart();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Scroll to category section
  const handleSelectCategory = (id: string) => {
    setActiveCategory(id);
    setMobileNavOpen(false); // Close mobile nav when category is selected
    
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

  // Handle checkout button click
  const handleCheckout = () => {
    setCartOpen(false); // Close cart
    setCheckoutOpen(true); // Open interactive checkout
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

  // Get recommended items (drinks and sauces)
  const recommendedItems = data.categories
    .flatMap((cat) => cat.items)
    .filter((item) => item.tags && (item.tags.includes('drink') || item.tags.includes('sauce')));

  // Convert menu items to interactive checkout format
  const interactiveCheckoutProducts = recommendedItems.map(item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    category: item.category || 'Recommended',
    image: item.image,
    color: item.tags?.includes('drink') ? 'Beverage' : 'Sauce'
  }));

  // Mobile Category Dropdown Component
  const MobileCategoryDropdown = () => (
    <div className={styles.mobileCategoryNav}>
      <button 
        className={styles.mobileCategoryButton}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
        aria-label="Toggle category menu"
      >
        <span>{activeCategory ? data.categories.find(cat => cat.id === activeCategory)?.name || 'Categories' : 'Categories'}</span>
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ transform: mobileNavOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </button>
      {mobileNavOpen && (
        <div className={styles.mobileCategoryDropdown}>
          {data.categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.mobileCategoryItem} ${activeCategory === cat.id ? styles.mobileCategoryItemActive : ''}`}
              onClick={() => handleSelectCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  // Generate structured data for menu items
  const generateMenuStructuredData = () => {
    const menuItems = data.categories.flatMap(cat => cat.items);
    type NutritionMenuItem = MenuItem & { nutrition: { calories: string, protein: string, fat: string, carbs: string } };
    const hasNutrition = (item: MenuItem): item is NutritionMenuItem =>
      typeof (item as NutritionMenuItem).nutrition === 'object' && (item as NutritionMenuItem).nutrition !== null;
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "LAVA LUBLIN Menu",
      "description": "Complete menu of burgers, wraps, and street food at LAVA LUBLIN",
      "url": "https://lavalublin.pl/order",
      "numberOfItems": menuItems.length,
      "itemListElement": menuItems.map((item, index) => {
        return {
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "MenuItem",
            "name": item.name,
            "description": item.description || `${item.name} from LAVA LUBLIN`,
            "offers": {
              "@type": "Offer",
              "price": item.price,
              "priceCurrency": "PLN",
              "availability": "https://schema.org/InStock"
            },
            "image": `https://lavalublin.pl${item.image}`,
            "category": item.category || "Food",
            ...(hasNutrition(item) ? {
              "nutrition": {
                "@type": "NutritionInformation",
                "calories": item.nutrition.calories,
                "proteinContent": item.nutrition.protein,
                "fatContent": item.nutrition.fat,
                "carbohydrateContent": item.nutrition.carbs
              }
            } : {})
          }
        }
      })
    };
  };

  return (
    <div className={styles.orderMain}>
      {/* Structured Data for Menu Items */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateMenuStructuredData())
        }}
      />
      
      <Header setCartOpen={setCartOpen} cartIconRef={cartIconRef} />
      
      {/* Mobile Category Dropdown - sticky below header, only show on mobile */}
      {isMobile && <MobileCategoryDropdown />}
      
      <main className={styles.mainContent}>
        {/* Desktop Sidebar - only show on desktop */}
        {!isMobile && (
          <aside className={styles.sidebar}>
            <CategoryNav
              categories={data.categories.map((cat) => ({ id: cat.id, name: cat.name }))}
              activeId={activeCategory}
              onSelect={handleSelectCategory}
            />
          </aside>
        )}
        
        <section style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3rem', minWidth: 0 }}>
          {/* Trending Carousel */}
          {trendingItems.length > 0 && (
            <div className={styles.section} id="trending-section">
              <h2 className={styles.sectionTitle}>Trending & Best Sellers</h2>
              <TrendingCarousel items={trendingItems} />
            </div>
          )}
          
          {/* Menu Categories */}
          {filteredCategories.map((cat) => {
            // Merge cart items with full menu item data for this category
            const cartItemsForCategory: (MenuItem & { quantity: number })[] = cart.items
              .map(cartItem => {
                const menuItem = cat.items.find(item => item.id === cartItem.id);
                return menuItem ? { ...menuItem, quantity: cartItem.quantity } : undefined;
              })
              .filter(Boolean) as (MenuItem & { quantity: number })[];
            return (
              <div key={cat.id} ref={(el) => { sectionRefs.current[cat.id] = el; }} id={cat.id} className={styles.section}>
                <h2 className={styles.sectionTitle}>{cat.name}</h2>
                <MenuGrid
                  items={cat.items}
                  cartItems={cartItemsForCategory}
                  onAdd={item => cart.addItem({ ...item, quantity: 1 })}
                  onRemove={cart.removeItem}
                  onUpdateQuantity={cart.updateQuantity}
                />
              </div>
            );
          })}
        </section>
      </main>
      
      {/* Cart Modal Popup */}
      {cartOpen && (
        <div className={styles.cartModalOverlay} onClick={() => setCartOpen(false)}>
          <div className={styles.cartModal} onClick={e => e.stopPropagation()}>
            <Suspense fallback={<LoadingFallback />}>
              <CartDrawer 
                open={true} 
                onClose={() => setCartOpen(false)} 
                onCheckout={handleCheckout}
              />
            </Suspense>
          </div>
        </div>
      )}
      
      {/* Cart + Recommendations Modal Side by Side */}
      {checkoutOpen && (
        <div className={styles.cartModalOverlay} onClick={() => setCheckoutOpen(false)}>
          <div 
            className={styles.cartModal} 
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '2rem',
              alignItems: 'flex-start',
              justifyContent: 'center',
              background: 'none',
              boxShadow: 'none',
              border: 'none',
              padding: isMobile ? '1rem 0.5rem' : '0',
              minHeight: isMobile ? 'auto' : '40rem',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{height: 'auto', display: 'flex', flexDirection: 'column', flex: 1}}>
              <Suspense fallback={<LoadingFallback />}>
                <CartDrawer 
                  open={true} 
                  onClose={() => setCheckoutOpen(false)} 
                  onCheckout={() => {}} // No-op, already in checkout
                />
              </Suspense>
            </div>
            <div style={{height: 'auto', display: 'flex', flexDirection: 'column', flex: 1}}>
              <Suspense fallback={<LoadingFallback />}>
                <RecommendationsPanel 
                  products={interactiveCheckoutProducts} 
                  onAdd={item => cart.addItem({ ...item, quantity: 1 })}
                  onBack={() => {
                    setCheckoutOpen(false);
                    setCartOpen(true);
                  }}
                  onProceed={() => { alert('Proceed to payment!'); }}
                />
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
