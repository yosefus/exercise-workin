import styles from './style.module.scss';
import React from 'react';

export default function CostumSelect({
  required,
  optionArr,
  name,
  className,
  onChangeFn,
  defaultValue,
  label,
}) {
  return (
    <span className={`${className} ${styles.select}`}>
      <label htmlFor={name}>{label}</label>
      <select
        required={required ? true : false}
        defaultValue={defaultValue}
        onChange={onChangeFn}
        name={name}
        id={name}
      >
        <option></option>
        {optionArr.map((option, i) => (
          <option key={`option${i}`} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </span>
  );
}
