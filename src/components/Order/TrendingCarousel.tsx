import React, { useContext, useRef, useState } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './TrendingCarousel.module.css';
import { CartIconRefContext } from './Header';

function flyToCart(imgEl: HTMLImageElement, cartIcon: HTMLElement) {
  const imgRect = imgEl.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();
  const clone = imgEl.cloneNode(true) as HTMLImageElement;
  clone.style.position = 'fixed';
  clone.style.left = imgRect.left + 'px';
  clone.style.top = imgRect.top + 'px';
  clone.style.width = imgRect.width + 'px';
  clone.style.height = imgRect.height + 'px';
  clone.style.zIndex = '9999';
  clone.style.pointerEvents = 'none';
  clone.style.transition = 'all 0.7s cubic-bezier(0.4,0.8,0.4,1)';
  document.body.appendChild(clone);
  requestAnimationFrame(() => {
    clone.style.left = cartRect.left + cartRect.width / 2 - imgRect.width / 4 + 'px';
    clone.style.top = cartRect.top + cartRect.height / 2 - imgRect.height / 4 + 'px';
    clone.style.width = imgRect.width / 2 + 'px';
    clone.style.height = imgRect.height / 2 + 'px';
    clone.style.opacity = '0.5';
    clone.style.transform = 'rotate(20deg) scale(0.7)';
  });
  setTimeout(() => {
    document.body.removeChild(clone);
  }, 700);
}

interface TrendingCarouselProps {
  items: {
    id: string;
    name: string;
    image: string;
    price: number;
    tags?: string[];
    description?: string;
  }[];
}

export default function TrendingCarousel({ items }: TrendingCarouselProps) {
  const { addItem } = useCart();
  const cartIconRef = useContext(CartIconRefContext);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [animatingItems, setAnimatingItems] = useState<Set<string>>(new Set());
  const [imageLoadingStates, setImageLoadingStates] = useState<Set<string>>(new Set());

  const handleAdd = (item: any, idx: number) => {
    if (imgRefs.current[idx] && cartIconRef?.current) {
      flyToCart(imgRefs.current[idx]!, cartIconRef.current);
    }
    setAnimatingItems(prev => new Set(prev).add(item.id));
    addItem({ ...item, quantity: 1 });
    setTimeout(() => {
      setAnimatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }, 500);
  };

  const handleImageLoad = (itemId: string) => {
    setImageLoadingStates(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  };

  const handleImageError = (itemId: string) => {
    setImageLoadingStates(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  };

  // Initialize loading states for all items
  React.useEffect(() => {
    setImageLoadingStates(new Set(items.map(item => item.id)));
  }, [items]);

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselInner}>
        {items.map((item, idx) => (
          <div key={item.id} className={styles.card}>
            <img 
              ref={el => (imgRefs.current[idx] = el)} 
              src={item.image} 
              alt={item.name} 
              className={`${styles.cardImage} ${imageLoadingStates.has(item.id) ? styles.loading : ''}`}
              onLoad={() => handleImageLoad(item.id)}
              onError={() => handleImageError(item.id)}
            />
            <div className={styles.cardTitleRow}>
              <span className={styles.cardTitle}>{item.name}</span>
            </div>
            <div className={styles.cardTags}>
              {item.tags?.map(tag => (
                <span key={tag} className={styles.cardTag}>
                  {tag === 'vegetarian' ? 'Vegetarian' : tag === 'spicy' ? 'Spicy' : tag === 'bestSeller' ? 'Best Seller' : tag}
                </span>
              ))}
            </div>
            <div className={styles.cardDesc}>{item.description}</div>
            <div className={styles.cardBottomRow}>
              <span className={styles.cardPrice}>{item.price.toFixed(2)} PLN</span>
              <button
                className={`${styles.addButtonFloating} ${animatingItems.has(item.id) ? styles.added : ''}`}
                onClick={() => handleAdd(item, idx)}
                aria-label={`Add ${item.name} to cart`}
                disabled={animatingItems.has(item.id)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="16"/>
                  <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 