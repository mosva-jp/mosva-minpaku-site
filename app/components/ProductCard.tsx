import React from 'react';
import { Product } from '@/lib/notion';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return React.createElement(
    'div',
    { className: styles.card },
    React.createElement(
      'div',
      { className: styles.imageContainer },
      React.createElement(
        'div',
        { className: styles.imageWrapper },
        product.imageUrl
          ? React.createElement('img', {
              src: product.imageUrl,
              alt: product.name,
              className: styles.image,
            })
          : React.createElement('div', { className: styles.noImage }, '画像なし')
      )
    ),
    React.createElement(
      'div',
      { className: styles.content },
      React.createElement('span', { className: styles.category }, product.category),
      React.createElement('h3', { className: styles.name }, product.name),
      product.description &&
        React.createElement('p', { className: styles.description }, product.description),
      product.price &&
        React.createElement(
          'div',
          { className: styles.priceContainer },
          React.createElement('p', { className: styles.priceLabel }, '通常価格'),
          React.createElement(
            'p',
            { className: styles.price },
            `¥${product.price.toLocaleString()}`
          )
        ),
      product.amazonUrl &&
        React.createElement(
          'a',
          {
            href: product.amazonUrl,
            target: '_blank',
            rel: 'noopener noreferrer',
            className: styles.button,
          },
          'Amazonで見る'
        )
    )
  );
}
