'use client';

import React from 'react';
import TransparencyLog from '@/components/TransparencyLog';
import styles from './standings.module.css';
import { useLeague } from '@/context/LeagueContext';
import { Lock, Unlock } from 'lucide-react';

export default function StandingsPage() {
  const { leagueStatus } = useLeague();

  return (
    <div className="animate-fade-in">
      <div className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="heading">League <span className="heading-accent">Standings</span></h1>
          <p className={styles.subtitle}>
            Current team rankings will be updated live as match weeks progress.
          </p>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem', 
          background: 'rgba(0,0,0,0.3)', 
          padding: '0.75rem 1.25rem', 
          borderRadius: '8px', 
          border: '1px solid var(--border-color)',
          boxShadow: leagueStatus === 'OPEN' ? '0 0 15px rgba(0, 255, 136, 0.1)' : '0 0 15px rgba(255, 77, 77, 0.1)'
        }}>
          {leagueStatus === 'OPEN' ? <Unlock size={20} color="var(--primary-accent)" /> : <Lock size={20} color="#ff4d4d" />}
          <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: leagueStatus === 'OPEN' ? 'var(--primary-accent)' : '#ff4d4d' }}>
            {leagueStatus === 'OPEN' ? 'LEAGUE OPEN' : 'LEAGUE LOCKED'}
          </span>
        </div>
      </div>
      
      <div className={styles.contentGrid}>
        <div className={styles.standingsCard}>
          <table className={styles.standingsTable}>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Manager</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><div className={styles.rankBadge + ' ' + styles.first}>1</div></td>
                <td className={styles.managerName}>Burhan</td>
                <td className={styles.points}>0</td>
              </tr>
              <tr>
                <td><div className={styles.rankBadge}>2</div></td>
                <td className={styles.managerName}>Omar</td>
                <td className={styles.points}>0</td>
              </tr>
              <tr>
                <td><div className={styles.rankBadge}>3</div></td>
                <td className={styles.managerName}>Seif</td>
                <td className={styles.points}>0</td>
              </tr>
              <tr>
                <td><div className={styles.rankBadge}>4</div></td>
                <td className={styles.managerName}>Wajed</td>
                <td className={styles.points}>0</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.logSection}>
          <TransparencyLog />
        </div>
      </div>
    </div>
  );
}
