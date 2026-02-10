'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import SortControl, { SortOption } from './SortControl';
import EmptyState from './EmptyState';
import { Product, filterProducts } from '@/lib/notion';
import styles from './ProductList.module.css';

interface ProductListProps {
  products: Product[];
  categories: string[];
}

function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => {
        if (!a.price) return 1;
        if (!b.price) return -1;
        return a.price - b.price;
      });
    case 'price-desc':
      return sorted.sort((a, b) => {
        if (!a.price) return 1;
        if (!b.price) return -1;
        return b.price - a.price;
      });
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name, 'ja'));
    case 'default':
    default:
      return sorted;
  }
}

export default function ProductList({ products, categories }: ProductListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('全て');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [isLoading, setIsLoading] = useState(false);

  const filteredProducts = filterProducts(products, selectedCategory, searchQuery);
  const sortedProducts = sortProducts(filteredProducts, sortBy);

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
    setSortBy('default');
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
        <div className={styles.resultHeader}>
          <div className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>
              {selectedCategory === '全て' ? 'すべての商品' : selectedCategory}
              <span className={styles.count}>{sortedProducts.length}件</span>
            </h2>
          </div>
          <SortControl sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      )}

      {isLoading ? (
        <div className={styles.grid}>
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : sortedProducts.length === 0 ? (
        <EmptyState
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onReset={handleReset}
        />
      ) : (
        <div className={styles.grid}>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
