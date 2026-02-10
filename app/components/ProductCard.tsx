'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/notion';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('a')) {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <>
      <div className={styles.card} onClick={handleCardClick}>
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
              onClick={(e) => e.stopPropagation()}
            >
              Amazonで見る
            </a>
          )}
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
          <div className={styles.modal}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              ✕
            </button>
            
            <div className={styles.modalContent}>
              <div className={styles.modalImage}>
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} />
                ) : (
                  <div className={styles.noImage}>画像なし</div>
                )}
              </div>
              
              <div className={styles.modalInfo}>
                <span className={styles.category}>{product.category}</span>
                <h2 className={styles.modalTitle}>{product.name}</h2>
                
                {product.description && (
                  <p className={styles.modalDescription}>{product.description}</p>
                )}
                
                {product.price && (
                  <div className={styles.modalPriceContainer}>
                    <p className={styles.priceLabel}>通常価格</p>
                    <p className={styles.modalPrice}>¥{product.price.toLocaleString()}</p>
                  </div>
                )}
                
                {product.amazonUrl && (
                  
                    href={product.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.amazonButton}
                  >
                    Amazonで見る
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
