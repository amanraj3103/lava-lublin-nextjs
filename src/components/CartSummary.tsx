import { useCart } from '../context/CartContext';
import styles from '../app/order/order.module.css';

const DELIVERY_FEE = 500; // 5 PLN in grosz

const CartSummary: React.FC<{ onCheckout: () => void }> = ({ onCheckout }) => {
  const { items, subtotal, removeItem, updateQuantity, clearCart } = useCart();
  const finalTotal = subtotal + DELIVERY_FEE;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={styles.cartSummary}>
      <div className={styles.cartHeader}>
        <h3 className={styles.cartTitle}>Your Order</h3>
        <span className={styles.cartCount}>{itemCount} items</span>
      </div>
      <div className={styles.cartItems}>
            {items.length === 0 ? (
          <div className={styles.cartEmpty}>
            <div className={styles.cartEmptyIcon}>🛒</div>
            <div className={styles.cartEmptyText}>Your cart is empty</div>
            <div className={styles.cartEmptySubtext}>Add some delicious items to get started!</div>
          </div>
            ) : (
              items.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.cartItemInfo}>
                <div className={styles.cartItemName}>{item.name}</div>
                <div className={styles.cartItemControls}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className={styles.cartQtyBtn}>-</button>
                  <span className={styles.cartQty}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className={styles.cartQtyBtn}>+</button>
                    </div>
                  </div>
              <div className={styles.cartItemMeta}>
                <span className={styles.cartItemPrice}>{(item.price * item.quantity / 100).toFixed(2)} PLN</span>
                <button onClick={() => removeItem(item.id)} className={styles.cartRemoveBtn}>Remove</button>
                  </div>
                </div>
              ))
            )}
          </div>
      {items.length > 0 && (
        <>
          <div className={styles.cartTotals}>
            <div className={styles.cartRow}><span>Subtotal:</span><span>{(subtotal / 100).toFixed(2)} PLN</span></div>
            <div className={styles.cartRow}><span>Delivery:</span><span>{(DELIVERY_FEE / 100).toFixed(2)} PLN</span></div>
            <div className={styles.cartRowTotal}><span>Total:</span><span>{(finalTotal / 100).toFixed(2)} PLN</span></div>
          </div>
          <div className={styles.cartActions}>
            <button className={styles.cartClearBtn} onClick={clearCart}>Clear Cart</button>
            <button className={styles.cartCheckoutBtn} onClick={onCheckout} disabled={items.length === 0}>
            Proceed to Checkout
          </button>
          </div>
        </>
      )}
      </div>
  );
};

export default CartSummary; 