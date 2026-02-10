'use client';

import React, { useEffect } from 'react';
import { useShoppingList } from './ShoppingListContext';
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

  const handleBuyAll = () => {
    const itemsWithLinks = items.filter(item => item.amazonUrl);
    
    if (itemsWithLinks.length === 0) {
      alert('Amazonリンクのある商品がありません');
      return;
    }
    
    // 即座に全てのウィンドウを開く（ポップアップブロック回避）
    itemsWithLinks.forEach((item) => {
      window.open(item.amazonUrl, '_blank');
    });
  };

  const handleItemClick = (amazonUrl?: string) => {
    if (amazonUrl) {
      window.open(amazonUrl, '_blank');
    } else {
      alert('この商品にはAmazonリンクが設定されていません');
    }
  };

  if (!isOpen) return null;

  const itemsWithLinks = items.filter(item => item.amazonUrl).length;
  const itemsWithoutLinks = items.length - itemsWithLinks;

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
                      { className: styles.itemInfo },
                      React.createElement(
                        'h3',
                        {
                          className: styles.itemName,
                          onClick: () => handleItemClick(item.amazonUrl),
                        },
                        item.name
                      ),
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
                itemsWithoutLinks > 0 &&
                  React.createElement(
                    'p',
                    { className: styles.warningText },
                    `※ ${itemsWithoutLinks}件の商品にはAmazonリンクがありません`
                  ),
                React.createElement(
                  'div',
                  { className: styles.actions },
                  React.createElement(
                    'button',
                    { 
                      className: styles.buyAllButton, 
                      onClick: handleBuyAll,
                      disabled: itemsWithLinks === 0
                    },
                    `🛒 まとめて購入する (${itemsWithLinks}件)`
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
    )
  );
}
