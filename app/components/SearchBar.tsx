'use client';

import styles from './SearchBar.module.css';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <div className={styles.container}>
      <span className={styles.searchIcon}>🔍</span>
      <input
        type="text"
        placeholder="商品名、カテゴリで検索..."
        className={styles.input}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button
          className={styles.clearButton}
          onClick={() => setSearchQuery('')}
          aria-label="クリア"
        >
          ✕
        </button>
      )}
    </div>
  );
}
