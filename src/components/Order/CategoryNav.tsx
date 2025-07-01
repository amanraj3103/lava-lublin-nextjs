import React from 'react';
import styles from './CategoryNav.module.css';

interface CategoryNavProps {
  categories: { id: string; name: string }[];
  activeId: string;
  onSelect: (id: string) => void;
}

export default function CategoryNav({ categories, activeId, onSelect }: CategoryNavProps) {
  return (
    <nav className={styles.sidebarNav}>
      <ul className={styles.sidebarList}>
        <li key="trending">
          <button
            className={activeId === 'trending' ? styles.sidebarButtonActive : styles.sidebarButton}
            onClick={() => onSelect('trending')}
          >
            Trending & Best Sellers
          </button>
        </li>
        {categories.map(cat => (
          <li key={cat.id}>
            <button
              className={activeId === cat.id ? styles.sidebarButtonActive : styles.sidebarButton}
              onClick={() => onSelect(cat.id)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
} 