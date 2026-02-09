'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/lib/notion';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import styles from './ProductList.module.css';

interface ProductListProps {
  products: Product[];
  categories: string[];
}

export default function ProductList({ products, categories }: ProductListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('全て');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // カテゴリフィルター
    if (selectedCategory !== '全て') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // 検索フィルター
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      <div className={styles.results}>
        <p className={styles.resultCount}>
          {filteredProducts.length}件の商品が見つかりました
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className={styles.noResults}>
          <p>該当する商品が見つかりませんでした</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
