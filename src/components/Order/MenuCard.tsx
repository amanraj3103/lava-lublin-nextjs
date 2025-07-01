import React, { useState, useContext, useEffect } from 'react';
import styles from './MenuGrid.module.css';
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

interface MenuCardProps {
  item: any;
  cartItem?: any;
  onAdd: (item: any) => void;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export default function MenuCard({ item, cartItem, onAdd, onRemove, onUpdateQuantity }: MenuCardProps) {
  const cartIconRef = useContext(CartIconRefContext);
  const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [quantityAnimating, setQuantityAnimating] = useState(false);

  const handleAdd = (item: any) => {
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
      <img 
        ref={setImgRef} 
        src={item.image} 
        alt={item.name} 
        className={`${styles.menuImage} ${isImageLoading ? styles.loading : ''}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
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
          >
            {isAnimating ? 'Added!' : 'Add to Cart'}
          </button>
        ) : (
          <div className={styles.qtyControls}>
            <button 
              className={styles.qtyBtn} 
              onClick={() => handleQuantityUpdate(item.id, cartItem.quantity - 1)}
              disabled={quantityAnimating}
            >
              -
            </button>
            <span className={`${styles.qty} ${quantityAnimating ? styles.updated : ''}`}>
              {cartItem.quantity}
            </span>
            <button 
              className={styles.qtyBtn} 
              onClick={() => handleQuantityUpdate(item.id, cartItem.quantity + 1)}
              disabled={quantityAnimating}
            >
              +
            </button>
            <button 
              className={styles.removeBtn} 
              onClick={() => onRemove(item.id)}
              disabled={quantityAnimating}
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 