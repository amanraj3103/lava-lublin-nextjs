import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './CartDrawer.module.css';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  desktop?: boolean;
}

export default function CartDrawer({ open, onClose, desktop }: CartDrawerProps) {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  if (!open && !desktop) return null;
  return (
    <aside className={styles.cartDrawer}>
      <div className={styles.cartTitle}>Your Cart</div>
      <div className={styles.cartList}>
        {items.length === 0 ? (
          <div className={styles.emptyCart}>Your cart is empty.</div>
        ) : (
          items.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.name} className={styles.cartItemImage} />
              <div className={styles.cartItemInfo}>
                <div className={styles.cartItemName}>{item.name}</div>
                <div className={styles.cartItemPrice}>{item.price.toFixed(2)} PLN</div>
                <div className={styles.cartItemQty}>
                  <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span className={styles.qty}>{item.quantity}</span>
                  <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  <button className={styles.removeBtn} onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className={styles.cartFooter}>
        <button
          className={styles.addMoreBtn}
          onClick={onClose}
          aria-label="Continue shopping and add more items"
        >
          + Add more
        </button>
        <div className={styles.subtotal}>Subtotal: <span>{subtotal.toFixed(2)} PLN</span></div>
        <button className={styles.checkoutBtn} disabled={items.length === 0}>Checkout</button>
        <button className={styles.clearBtn} onClick={clearCart} disabled={items.length === 0}>Clear Cart</button>
      </div>
    </aside>
  );
} 