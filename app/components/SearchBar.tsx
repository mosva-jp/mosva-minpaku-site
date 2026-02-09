'use client';

import styles from './SearchBar.module.css';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="商品名、カテゴリで検索..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.input}
      />
      {searchQuery && (
        <button
          onClick={() => onSearchChange('')}
          className={styles.clearButton}
          aria-label="検索をクリア"
        >
          ✕
        </button>
      )}
    </div>
  );
}
