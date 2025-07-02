import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './CartDrawer.module.css';
import Image from 'next/image';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
  desktop?: boolean;
}

export default function CartDrawer({ open, onClose, onCheckout, desktop }: CartDrawerProps) {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  if (!open && !desktop) return null;
  return (
    <aside 
      className={styles.cartDrawer} 
      style={{ minWidth: '16rem', maxWidth: '18rem', minHeight: '36rem', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
      role="dialog"
      aria-labelledby="cart-title"
      aria-describedby="cart-description"
    >
      <div className={styles.cartTitle} style={{ marginBottom: '0.7rem' }} id="cart-title">Your Cart</div>
      <div id="cart-description" className="sr-only">Shopping cart with items and checkout options</div>
      <div className={styles.cartList} style={{ flex: 1, overflowY: 'auto', minHeight: '16rem', marginBottom: '0.3rem' }}>
        {items.length === 0 ? (
          <div className={styles.emptyCart} role="status" aria-live="polite">Your cart is empty.</div>
        ) : (
          items.map(item => (
            <div key={item.id} className={styles.cartItem} role="listitem">
              <Image src={item.image} alt={item.name} className={styles.cartItemImage} width={50} height={50} />
              <div className={styles.cartItemInfo}>
                <div className={styles.cartItemName} id={`cart-item-${item.id}-name`}>{item.name}</div>
                <div className={styles.cartItemPrice}>{item.price.toFixed(2)} PLN</div>
                <div className={styles.cartItemQty}>
                  <button 
                    className={styles.qtyBtn} 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label={`Decrease quantity of ${item.name}`}
                    aria-describedby={`cart-item-${item.id}-quantity`}
                  >-</button>
                  <span className={styles.qty} id={`cart-item-${item.id}-quantity`} aria-label={`Quantity: ${item.quantity}`}>{item.quantity}</span>
                  <button 
                    className={styles.qtyBtn} 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label={`Increase quantity of ${item.name}`}
                    aria-describedby={`cart-item-${item.id}-quantity`}
                  >+</button>
                  <button 
                    className={styles.removeBtn} 
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >Remove</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className={styles.cartFooter} style={{ marginTop: 'auto' }}>
        <button
          className={styles.addMoreBtn}
          onClick={onClose}
          aria-label="Continue shopping and add more items"
        >
          + Add more
        </button>
        <div className={styles.subtotal} role="status" aria-live="polite">
          Subtotal: <span>{subtotal.toFixed(2)} PLN</span>
        </div>
        <button 
          className={styles.checkoutBtn} 
          disabled={items.length === 0}
          onClick={onCheckout}
          aria-label={`Proceed to checkout with ${items.length} items`}
        >
          Checkout
        </button>
        <button 
          className={styles.clearBtn} 
          onClick={clearCart} 
          disabled={items.length === 0}
          aria-label="Clear all items from cart"
        >Clear Cart</button>
      </div>
    </aside>
  );
} 