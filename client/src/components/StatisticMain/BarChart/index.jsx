import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import styles from './style.module.scss';
Chart.register(...registerables);

export default function BarChart({ data, options }) {
  return (
    <div className={styles.wrapper}>
      <Bar width={100} height={100} datasetIdKey="id" data={data} options={options} />
    </div>
  );
}
