'use client';

import styles from './CategoryFilter.module.css';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categoryIcons: Record<string, string> = {
  'キッチン': '🍳',
  'トイレ': '🚽',
  'バス': '🛁',
  'ランドリー': '🧺',
  '害虫対策': '🐛',
  '寝具・リネン': '🛏️',
  '家電': '📺',
  '家具': '🪑',
  'ステッカー': '🏷️',
  'その他': '📦',
};

export default function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) {
  const allCategories = ['全て', ...categories];

  return (
    <div className={styles.container}>
      <div className={styles.scrollContainer}>
        {allCategories.map((category) => (
          <button
            key={category}
            className={`${styles.categoryButton} ${
              selectedCategory === category ? styles.active : ''
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {categoryIcons[category] && (
              <span className={styles.icon}>{categoryIcons[category]}</span>
            )}
            <span>{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
