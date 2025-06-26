import React from 'react';
import { MenuItemType } from './MenuSection';
import styles from '../app/order/order.module.css';

interface ProductQuickViewProps {
  item: MenuItemType | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItemType) => void;
}

const ProductQuickView: React.FC<ProductQuickViewProps> = ({ item, isOpen, onClose, onAddToCart }) => {
  if (!item || !isOpen) return null;

  return (
    <div className={styles.quickViewOverlay}>
      <div className={styles.quickViewModal}>
        <div className={styles.quickViewImageWrap}>
          <img
            src={item.image}
            alt={item.name}
            className={styles.quickViewImage}
            onError={(e: any) => (e.target.src = '/lava_icon.png')}
          />
          <button onClick={onClose} className={styles.quickViewCloseBtn}>✕</button>
          <div className={styles.quickViewBadges}>
            {item.bestSeller && <span className={styles.quickViewBadge}>🔥 Best Seller</span>}
            {item.spicy && <span className={styles.quickViewBadgeSpicy}>🌶️ Spicy</span>}
            {item.popular && <span className={styles.quickViewBadgePopular}>★ Popular</span>}
          </div>
        </div>
        <div className={styles.quickViewContent}>
          <div className={styles.quickViewHeader}>
            <h2 className={styles.quickViewTitle}>{item.name}</h2>
            <span className={styles.quickViewPrice}>{(item.price / 100).toFixed(2)} PLN</span>
          </div>
          <div className={styles.quickViewDesc}>{item.description}</div>
          {item.rating && (
            <div className={styles.quickViewRatingRow}>
              <span className={styles.quickViewRating}>★ {item.rating}</span>
              {item.reviews && <span className={styles.quickViewReviews}>({item.reviews} reviews)</span>}
              {item.preparationTime && <span className={styles.quickViewPrepTime}>{item.preparationTime}</span>}
            </div>
          )}
          {item.tags && item.tags.length > 0 && (
            <div className={styles.quickViewTags}>
              {item.tags.map((tag, idx) => (
                <span key={idx} className={styles.quickViewTag}>{tag}</span>
              ))}
            </div>
          )}
          {item.calories && (
            <div className={styles.quickViewNutrition}>
              <span>Calories: <b>{item.calories} kcal</b></span>
              <span>Category: <b>{item.category}</b></span>
            </div>
          )}
          <div className={styles.quickViewActions}>
            <button
              className={styles.quickViewAddBtn}
              onClick={() => {
                onAddToCart(item);
                onClose();
              }}
            >
              Add to Cart - {(item.price / 100).toFixed(2)} PLN
            </button>
            <button className={styles.quickViewCancelBtn} onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView; 