import React, { useState } from 'react';
import styles from './CategoryNav.module.css';

interface CategoryNavProps {
  categories: { id: string; name: string }[];
  activeId: string;
  onSelect: (id: string) => void;
}

export default function CategoryNav({ categories, activeId, onSelect }: CategoryNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
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
      {/* Mobile Drawer Trigger */}
      <div className={styles.mobileNavTrigger}>
        <button
          className={styles.mobileNavButton}
          onClick={() => setOpen(true)}
        >
          Browse Menu
          <span className={styles.mobileNavIcon}>▼</span>
        </button>
        {/* Drawer Overlay */}
        {open && (
          <div className={styles.drawerOverlay} onClick={() => setOpen(false)} />
        )}
        {/* Drawer */}
        <div className={open ? styles.drawerOpen : styles.drawerClosed}>
          <div className={styles.drawerHeader}>
            <span className={styles.drawerTitle}>Menu</span>
            <button onClick={() => setOpen(false)} className={styles.drawerCloseBtn}>&times;</button>
          </div>
          <ul className={styles.drawerList}>
            <li key="trending">
              <button
                className={activeId === 'trending' ? styles.drawerButtonActive : styles.drawerButton}
                onClick={() => { onSelect('trending'); setOpen(false); }}
              >
                Trending & Best Sellers
              </button>
            </li>
            {categories.map(cat => (
              <li key={cat.id}>
                <button
                  className={activeId === cat.id ? styles.drawerButtonActive : styles.drawerButton}
                  onClick={() => { onSelect(cat.id); setOpen(false); }}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
} 