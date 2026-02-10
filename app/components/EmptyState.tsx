'use client';

import React from 'react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  searchQuery: string;
  selectedCategory: string;
  onReset: () => void;
}

export default function EmptyState({ searchQuery, selectedCategory, onReset }: EmptyStateProps) {
  const hasFilters = searchQuery || selectedCategory !== '全て';

  return React.createElement(
    'div',
    { className: styles.container },
    React.createElement('div', { className: styles.icon }, '🔍'),
    React.createElement('h3', { className: styles.title }, '該当する商品が見つかりませんでした'),
    React.createElement(
      'p',
      { className: styles.description },
      hasFilters
        ? '検索条件を変更してお試しください'
        : 'お探しの商品が見つかりませんでした'
    ),
    hasFilters &&
      React.createElement(
        'button',
        { className: styles.resetButton, onClick: onReset },
        '検索条件をリセット'
      ),
    React.createElement(
      'div',
      { className: styles.suggestions },
      React.createElement('p', { className: styles.suggestionsTitle }, 'こんな時はMOSVAにお任せください'),
      React.createElement(
        'div',
        { className: styles.serviceCards },
        React.createElement(
          'a',
          {
            href: 'https://mosva.jp/autominpaku',
            target: '_blank',
            rel: 'noopener noreferrer',
            className: styles.serviceCard,
          },
          React.createElement('span', { className: styles.serviceIcon }, '🏠'),
          React.createElement('span', { className: styles.serviceName }, '民泊運営代行'),
          React.createElement('span', { className: styles.serviceDesc }, '備品準備も丸ごとお任せ')
        ),
        React.createElement(
          'a',
          {
            href: 'https://mosva.jp/mosvaclean',
            target: '_blank',
            rel: 'noopener noreferrer',
            className: styles.serviceCard,
          },
          React.createElement('span', { className: styles.serviceIcon }, '✨'),
          React.createElement('span', { className: styles.serviceName }, '民泊清掃'),
          React.createElement('span', { className: styles.serviceDesc }, '消耗品の補充も対応')
        ),
        React.createElement(
          'a',
          {
            href: 'https://mosva.jp/design',
            target: '_blank',
            rel: 'noopener noreferrer',
            className: styles.serviceCard,
          },
          React.createElement('span', { className: styles.serviceIcon }, '🎨'),
          React.createElement('span', { className: styles.serviceName }, '空間デザイン'),
          React.createElement('span', { className: styles.serviceDesc }, '備品選びからお手伝い')
        )
      )
    )
  );
}
