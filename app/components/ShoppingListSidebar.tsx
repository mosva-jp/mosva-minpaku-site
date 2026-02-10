'use client';

import React, { useEffect } from 'react';
import { useShoppingList } from './ShoppingListContext';
import AnimatedPrice from './AnimatedPrice';
import styles from './ShoppingListSidebar.module.css';

interface ShoppingListSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShoppingListSidebar({ isOpen, onClose }: ShoppingListSidebarProps) {
  const { items, removeItem, clearList, getTotalPrice } = useShoppingList();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return React.createElement(
    'div',
    { className: styles.sidebar },
    React.createElement(
      'div',
      { className: styles.header },
      React.createElement('h2', { className: styles.title }, '買うものリスト'),
      React.createElement(
        'button',
        { className: styles.closeButton, onClick: onClose },
        '✕'
      )
    ),
    React.createElement(
      'div',
      { className: styles.content },
      items.length === 0
        ? React.createElement(
            'div',
            { className: styles.empty },
            React.createElement('p', null, 'まだ商品が追加されていません'),
            React.createElement('p', { className: styles.emptyHint }, '商品カードの「+」ボタンでリストに追加できます')
          )
        : React.createElement(
            React.Fragment,
            null,
            React.createElement(
              'div',
              { className: styles.items },
              items.map((item) =>
                React.createElement(
                  'div',
                  { key: item.id, className: styles.item },
                  React.createElement(
                    'div',
                    { className: styles.itemContent },
                    React.createElement(
                      'div',
                      { className: styles.itemInfo },
                      React.createElement('h3', { className: styles.itemName }, item.name),
                      React.createElement('span', { className: styles.itemCategory }, item.category),
                      item.price &&
                        React.createElement(
                          'p',
                          { className: styles.itemPrice },
                          `¥${item.price.toLocaleString()}`
                        )
                    ),
                    React.createElement(
                      'button',
                      {
                        className: styles.removeButton,
                        onClick: () => removeItem(item.id),
                      },
                      '削除'
                    )
                  ),
                  item.amazonUrl && React.createElement(
                    'a',
                    {
                      href: item.amazonUrl,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      className: styles.buyButton,
                    },
                    'Amazonで購入'
                  )
                )
              )
            ),
            React.createElement(
              'div',
              { className: styles.footer },
              React.createElement(
                'div',
                { className: styles.total },
                React.createElement('span', null, '合計金額'),
                React.createElement(AnimatedPrice, {
                  value: getTotalPrice(),
                  className: styles.totalPrice,
                })
              ),
              React.createElement(
                'button',
                { className: styles.clearButton, onClick: clearList },
                'リストをクリア'
              )
            )
          )
    )
  );
}
