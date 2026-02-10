'use client';

import React from 'react';
import styles from './ShareButtons.module.css';

export default function ShareButtons() {
  const url = typeof window !== 'undefined' ? window.location.href : 'https://items.mosva.jp';
  const text = '民泊備品・消耗品まとめ | MOSVA';

  const handleShare = (platform: string) => {
    let shareUrl = '';
    
    switch (platform) {
      case 'line':
        shareUrl = `https://line.me/R/msg/text/?${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('リンクをコピーしました！');
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return React.createElement(
    'div',
    { className: styles.container },
    React.createElement(
      'button',
      {
        className: `${styles.shareButton} ${styles.line}`,
        onClick: () => handleShare('line'),
        title: 'LINEで共有',
      },
      React.createElement('span', { className: styles.icon }, '💬'),
      React.createElement('span', { className: styles.label }, 'LINE')
    ),
    React.createElement(
      'button',
      {
        className: `${styles.shareButton} ${styles.copy}`,
        onClick: () => handleShare('copy'),
        title: 'リンクをコピー',
      },
      React.createElement('span', { className: styles.icon }, '🔗'),
      React.createElement('span', { className: styles.label }, 'コピー')
    )
  );
}
