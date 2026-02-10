'use client';

import { useState, useEffect } from 'react';

interface AnimatedPriceProps {
  value: number;
  className?: string;
}

export default function AnimatedPrice({ value, className = '' }: AnimatedPriceProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (displayValue === value) return;

    const duration = 500; // アニメーション時間（ミリ秒）
    const steps = 30; // アニメーションのステップ数
    const stepValue = (value - displayValue) / steps;
    const stepTime = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue((prev) => prev + stepValue);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className={className}>
      ¥{Math.round(displayValue).toLocaleString()}
    </span>
  );
}
