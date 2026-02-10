'use client';

import styles from './SortControl.module.css';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

interface SortControlProps {
  sortBy: SortOption;
  setSortBy: (option: SortOption) => void;
}

export default function SortControl({ sortBy, setSortBy }: SortControlProps) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>並び替え:</label>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as SortOption)}
        className={styles.select}
      >
        <option value="default">おすすめ順</option>
        <option value="price-asc">価格が安い順</option>
        <option value="price-desc">価格が高い順</option>
        <option value="name-asc">名前順（あいうえお）</option>
      </select>
    </div>
  );
}
