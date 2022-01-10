import styles from './style.module.scss';
import React from 'react';

export default function CostumTextArea({ rows, required, name, className, onChangeFn, defaultValue, label }) {
  return (
    <span className={`${className} ${styles.select}`}>
      <label htmlFor={name}>{label}</label>
      <textarea
        required={required ? true : false}
        id={name}
        onChange={onChangeFn}
        type="text"
        name={name}
        rows={rows ? rows : 10}
        defaultValue={defaultValue}
      />
    </span>
  );
}
