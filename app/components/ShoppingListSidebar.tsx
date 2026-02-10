'use client';

import React from 'react';
import { useShoppingList } from './ShoppingListContext';
import styles from './ShoppingListSidebar.module.css';

interface ShoppingListSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShoppingListSidebar({ isOpen, onClose }: ShoppingListSidebarProps) {
  const { items, removeItem, clearList, getTotalPrice } = useShoppingList();

  if (!isOpen) return null;

  return React.createElement(
    React.Fragment,
    null,
    React.createElement('div', { className: styles.overlay, onClick: onClose }),
    React.createElement(
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
              React.createElement('p', null, 'まだ商品が追加されていません')
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
                  React.createElement(
                    'span',
                    { className: styles.totalPrice },
                    `¥${getTotalPrice().toLocaleString()}`
                  )
                ),
                React.createElement(
                  'button',
                  { className: styles.clearButton, onClick: clearList },
                  'リストをクリア'
                )
              )
            )
      )
    )
  );
}
