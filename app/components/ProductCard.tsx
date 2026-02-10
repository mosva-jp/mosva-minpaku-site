'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Product } from '@/lib/notion';
import { useShoppingList } from './ShoppingListContext';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const { addItem, removeItem, isInList } = useShoppingList();
  const inList = isInList(product.id);

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('a') && !target.closest('button')) {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDragOffset(0);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  const handleToggleList = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inList) {
      removeItem(product.id);
    } else {
      setIsAdding(true);
      addItem(product);
      setTimeout(() => setIsAdding(false), 600);
    }
  };

  // スワイプ機能
  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(`.${styles.modalHandle}`)) {
      setDragStart(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStart !== null) {
      const currentY = e.touches[0].clientY;
      const offset = currentY - dragStart;
      if (offset > 0) {
        setDragOffset(offset);
      }
    }
  };

  const handleTouchEnd = () => {
    if (dragOffset > 100) {
      handleCloseModal();
    } else {
      setDragOffset(0);
    }
    setDragStart(null);
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const buttonClass = `${styles.listButton} ${inList ? styles.listButtonActive : ''} ${isAdding ? styles.adding : ''}`;

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
              loading: 'lazy',
              onLoad: () => setImageLoaded(true),
              style: { opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.3s ease' },
            })
          : React.createElement('div', { className: styles.noImage }, '画像なし')
      ),
      React.createElement(
        'button',
        {
          className: buttonClass,
          onClick: handleToggleList,
          title: inList ? 'リストから削除' : 'リストに追加',
        },
        inList ? '✓' : '+'
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
          React.createElement('p', { className: styles.priceLabel }, '参考価格'),
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
          {
            ref: modalRef,
            className: styles.modal,
            style: { transform: `translateY(${dragOffset}px)`, transition: dragStart ? 'none' : 'transform 0.3s ease' },
            onTouchStart: handleTouchStart,
            onTouchMove: handleTouchMove,
            onTouchEnd: handleTouchEnd,
          },
          React.createElement('div', { className: styles.modalHandle }),
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
                    loading: 'lazy',
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
                  React.createElement('p', { className: styles.priceLabel }, '参考価格'),
                  React.createElement(
                    'p',
                    { className: styles.modalPrice },
                    `¥${product.price.toLocaleString()}`
                  )
                ),
              React.createElement(
                'div',
                { className: styles.modalButtons },
                React.createElement(
                  'button',
                  {
                    className: `${styles.modalListButton} ${inList ? styles.modalListButtonActive : ''}`,
                    onClick: handleToggleList,
                  },
                  inList ? 'リストから削除' : 'リストに追加'
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
      )
    : null;

  return React.createElement(
    React.Fragment,
    null,
    cardElement,
    modalElement
  );
}
