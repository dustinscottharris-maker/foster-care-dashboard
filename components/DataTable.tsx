'use client';

import { useState } from 'react';
import { FosterCareData } from '@/types/fostercare';
import styles from './DataTable.module.css';

interface DataTableProps {
  data: FosterCareData[];
}

export default function DataTable({ data }: DataTableProps) {
  const [sortBy, setSortBy] = useState<'state' | 'count'>('count');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === 'state') {
      return sortOrder === 'asc'
        ? a.state.localeCompare(b.state)
        : b.state.localeCompare(a.state);
    } else {
      return sortOrder === 'asc'
        ? a.children_count - b.children_count
        : b.children_count - a.children_count;
    }
  });

  const handleSort = (column: 'state' | 'count') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Data Table</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.rankHeader}>#</th>
              <th
                className={styles.sortable}
                onClick={() => handleSort('state')}
              >
                State {sortBy === 'state' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className={styles.sortable}
                onClick={() => handleSort('count')}
              >
                Children in Foster Care {sortBy === 'count' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index}>
                <td className={styles.rank}>{index + 1}</td>
                <td className={styles.stateName}>{item.state}</td>
                <td className={styles.count}>{item.children_count.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
