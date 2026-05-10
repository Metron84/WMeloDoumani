'use client';

import React, { useState, useEffect } from 'react';
import { Player, players as initialPlayers, Position } from '@/data/players';
import styles from './draft.module.css';
import { getDraftManagers } from '@/app/actions/draft';

const ROUNDS = 12;

export default function DraftRoom() {
  const [managers, setManagers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [availablePlayers, setAvailablePlayers] = useState<Player[]>(initialPlayers);
  const [draftBoard, setDraftBoard] = useState<(Player | null)[][]>([]);
  
  const [currentRound, setCurrentRound] = useState(0); // 0-indexed
  const [currentPick, setCurrentPick] = useState(0);   // 0-indexed manager
  const [positionFilter, setPositionFilter] = useState<'ALL' | Position>('ALL');

  useEffect(() => {
    async function loadManagers() {
      const dbManagers = await getDraftManagers();
      // Use DB managers, or default to placeholder if empty
      const activeManagers = dbManagers.length > 0 ? dbManagers : ['No managers joined yet'];
      setManagers(activeManagers);
      setDraftBoard(Array(ROUNDS).fill(null).map(() => Array(activeManagers.length).fill(null)));
      setLoading(false);
    }
    loadManagers();
  }, []);

  const draftPlayer = (player: Player) => {
    if (managers[0] === 'No managers joined yet') return alert("Waiting for managers to join!");
    if (currentRound >= ROUNDS) return; // Draft is over

    // Remove from available
    setAvailablePlayers(prev => prev.filter(p => p.id !== player.id));

    // Add to board
    const newBoard = [...draftBoard];
    newBoard[currentRound] = [...newBoard[currentRound]];
    newBoard[currentRound][currentPick] = player;
    setDraftBoard(newBoard);

    // Advance turn
    if (currentPick === managers.length - 1) {
      setCurrentPick(0);
      setCurrentRound(prev => prev + 1);
    } else {
      setCurrentPick(prev => prev + 1);
    }
  };

  const filteredPlayers = availablePlayers.filter(
    p => positionFilter === 'ALL' || p.position === positionFilter
  );

  if (loading) {
    return <div className="animate-fade-in"><h1 className="heading">Connecting to <span className="heading-accent">War Room...</span></h1></div>;
  }

  return (
    <div className={styles.draftContainer}>
      {/* Draft Board Main Area */}
      <div className={styles.mainBoard}>
        <div className={styles.header}>
          <h1 className="heading">Draft <span className="heading-accent">War Room</span></h1>
          {currentRound < ROUNDS ? (
            <div className={styles.turnIndicator}>
              On the clock: <span className={styles.activeManager}>{managers[currentPick]}</span> (Round {currentRound + 1})
            </div>
          ) : (
            <div className={styles.turnIndicator}>Draft Complete</div>
          )}
        </div>

        <div className={styles.gridWrapper}>
          <div className={styles.draftGrid} style={{ gridTemplateColumns: `80px repeat(${managers.length}, 1fr)` }}>
            {/* Header Row */}
            <div className={styles.gridHeaderCell}>Round</div>
            {managers.map((manager, idx) => (
              <div 
                key={manager} 
                className={`${styles.gridHeaderCell} ${currentPick === idx && currentRound < ROUNDS ? styles.activeColumn : ''}`}
              >
                {manager}
              </div>
            ))}

            {/* Rounds */}
            {Array.from({ length: ROUNDS }).map((_, rIdx) => (
              <React.Fragment key={rIdx}>
                <div className={styles.roundCell}>{rIdx + 1}</div>
                {managers.map((_, mIdx) => {
                  const pick = draftBoard[rIdx] ? draftBoard[rIdx][mIdx] : null;
                  const isActive = currentRound === rIdx && currentPick === mIdx;
                  return (
                    <div key={`${rIdx}-${mIdx}`} className={`${styles.pickCell} ${isActive ? styles.activePick : ''}`}>
                      {pick ? (
                        <div className={styles.playerCard}>
                          <div className={styles.playerName}>{pick.name}</div>
                          <div className={styles.playerDetails}>
                            <span className={styles.posLabel} data-pos={pick.position}>{pick.position}</span>
                            <span className={styles.teamLabel}>{pick.team}</span>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.emptyPick}>-</div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Available Players Sidebar */}
      <div className={styles.playerSidebar}>
        <h2 className={styles.sidebarTitle}>Available Players</h2>
        <div className={styles.filters}>
          {['ALL', 'GK', 'DF', 'MF', 'FW'].map(pos => (
            <button 
              key={pos}
              className={`${styles.filterBtn} ${positionFilter === pos ? styles.activeFilter : ''}`}
              onClick={() => setPositionFilter(pos as any)}
            >
              {pos}
            </button>
          ))}
        </div>
        
        <div className={styles.playerList}>
          {filteredPlayers.length > 0 ? filteredPlayers.map(player => (
            <div key={player.id} className={styles.availablePlayerCard} onClick={() => draftPlayer(player)}>
              <div className={styles.availableHeader}>
                <span className={styles.posBadge} data-pos={player.position}>{player.position}</span>
                <span className={styles.playerName}>{player.name}</span>
              </div>
              <div className={styles.teamLabel}>{player.team}</div>
              <button className={styles.draftBtn}>Draft</button>
            </div>
          )) : (
            <div className={styles.noPlayers}>No players available.</div>
          )}
        </div>
      </div>
    </div>
  );
}
