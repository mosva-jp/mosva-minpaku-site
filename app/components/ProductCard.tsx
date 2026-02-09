'use client';

import { Product } from '@/lib/notion';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className={styles.image}
          />
        ) : (
          <div className={styles.noImage}>
            <span>画像なし</span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.category}>{product.category}</div>
        <h3 className={styles.name}>{product.name}</h3>
        
        {product.description && (
          <p className={styles.description}>{product.description}</p>
        )}

        {product.price && (
          <div className={styles.price}>
            ¥{product.price.toLocaleString()}
          </div>
        )}

        {product.amazonUrl && (
          <a
            href={product.amazonUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className={styles.button}
          >
            Amazonで見る
          </a>
        )}
      </div>
    </div>
  );
}
