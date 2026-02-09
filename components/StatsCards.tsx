'use client';

import { ChartData } from '@/types/fostercare';
import styles from './StatsCards.module.css';

interface StatsCardsProps {
  data: ChartData;
}

export default function StatsCards({ data }: StatsCardsProps) {
  const average = Math.round(data.total / data.states.length);
  const highest = data.states.reduce((max, state) =>
    state.children_count > max.children_count ? state : max
  );
  const lowest = data.states.reduce((min, state) =>
    state.children_count < min.children_count ? state : min
  );

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardTitle}>Total Children</div>
        <div className={styles.cardValue}>{data.total.toLocaleString()}</div>
        <div className={styles.cardSubtitle}>Across all states</div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>Average per State</div>
        <div className={styles.cardValue}>{average.toLocaleString()}</div>
        <div className={styles.cardSubtitle}>{data.states.length} states tracked</div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>Highest</div>
        <div className={styles.cardValue}>{highest.children_count.toLocaleString()}</div>
        <div className={styles.cardSubtitle}>{highest.state}</div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>Lowest</div>
        <div className={styles.cardValue}>{lowest.children_count.toLocaleString()}</div>
        <div className={styles.cardSubtitle}>{lowest.state}</div>
      </div>
    </div>
  );
}
