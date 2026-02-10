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
        <div className={styles.imageWrapper}>
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className={styles.image} />
          ) : (
            <div className={styles.noImage}>画像なし</div>
          )}
        </div>
      </div>

      <div className={styles.content}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.name}>{product.name}</h3>
        {product.description && (
          <p className={styles.description}>{product.description}</p>
        )}
        {product.price && (
          <div className={styles.priceContainer}>
            <p className={styles.priceLabel}>通常価格</p>
            <p className={styles.price}>¥{product.price.toLocaleString()}</p>
          </div>
        )}
        {product.amazonUrl && (
          
            href={product.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            Amazonで見る
          </a>
        )}
      </div>
    </div>
  );
}
