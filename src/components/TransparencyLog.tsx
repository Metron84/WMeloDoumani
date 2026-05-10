'use client';

import React from 'react';
import { useLeague } from '@/context/LeagueContext';
import styles from './TransparencyLog.module.css';
import { Activity } from 'lucide-react';

export default function TransparencyLog() {
  const { logs } = useLeague();

  return (
    <div className={styles.logContainer}>
      <div className={styles.header}>
        <Activity size={20} className={styles.icon} />
        <h3>Transparency Log</h3>
      </div>
      <div className={styles.feed}>
        {logs.length === 0 ? (
          <p className={styles.empty}>No admin actions have been taken.</p>
        ) : (
          logs.map(log => (
            <div key={log.id} className={styles.logEntry}>
              <span className={styles.timestamp}>[{log.timestamp}]</span>
              <span className={styles.message}>{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
