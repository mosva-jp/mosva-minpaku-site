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

  const cardElement = React.createElement(
    'div',
    { className: styles.card, onClick: handleCardClick },
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
            onClick: (e: React.MouseEvent) => e.stopPropagation(),
          },
          'Amazonで見る'
        )
    )
  );

  const modalElement = showModal
    ? React.createElement(
        'div',
        { className: styles.modalOverlay, onClick: handleOverlayClick },
        React.createElement(
          'div',
          { className: styles.modal },
          React.createElement(
            'button',
            { className: styles.closeButton, onClick: handleCloseModal },
            '✕'
          ),
          React.createElement(
            'div',
            { className: styles.modalContent },
            React.createElement(
              'div',
              { className: styles.modalImage },
              product.imageUrl
                ? React.createElement('img', {
                    src: product.imageUrl,
                    alt: product.name,
                  })
                : React.createElement('div', { className: styles.noImage }, '画像なし')
            ),
            React.createElement(
              'div',
              { className: styles.modalInfo },
              React.createElement('span', { className: styles.category }, product.category),
              React.createElement('h2', { className: styles.modalTitle }, product.name),
              product.description &&
                React.createElement(
                  'p',
                  { className: styles.modalDescription },
                  product.description
                ),
              product.price &&
                React.createElement(
                  'div',
                  { className: styles.modalPriceContainer },
                  React.createElement('p', { className: styles.priceLabel }, '通常価格'),
                  React.createElement(
                    'p',
                    { className: styles.modalPrice },
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
                    className: styles.amazonButton,
                  },
                  'Amazonで見る'
                )
            )
          )
        )
      )
    : null;

  return React.createElement(
    React.Fragment,
    null,
    cardElement,
    modalElement
  );
}
