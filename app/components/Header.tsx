'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useShoppingList } from './ShoppingListContext';
import ShoppingListSidebar from './ShoppingListSidebar';
import styles from './Header.module.css';

export default function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { items } = useShoppingList();

  const services = [
    { name: '民泊運営代行', url: 'https://mosva.jp/autominpaku', description: '運営を丸ごとお任せ' },
    { name: 'チャット代行', url: 'https://mosva.jp/omotenasi-chat', description: 'ゲスト対応を代行' },
    { name: '民泊清掃', url: 'https://mosva.jp/mosvaclean', description: 'プロの清掃サービス' },
    { name: '駆けつけ代行', url: 'https://mosva.jp/minpaku-kaketsuke', description: '緊急時の対応' },
    { name: '空間デザイン', url: 'https://mosva.jp/design', description: '魅力的な空間づくり' },
    { name: '住宅宿泊管理', url: 'https://mosva.jp/minpaku-kanri', description: '管理業務を代行' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowServicesMenu(false);
      }
    };

    if (showServicesMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showServicesMenu]);

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
        React.createElement(
          'div',
          { 
            className: styles.servicesDropdown,
            ref: menuRef,
          },
          React.createElement(
            'span', 
            { 
              className: styles.navItem,
              onClick: () => setShowServicesMenu(!showServicesMenu),
            }, 
            'サービス一覧 ▼'
          ),
          showServicesMenu && React.createElement(
            'div',
            { className: styles.dropdownMenu },
            services.map((service) =>
              React.createElement(
                'a',
                {
                  key: service.name,
                  href: service.url,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: styles.dropdownItem,
                },
                React.createElement('span', { className: styles.serviceName }, service.name),
                React.createElement('span', { className: styles.serviceDesc }, service.description)
              )
            )
          )
        ),
        React.createElement('span', { className: styles.navItem }, '備品カタログ'),
        React.createElement(
          'button',
          {
            className: styles.cartButton,
            onClick: () => setShowSidebar(true),
          },
          React.createElement('span', { className: styles.cartIcon }, '🛒'),
          React.createElement('span', { className: styles.cartText }, '買うものリスト'),
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
