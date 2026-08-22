import React from 'react';
import styles from './view.module.css';

export interface ButtonItem {
  label: string;
  value: unknown;
  active?: boolean;
  disabled?: boolean;
}

export interface ButtonsProps {
  data: ButtonItem[];
  onChange: (item: { label: string; value: unknown }) => void;
}

const Buttons: React.FC<ButtonsProps> = ({ data, onChange }) => {
  return (
    <div className={styles.btnGroup}>
      {data.map((item, index) => (
        <button
          type='button'
          key={index}
          className={`${styles.btn} ${item.active ? styles.active : ''} ${item.disabled ? styles.disabled : ''}`}
          onClick={() => !item.disabled && onChange({ label: item.label, value: item.value })}
          disabled={item.disabled}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Buttons;
