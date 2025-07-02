import React from 'react';
import MenuCard from './MenuCard';
import styles from './MenuGrid.module.css';
import type { MenuItem } from '../../hooks/useMenuData';

interface MenuGridProps {
  items: MenuItem[];
  cartItems: (MenuItem & { quantity: number })[];
  onAdd: (item: MenuItem) => void;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export default function MenuGrid({ items, cartItems, onAdd, onRemove, onUpdateQuantity }: MenuGridProps) {
  return (
    <div className={styles.menuGrid}>
      <div className={styles.menuGridInner}>
        {items.map(item => {
          const cartItem = cartItems.find(i => i.id === item.id);
          return (
            <MenuCard
              key={item.id}
              item={item}
              cartItem={cartItem}
              onAdd={onAdd}
              onRemove={onRemove}
              onUpdateQuantity={onUpdateQuantity}
            />
          );
        })}
      </div>
    </div>
  );
} 