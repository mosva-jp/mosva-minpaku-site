'use client';

import styles from './CategoryFilter.module.css';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const allCategories = ['全て', ...categories];

  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`${styles.button} ${
              selectedCategory === category ? styles.active : ''
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
