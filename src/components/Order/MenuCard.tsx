import React, { useState, useContext } from 'react';
import styles from './MenuGrid.module.css';
import { CartIconRefContext } from './Header';
import type { MenuItem } from '../../hooks/useMenuData';
import Image from 'next/image';

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

interface MenuCardProps {
  item: MenuItem;
  cartItem?: MenuItem & { quantity: number };
  onAdd: (item: MenuItem) => void;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export default function MenuCard({ item, cartItem, onAdd, onRemove, onUpdateQuantity }: MenuCardProps) {
  const cartIconRef = useContext(CartIconRefContext);
  const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [quantityAnimating, setQuantityAnimating] = useState(false);

  const handleAdd = (item: MenuItem) => {
    if (imgRef && cartIconRef?.current) {
      flyToCart(imgRef, cartIconRef.current);
    }
    setIsAnimating(true);
    onAdd(item);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleQuantityUpdate = (id: string, newQuantity: number) => {
    setQuantityAnimating(true);
    onUpdateQuantity(id, newQuantity);
    setTimeout(() => setQuantityAnimating(false), 300);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
  };

  return (
    <div className={`${styles.menuCardStandard} ${isAnimating ? styles.addedAnimate : ''}`}>
      <Image
        ref={setImgRef}
        src={item.image}
        alt={item.name}
        width={180}
        height={120}
        className={`${styles.menuImage} ${isImageLoading ? styles.loading : ''}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAn8B9n6l9wAAAABJRU5ErkJggg=="
      />
      <div className={styles.menuTitle}>{item.name}</div>
      <div className={styles.menuPrice}>{item.price.toFixed(2)} PLN</div>
      <div className={styles.menuDescWrapper}>
        <div className={styles.menuDescFull}>{item.description}</div>
      </div>
      <div className={styles.menuActions}>
        {!cartItem ? (
          <button 
            className={styles.addButton} 
            onClick={() => handleAdd(item)}
            disabled={isAnimating}
            aria-label={`Add ${item.name} to cart`}
            aria-describedby={`item-${item.id}-description`}
          >
            {isAnimating ? 'Added!' : 'Add to Cart'}
          </button>
        ) : (
          <div className={styles.qtyControls}>
            <button 
              className={styles.qtyBtn} 
              onClick={() => handleQuantityUpdate(item.id, cartItem.quantity - 1)}
              disabled={quantityAnimating}
              aria-label={`Decrease quantity of ${item.name}`}
              aria-describedby={`item-${item.id}-quantity`}
            >
              -
            </button>
            <span 
              className={`${styles.qty} ${quantityAnimating ? styles.updated : ''}`}
              id={`item-${item.id}-quantity`}
              aria-label={`Current quantity: ${cartItem.quantity}`}
            >
              {cartItem.quantity}
            </span>
            <button 
              className={styles.qtyBtn} 
              onClick={() => handleQuantityUpdate(item.id, cartItem.quantity + 1)}
              disabled={quantityAnimating}
              aria-label={`Increase quantity of ${item.name}`}
              aria-describedby={`item-${item.id}-quantity`}
            >
              +
            </button>
            <button 
              className={styles.removeBtn} 
              onClick={() => onRemove(item.id)}
              disabled={quantityAnimating}
              aria-label={`Remove ${item.name} from cart`}
            >
              Remove
            </button>
          </div>
        )}
      </div>
      <div id={`item-${item.id}-description`} className="sr-only">
        {item.description}
      </div>
    </div>
  );
} 