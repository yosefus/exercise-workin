import React from 'react';
import styles from './style.module.scss';
import { BiSearchAlt } from 'react-icons/bi';
import { CostumSelect } from '../..';

export default function FilterBox({ onChangeFilter, Filter }) {
  return (
    <form className={styles.filterBox}>
      <span>
        <input
          type="text"
          defaultValue={Filter.search}
          name="search"
          onChange={onChangeFilter}
          placeholder="חיפוש לפי נושאים"
        />
        <BiSearchAlt />
      </span>

      <span>
        <CostumSelect
          name="difficulty"
          label="דרגת קושי"
          optionArr={[
            { value: 'easy', title: 'קל' },
            { value: 'medium', title: 'בינוני' },
            { value: 'hard', title: 'קשה' },
          ]}
          defaultValue={Filter.difficulty}
          onChangeFn={onChangeFilter}
        />
      </span>
      <span>
        <CostumSelect
          onChangeFn={onChangeFilter}
          optionArr={[
            { value: 'short', title: 'תרגיל קצר' },
            { value: 'rolling', title: 'תרגיל מתגלגל' },
            { value: 'tutorial', title: 'מדריך' },
          ]}
          name="type"
          defaultValue={Filter.type}
          label="סוג התרגיל"
        />
      </span>
    </form>
  );
}
