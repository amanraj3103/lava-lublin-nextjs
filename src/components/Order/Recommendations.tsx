import React, { useContext, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import styles from '../../app/order/page.module.css';
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

interface RecommendationsProps {
  items: {
    id: string;
    name: string;
    image: string;
    price: number;
    tags?: string[];
    description?: string;
  }[];
}

export default function Recommendations({ items }: RecommendationsProps) {
  const { addItem } = useCart();
  const cartIconRef = useContext(CartIconRefContext);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  if (!items.length) return null;
  const handleAdd = (item: any, idx: number) => {
    if (imgRefs.current[idx] && cartIconRef?.current) {
      flyToCart(imgRefs.current[idx]!, cartIconRef.current);
    }
    addItem({ ...item, quantity: 1 });
  };
  return (
    <div className={styles.recommendationsListWrapper}>
      <h3 className={styles.recommendationsTitle}>Recommended Add-ons</h3>
      <ul className={styles.recommendationsList}>
        {items.map((item, idx) => (
          <li key={item.id} className={styles.recommendationListItem}>
            <img ref={el => (imgRefs.current[idx] = el)} src={item.image} alt={item.name} className={styles.recommendationListImage} />
            <span className={styles.recommendationListName}>{item.name}</span>
            <span className={styles.recommendationListPrice}>{item.price.toFixed(2)} PLN</span>
            <button
              className={styles.recommendationAddBtn}
              onClick={() => handleAdd(item, idx)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 