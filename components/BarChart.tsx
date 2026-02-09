'use client';

import { FosterCareData } from '@/types/fostercare';
import styles from './BarChart.module.css';

interface BarChartProps {
  data: FosterCareData[];
}

export default function BarChart({ data }: BarChartProps) {
  const maxValue = Math.max(...data.map(d => d.children_count));

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Children in Foster Care by State</h2>
      <div className={styles.chart}>
        {data.map((item, index) => {
          const percentage = (item.children_count / maxValue) * 100;
          
          return (
            <div key={index} className={styles.barRow}>
              <div className={styles.label}>
                <span className={styles.stateName}>{item.state}</span>
                <span className={styles.count}>{item.children_count.toLocaleString()}</span>
              </div>
              <div className={styles.barContainer}>
                <div
                  className={styles.bar}
                  style={{
                    width: `${percentage}%`,
                    background: `hsl(${210 - (percentage / 2)}, 70%, 50%)`
                  }}
                >
                  <span className={styles.barLabel}>
                    {percentage > 15 ? item.children_count.toLocaleString() : ''}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
