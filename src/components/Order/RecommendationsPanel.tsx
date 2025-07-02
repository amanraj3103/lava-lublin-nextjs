import React from 'react';
import styles from './CartDrawer.module.css';
import type { Product, CartItem } from '../../types/Cart';
import Image from 'next/image';

interface RecommendationsPanelProps {
  products: Product[];
  onAdd: (product: CartItem) => void;
  onBack: () => void;
  onProceed: () => void;
}

export default function RecommendationsPanel({ products, onAdd, onBack, onProceed }: RecommendationsPanelProps) {
  return (
    <aside className={styles.cartDrawer} style={{ minWidth: '16rem', maxWidth: '19rem', minHeight: '28rem', maxHeight: '70vh', display: 'flex', flexDirection: 'column', padding: '0.7rem 0.5rem 0.5rem 0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.4rem' }}>
        <button 
          onClick={onBack} 
          style={{ 
            marginRight: '0.4rem', 
            background: 'rgba(30, 30, 30, 0.95)', 
            border: '2px solid #ef4444', 
            color: '#ef4444', 
            fontWeight: 700, 
            fontSize: '0.92rem', 
            cursor: 'pointer', 
            padding: '0.22rem 0.7rem', 
            borderRadius: '0.4rem', 
            transition: 'background 0.18s, color 0.18s, border 0.18s',
          }} 
          onMouseOver={e => {
            e.currentTarget.style.background = '#ef4444';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.border = '2px solid #ef4444';
          }} 
          onMouseOut={e => {
            e.currentTarget.style.background = 'rgba(30, 30, 30, 0.95)';
            e.currentTarget.style.color = '#ef4444';
            e.currentTarget.style.border = '2px solid #ef4444';
          }}
        >
          &#8592; Back to Cart
        </button>
        <div className={styles.cartTitle} style={{ flex: 1, textAlign: 'center', margin: 0, fontSize: '0.98rem' }}>Recommended Add-ons</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '1rem', overflowY: 'auto' }}>
        {products.map(product => (
          <div key={product.id} className={styles.cartItem} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255,255,255,0.01)', borderRadius: '0.5rem', padding: '0.32rem 0.5rem' }}>
            <Image src={product.image} alt={product.name} width={30} height={30} style={{ width: 30, height: 30, borderRadius: '0.4rem', objectFit: 'cover', background: '#18181b', flexShrink: 0 }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#fff', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</div>
              <div style={{ fontSize: '0.85rem', color: '#bdbdbd', fontWeight: 400, marginTop: 1 }}>{product.price.toFixed(2)} PLN · {product.color}</div>
            </div>
            <button className={styles.qtyBtn} style={{ fontSize: '0.88rem', padding: '0.18rem 0.7rem', fontWeight: 700, marginLeft: '0.7rem' }} onClick={() => onAdd({ ...product, quantity: 1 })}>
              + Add
            </button>
          </div>
        ))}
      </div>
      <button onClick={onProceed} style={{ marginTop: 'auto', background: 'linear-gradient(90deg, #ff9800 0%, #ff5722 100%)', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '0.4rem', padding: '0.5rem 1rem', fontSize: '0.98rem', cursor: 'pointer', transition: 'background 0.2s, transform 0.2s' }}>
        Proceed to Payment
      </button>
    </aside>
  );
} 