'use client';

import React, { useState } from 'react';
import { players } from '@/data/players';
import styles from './admin.module.css';
import { Settings, RefreshCw, X, ShieldAlert, Lock, Unlock } from 'lucide-react';
import TransparencyLog from '@/components/TransparencyLog';
import { useLeague } from '@/context/LeagueContext';

const INITIAL_MANAGERS = [
  { name: 'Burhan', team: [players[0], players[4], players[10]] },
  { name: 'Omar', team: [players[1], players[5], players[11]] },
  { name: 'Seif', team: [players[2], players[6], players[12]] },
  { name: 'Wajed', team: [players[3], players[7], players[13]] },
];

export default function AdminPage() {
  const [managers, setManagers] = useState(INITIAL_MANAGERS);
  const { addLog, leagueStatus, setLeagueStatus } = useLeague();
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState<string | null>(null);
  const [selectedPlayerToAdjust, setSelectedPlayerToAdjust] = useState<string>('');
  
  // Trade State
  const [tradeManager1, setTradeManager1] = useState('');
  const [tradePlayer1, setTradePlayer1] = useState('');
  const [tradeManager2, setTradeManager2] = useState('');
  const [tradePlayer2, setTradePlayer2] = useState('');

  const openAdjustmentModal = (managerName: string) => {
    setSelectedManager(managerName);
    setIsModalOpen(true);
  };

  const handleForceTrade = () => {
    if (!tradeManager1 || !tradePlayer1 || !tradeManager2 || !tradePlayer2) return;
    if (tradeManager1 === tradeManager2) return alert("Select different managers for trade");

    const newManagers = [...managers];
    const m1Index = newManagers.findIndex(m => m.name === tradeManager1);
    const m2Index = newManagers.findIndex(m => m.name === tradeManager2);
    
    const p1Index = newManagers[m1Index].team.findIndex(p => p.id === tradePlayer1);
    const p2Index = newManagers[m2Index].team.findIndex(p => p.id === tradePlayer2);
    
    if (p1Index === -1 || p2Index === -1) return;

    const p1 = newManagers[m1Index].team[p1Index];
    const p2 = newManagers[m2Index].team[p2Index];

    // Swap players
    newManagers[m1Index].team[p1Index] = p2;
    newManagers[m2Index].team[p2Index] = p1;

    setManagers(newManagers);
    addLog(`COMMISH forced trade: Swapped ${p1.name} for ${p2.name} between ${tradeManager1} and ${tradeManager2}`);
    
    // Reset Trade form
    setTradePlayer1('');
    setTradePlayer2('');
    alert("Force Trade Successful!");
  };

  const handleScoreAdjustment = () => {
    if (!selectedPlayerToAdjust) return alert("Select a player");
    const p = players.find(x => x.id === selectedPlayerToAdjust);
    addLog(`COMMISH manually modified scoring for ${p?.name || 'Player'}`);
    alert("Scoring adjustments saved!");
    setIsModalOpen(false);
  };

  const toggleLeagueStatus = () => {
    const newStatus = leagueStatus === 'OPEN' ? 'LOCKED' : 'OPEN';
    setLeagueStatus(newStatus);
    addLog(`COMMISH set League Status to ${newStatus}`);
  };

  return (
    <div className="animate-fade-in">
      <div className={styles.header}>
        <h1 className="heading">Commissioner <span className="heading-accent">Panel</span></h1>
        <p className={styles.subtitle}>Superuser access. Actions taken here bypass standard league rules.</p>
      </div>

      <div className={styles.adminGrid}>
        <div>
          {/* League Status Toggle */}
          <div className={styles.adminCard} style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 className={styles.cardTitle}>
                  {leagueStatus === 'OPEN' ? <Unlock size={24} className={styles.iconAccent} /> : <Lock size={24} style={{ color: '#ff4d4d' }} />}
                  League Status: {leagueStatus}
                </h2>
                <p className={styles.cardDesc} style={{ marginBottom: 0 }}>
                  {leagueStatus === 'OPEN' ? 'Trading and Waivers are active.' : 'Matches are in progress. All user roster moves are disabled.'}
                </p>
              </div>
              <button 
                className={styles.executeTradeBtn} 
                style={{ 
                  width: 'auto', 
                  background: leagueStatus === 'OPEN' ? '#ff4d4d' : 'var(--primary-accent)', 
                  color: '#000',
                  boxShadow: 'none'
                }}
                onClick={toggleLeagueStatus}
              >
                {leagueStatus === 'OPEN' ? 'LOCK LEAGUE' : 'OPEN LEAGUE'}
              </button>
            </div>
          </div>

          {/* Scoring Adjustments Section */}
          <div className={styles.adminCard} style={{ marginBottom: '2rem' }}>
            <h2 className={styles.cardTitle}>
              <ShieldAlert size={24} className={styles.iconAccent} />
              Scoring Adjustments
            </h2>
            <p className={styles.cardDesc}>Manually override points for any manager's player.</p>
            
            <table className={styles.managerTable}>
              <thead>
                <tr>
                  <th>Manager</th>
                  <th>Team Size</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {managers.map(manager => (
                  <tr key={manager.name}>
                    <td className={styles.managerName}>{manager.name}</td>
                    <td>{manager.team.length} Players</td>
                    <td>
                      <button 
                        className={styles.actionBtn}
                        onClick={() => openAdjustmentModal(manager.name)}
                      >
                        <Settings size={16} /> Manual Adjustment
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Force Trade Tool Section */}
          <div className={styles.adminCard}>
            <h2 className={styles.cardTitle}>
              <RefreshCw size={24} className={styles.iconAccent} />
              Force Trade Tool
            </h2>
            <p className={styles.cardDesc}>Instantly swap players between managers, bypassing all match-lock rules.</p>
            
            <div className={styles.tradeForm}>
              <div className={styles.tradeSide}>
                <label>Manager 1</label>
                <select 
                  value={tradeManager1} 
                  onChange={(e) => {
                    setTradeManager1(e.target.value);
                    setTradePlayer1('');
                  }}
                  className={styles.selectInput}
                >
                  <option value="">Select Manager...</option>
                  {managers.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
                </select>

                <label>Player to Give</label>
                <select 
                  value={tradePlayer1} 
                  onChange={(e) => setTradePlayer1(e.target.value)}
                  className={styles.selectInput}
                  disabled={!tradeManager1}
                >
                  <option value="">Select Player...</option>
                  {managers.find(m => m.name === tradeManager1)?.team.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.position})</option>
                  ))}
                </select>
              </div>

              <div className={styles.tradeDivider}>
                <RefreshCw size={32} />
              </div>

              <div className={styles.tradeSide}>
                <label>Manager 2</label>
                <select 
                  value={tradeManager2} 
                  onChange={(e) => {
                    setTradeManager2(e.target.value);
                    setTradePlayer2('');
                  }}
                  className={styles.selectInput}
                >
                  <option value="">Select Manager...</option>
                  {managers.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
                </select>

                <label>Player to Give</label>
                <select 
                  value={tradePlayer2} 
                  onChange={(e) => setTradePlayer2(e.target.value)}
                  className={styles.selectInput}
                  disabled={!tradeManager2}
                >
                  <option value="">Select Player...</option>
                  {managers.find(m => m.name === tradeManager2)?.team.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.position})</option>
                  ))}
                </select>
              </div>
            </div>
            
            <button 
              className={styles.executeTradeBtn}
              onClick={handleForceTrade}
              disabled={!tradePlayer1 || !tradePlayer2}
            >
              Execute Force Trade
            </button>
          </div>
        </div>

        {/* Transparency Log Section */}
        <div>
          <TransparencyLog />
        </div>
      </div>

      {/* Override Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Adjust Scoring: {selectedManager}</h3>
              <button className={styles.closeModal} onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <label>Select Player</label>
              <select 
                className={styles.selectInput}
                value={selectedPlayerToAdjust}
                onChange={e => setSelectedPlayerToAdjust(e.target.value)}
              >
                <option value="">Choose a player to adjust...</option>
                {managers.find(m => m.name === selectedManager)?.team.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>

              <div className={styles.adjustmentGrid}>
                <div className={styles.adjustItem}>
                  <label>Goals Override</label>
                  <input type="number" placeholder="0" className={styles.numberInput} />
                </div>
                <div className={styles.adjustItem}>
                  <label>Assists Override</label>
                  <input type="number" placeholder="0" className={styles.numberInput} />
                </div>
                <div className={styles.adjustItem}>
                  <label>Manual Bonus Pts</label>
                  <input type="number" placeholder="0" className={styles.numberInput} />
                </div>
              </div>
              
              <button className={styles.saveAdjustBtn} onClick={handleScoreAdjustment}>
                Apply Override
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
