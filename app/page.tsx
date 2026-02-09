'use client';

import { useEffect, useState } from 'react';
import { FosterCareData, ChartData } from '@/types/fostercare';
import BarChart from '@/components/BarChart';
import StateMap from '@/components/StateMap';
import StatsCards from '@/components/StatsCards';
import DataTable from '@/components/DataTable';
import styles from './page.module.css';

export default function Home() {
  const [data, setData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'chart' | 'map' | 'table'>('chart');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/data');
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading foster care data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Error Loading Data</h2>
          <p>{error}</p>
          <button onClick={fetchData} className={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data || !data.states || data.states.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.noData}>No foster care data available</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Foster Care Dashboard</h1>
        <p className={styles.subtitle}>Children in Foster Care by State</p>
      </header>

      <StatsCards data={data} />

      <nav className={styles.viewToggle}>
        <button
          className={view === 'chart' ? styles.active : ''}
          onClick={() => setView('chart')}
        >
          Bar Chart
        </button>
        <button
          className={view === 'map' ? styles.active : ''}
          onClick={() => setView('map')}
        >
          Map View
        </button>
        <button
          className={view === 'table' ? styles.active : ''}
          onClick={() => setView('table')}
        >
          Data Table
        </button>
      </nav>

      <main className={styles.main}>
        {view === 'chart' && <BarChart data={data.states} />}
        {view === 'map' && <StateMap data={data.states} />}
        {view === 'table' && <DataTable data={data.states} />}
      </main>

      <footer className={styles.footer}>
        <p>Last Updated: {data.lastUpdated ? new Date(data.lastUpdated).toLocaleDateString() : 'N/A'}</p>
      </footer>
    </div>
  );
}
