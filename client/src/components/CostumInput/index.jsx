import styles from './style.module.scss';
import React from 'react';

export default function CostumInput({ required, name, className, onChangeFn, defaultValue, label }) {
  return (
    <span className={`${className} ${styles.select}`}>
      <label htmlFor={name}>{label}</label>
      <input
        required={required ? true : false}
        id={name}
        onChange={onChangeFn}
        type="text"
        name={name}
        defaultValue={defaultValue}
      />
    </span>
  );
}
