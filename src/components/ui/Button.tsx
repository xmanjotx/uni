'use client';

import React from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
};

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}