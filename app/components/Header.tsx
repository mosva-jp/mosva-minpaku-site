'use client';

import React, { useState } from 'react';
import { useShoppingList } from './ShoppingListContext';
import ShoppingListSidebar from './ShoppingListSidebar';
import styles from './Header.module.css';

export default function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { items } = useShoppingList();

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      { className: styles.headerContent },
      React.createElement(
        'a',
        {
          href: 'https://mosva.jp/',
          target: '_blank',
          rel: 'noopener noreferrer',
          className: styles.logo,
        },
        React.createElement('span', { className: styles.logoText }, 'MOSVA')
      ),
      React.createElement(
        'div',
        { className: styles.nav },
        React.createElement('span', { className: styles.navItem }, '備品カタログ'),
        React.createElement(
          'button',
          {
            className: styles.cartButton,
            onClick: () => setShowSidebar(true),
          },
          React.createElement('span', { className: styles.cartIcon }, '🛒'),
          items.length > 0 &&
            React.createElement(
              'span',
              { className: styles.cartBadge },
              items.length
            )
        )
      )
    ),
    React.createElement(ShoppingListSidebar, {
      isOpen: showSidebar,
      onClose: () => setShowSidebar(false),
    })
  );
}
