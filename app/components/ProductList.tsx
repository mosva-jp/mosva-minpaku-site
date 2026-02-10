'use client';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import { Product, getProducts, getCategories, filterProducts } from '@/lib/notion';
import styles from './ProductList.module.css';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('全て');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data);
      setCategories(getCategories(data));
    }
    fetchProducts();
  }, []);

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

      <div className={styles.results}>
        <p className={styles.resultCount}>{filteredProducts.length}件の商品が見つかりました</p>
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
