'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import EmptyState from './EmptyState';
import { Product, filterProducts } from '@/lib/notion';
import styles from './ProductList.module.css';

interface ProductListProps {
  products: Product[];
  categories: string[];
}

export default function ProductList({ products, categories }: ProductListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('全て');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredProducts = filterProducts(products, selectedCategory, searchQuery);

  const handleCategoryChange = (category: string) => {
    setIsLoading(true);
    setSelectedCategory(category);
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('全て');
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={handleSearchChange}
          allProducts={products}
        />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategoryChange}
        />
      </div>

      {!isLoading && filteredProducts.length > 0 && (
        <div className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>
            {selectedCategory === '全て' ? 'すべての商品' : selectedCategory}
            <span className={styles.count}>{filteredProducts.length}件</span>
          </h2>
        </div>
      )}

      {isLoading ? (
        <div className={styles.grid}>
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <EmptyState
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onReset={handleReset}
        />
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
