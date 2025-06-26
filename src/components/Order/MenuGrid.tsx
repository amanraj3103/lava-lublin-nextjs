import React from 'react';
import MenuCard from './MenuCard';
import styles from './MenuGrid.module.css';

interface MenuGridProps {
  items: any[];
  cartItems: any[];
  onAdd: (item: any) => void;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export default function MenuGrid({ items, cartItems, onAdd, onRemove, onUpdateQuantity }: MenuGridProps) {
  return (
    <div className={styles.menuGrid}>
      <div className={styles.menuGridInner}>
        {items.map(item => (
          <MenuCard
            key={item.id}
            item={item}
            cartItem={cartItems.find(i => i.id === item.id)}
            onAdd={onAdd}
            onRemove={onRemove}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>
    </div>
  );
} 