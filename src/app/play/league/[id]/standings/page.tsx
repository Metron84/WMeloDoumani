'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getLeagueById } from '@/app/actions/league';
import { players } from '@/data/players';
import { calculatePoints } from '@/lib/scoring-logic';
import { RefreshCw, ChevronDown, ChevronUp, Trophy } from 'lucide-react';

export default function StandingsPage() {
  const params = useParams();
  const [league, setLeague] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expandedManager, setExpandedManager] = useState<string | null>(null);

  const fetchLeague = async () => {
    if (params.id) {
      const data = await getLeagueById(params.id as string);
      setLeague(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeague();
    const intervalId = setInterval(fetchLeague, 3000);
    return () => clearInterval(intervalId);
  }, [params.id]);

  if (loading || !league) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: 'var(--text-muted)' }}>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .spinner-icon { animation: spin 1s linear infinite; }`}</style>
        <RefreshCw size={40} className="spinner-icon" style={{ marginBottom: '1.25rem', color: 'var(--accent)' }} />
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Loading Standings...</p>
      </div>
    );
  }

  const enrichedManagers = league.managers.map((m: any) => {
    const managerPicks = league.picks.filter((p: any) => p.managerId === m.id);
    let totalGoals = 0, totalAssists = 0, totalPoints = 0;
    managerPicks.forEach((pick: any) => {
      const scoreRecord = league.playerScores?.find((s: any) => s.playerId === pick.playerId);
      const stats = { goals: scoreRecord?.goals || 0, assists: scoreRecord?.assists || 0, rating: scoreRecord?.rating || 0.0, manualBonus: scoreRecord?.manualBonus || 0.0, status: scoreRecord?.status || 'Upcoming' };
      totalGoals += stats.goals;
      totalAssists += stats.assists;
      totalPoints += calculatePoints(stats, league);
    });
    return { ...m, totalGoals, totalAssists, totalPoints };
  });

  const sortedManagers = enrichedManagers.sort((a: any, b: any) => b.totalPoints - a.totalPoints);
  const toggleExpand = (managerId: string) => setExpandedManager(prev => prev === managerId ? null : managerId);

  const rankColors = ['var(--gold)', 'var(--text-secondary)', '#CD7F32'];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '3rem' }}>
        <p className="heading-sub" style={{ marginBottom: '0.75rem' }}>
          <Trophy size={12} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
          {league.name}
        </p>
        <h1 className="heading">
          Live <span className="heading-accent">Standings</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontFamily: 'Inter, sans-serif' }}>
          Click a manager row to scout their full roster
        </p>
      </div>

      {/* Leaderboard Table */}
      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>#</th>
              <th>Manager</th>
              <th style={{ textAlign: 'center' }}>Goals</th>
              <th style={{ textAlign: 'center' }}>Assists</th>
              <th style={{ textAlign: 'right', color: 'var(--accent)' }}>Pts</th>
              <th style={{ width: '48px' }}></th>
            </tr>
          </thead>
          <tbody>
            {sortedManagers.map((manager: any, index: number) => {
              const isExpanded = expandedManager === manager.id;
              const managerPicks = league.picks.filter((p: any) => p.managerId === manager.id);
              const rankColor = rankColors[index] || 'var(--text-muted)';

              return (
                <React.Fragment key={manager.id}>
                  <tr
                    onClick={() => toggleExpand(manager.id)}
                    style={{
                      borderBottom: isExpanded ? 'none' : '1px solid var(--border)',
                      background: isExpanded ? 'var(--accent-subtle)' : 'transparent',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => { if (!isExpanded) (e.currentTarget as HTMLTableRowElement).style.background = 'var(--surface)'; }}
                    onMouseLeave={e => { if (!isExpanded) (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'; }}
                  >
                    <td className="rank-cell" style={{ color: rankColor, fontWeight: index < 3 ? '800' : '500', fontSize: index < 3 ? '1rem' : '0.85rem' }}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                    </td>
                    <td style={{ fontWeight: '600', fontSize: '1rem', color: 'var(--text-primary)' }}>{manager.displayName}</td>
                    <td style={{ textAlign: 'center', color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>{manager.totalGoals}</td>
                    <td style={{ textAlign: 'center', color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>{manager.totalAssists}</td>
                    <td className="score-cell" style={{ textAlign: 'right', fontSize: '1.15rem' }}>{manager.totalPoints.toFixed(1)}</td>
                    <td style={{ textAlign: 'right', color: 'var(--text-muted)', paddingRight: '1.5rem' }}>
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <td colSpan={6} style={{ padding: '1.5rem 2rem', background: 'var(--surface)' }}>
                        <p className="section-label" style={{ marginBottom: '1rem' }}>{manager.displayName}'s Squad</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
                          {managerPicks.length === 0 ? (
                            <div style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No players drafted yet.</div>
                          ) : (
                            managerPicks.map((pick: any) => {
                              const player = players.find(p => p.id === pick.playerId);
                              const scoreRecord = league.playerScores?.find((s: any) => s.playerId === pick.playerId);
                              const stats = { goals: scoreRecord?.goals || 0, assists: scoreRecord?.assists || 0, rating: scoreRecord?.rating || 0.0, manualBonus: scoreRecord?.manualBonus || 0.0, status: scoreRecord?.status || 'Upcoming' };
                              const playerPoints = calculatePoints(stats, league);
                              if (!player) return null;
                              const isLive = stats.status === 'Playing Now';
                              return (
                                <div key={pick.id} style={{ background: 'var(--surface-raised)', padding: '1rem', borderRadius: '8px', border: isLive ? '1px solid var(--accent)' : '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <div>
                                    <div style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.9rem' }}>{player.name}</div>
                                    <div style={{ marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                      <span className={`pos-chip pos-${player.position}`}>{player.position}</span>
                                      {isLive && <span className="status-live">Live</span>}
                                    </div>
                                  </div>
                                  <div style={{ color: 'var(--accent)', fontWeight: '700', fontSize: '1.05rem', fontVariantNumeric: 'tabular-nums' }}>{playerPoints.toFixed(1)}</div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Transparency Feed */}
      <div className="card" style={{ marginTop: '3rem' }}>
        <div className="card-header">
          <h3 style={{ margin: 0, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '8px', height: '8px', background: 'var(--danger)', borderRadius: '50%', display: 'inline-block' }} />
            Transparency Feed
          </h3>
          <span className="heading-sub">Commissioner Log</span>
        </div>
        <div className="card-body" style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {!league.auditLogs || league.auditLogs.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', padding: '2rem 0' }}>No administrative actions recorded yet.</div>
          ) : (
            league.auditLogs.map((log: any) => (
              <div key={log.id} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', whiteSpace: 'nowrap', paddingTop: '0.15rem', fontVariantNumeric: 'tabular-nums' }}>
                  {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>{log.message}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
