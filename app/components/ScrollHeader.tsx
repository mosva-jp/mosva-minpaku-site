'use client';

import { useEffect } from 'react';

export default function ScrollHeader() {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('header');
      if (header) {
        if (window.scrollY > 10) {
          header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
          header.style.background = 'rgba(255, 255, 255, 0.98)';
          header.style.backdropFilter = 'blur(10px)';
        } else {
          header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
          header.style.background = '#ffffff';
          header.style.backdropFilter = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}
