'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import { Product, filterProducts } from '@/lib/notion';
import styles from './ProductList.module.css';

interface ProductListProps {
  products: Product[];
  categories: string[];
}

export default function ProductList({ products, categories }: ProductListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('全て');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = filterProducts(products, selectedCategory, searchQuery);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className={styles.noResults}>
          <p>該当する商品が見つかりませんでした</p>
        </div>
      ) : (
        <div className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>
            {selectedCategory === '全て' ? 'すべての商品' : selectedCategory}
            <span className={styles.count}>{filteredProducts.length}件</span>
          </h2>
          <div className={styles.grid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
