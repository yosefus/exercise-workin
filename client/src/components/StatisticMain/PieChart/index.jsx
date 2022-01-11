import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import styles from './style.module.scss';
Chart.register(...registerables);

export default function PieChart({ data, options }) {
  return (
    <div className={styles.wrapper}>
      <Pie width={100} height={100} datasetIdKey="id" data={data} options={options} />
    </div>
  );
}
