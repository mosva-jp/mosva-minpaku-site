'use client';

import { useState } from 'react';
import { useShoppingList } from './ShoppingListContext';
import ShoppingListSidebar from './ShoppingListSidebar';
import styles from './BottomNavigation.module.css';

export default function BottomNavigation() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { items } = useShoppingList();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToSearch = () => {
    const searchBar = document.querySelector('input[type="text"]');
    if (searchBar) {
      searchBar.scrollIntoView({ behavior: 'smooth', block: 'center' });
      (searchBar as HTMLInputElement).focus();
    }
  };

  return (
    <>
      <nav className={styles.bottomNav}>
        <button className={styles.navItem} onClick={scrollToTop}>
          <span className={styles.navIcon}>🏠</span>
          <span className={styles.navLabel}>ホーム</span>
        </button>

        <button className={styles.navItem} onClick={scrollToSearch}>
          <span className={styles.navIcon}>🔍</span>
          <span className={styles.navLabel}>検索</span>
        </button>

        <button 
          className={`${styles.navItem} ${items.length > 0 ? styles.navItemActive : ''}`}
          onClick={() => setShowSidebar(true)}
        >
          <span className={styles.navIcon}>🛒</span>
          <span className={styles.navLabel}>リスト</span>
          {items.length > 0 && (
            <span className={styles.navBadge}>{items.length}</span>
          )}
        </button>
      </nav>

      <ShoppingListSidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
      />
    </>
  );
}
