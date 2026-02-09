'use client';

import { FosterCareData } from '@/types/fostercare';
import styles from './StateMap.module.css';

interface StateMapProps {
  data: FosterCareData[];
}

export default function StateMap({ data }: StateMapProps) {
  const maxValue = Math.max(...data.map(d => d.children_count));
  const minValue = Math.min(...data.map(d => d.children_count));

  const getColor = (value: number) => {
    const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
    return `hsl(210, 70%, ${80 - (percentage * 0.5)}%)`;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Foster Care Heat Map</h2>
      <div className={styles.mapGrid}>
        {data.map((item, index) => (
          <div
            key={index}
            className={styles.stateCard}
            style={{ backgroundColor: getColor(item.children_count) }}
          >
            <div className={styles.stateAbbr}>
              {item.state_abbr || item.state.substring(0, 2).toUpperCase()}
            </div>
            <div className={styles.stateName}>{item.state}</div>
            <div className={styles.stateCount}>
              {item.children_count.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.legend}>
        <span>Lower</span>
        <div className={styles.legendGradient}></div>
        <span>Higher</span>
      </div>
    </div>
  );
}
