import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import styles from './style.module.scss';
Chart.register(...registerables);

export default function LineChart({ data, options }) {
  return (
    <div className={styles.wrapper}>
      <Line width={100} height={100} datasetIdKey="id" data={data} options={options} />
    </div>
  );
}
