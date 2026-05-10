'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getLeagueById } from '@/app/actions/league';
import { players as staticPlayers } from '@/data/players';
import { calculatePoints } from '@/lib/scoring-logic';
import { RefreshCw, TrendingUp } from 'lucide-react';

export default function MyTeamPage() {
  const params = useParams();
  const { data: session } = useSession();
  const [league, setLeague] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading || !league || !session) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .spinner-icon { animation: spin 1s linear infinite; }`}</style>
        <RefreshCw size={40} className="spinner-icon" style={{ marginBottom: '1.25rem', color: 'var(--accent)' }} />
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Loading Portfolio...</p>
      </div>
    );
  }

  const userId = (session.user as any).id;
  const myPicks = league.picks.filter((p: any) => p.managerId === userId);

  const rosterData = myPicks.map((pick: any) => {
    const player = staticPlayers.find(p => p.id === pick.playerId);
    const scoreRecord = league.playerScores?.find((s: any) => s.playerId === pick.playerId);
    const stats = { goals: scoreRecord?.goals || 0, assists: scoreRecord?.assists || 0, rating: scoreRecord?.rating || 0.0, manualBonus: scoreRecord?.manualBonus || 0.0, status: scoreRecord?.status || 'Upcoming' };
    const points = calculatePoints(stats, league);
    return { pickId: pick.id, player, stats, points };
  }).filter((r: any) => r.player);

  rosterData.sort((a: any, b: any) => b.points - a.points);
  const totalTeamScore = rosterData.reduce((acc: number, curr: any) => acc + curr.points, 0);

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <p className="heading-sub" style={{ marginBottom: '0.75rem' }}>
            <TrendingUp size={12} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
            {league.name}
          </p>
          <h1 className="heading">
            My <span className="heading-accent">Portfolio</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontFamily: 'Inter, sans-serif' }}>Live performance data · sorted by points</p>
        </div>

        {/* Score Summary */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'stretch', flexWrap: 'wrap' }}>
          <div style={{ padding: '1rem 1.5rem', border: '1px solid var(--border)', borderRadius: '10px', background: 'var(--surface)', textAlign: 'center', minWidth: '110px' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>Roster</div>
            <div style={{ color: 'var(--text-primary)', fontWeight: '700', fontSize: '1.35rem', fontVariantNumeric: 'tabular-nums' }}>{myPicks.length}<span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '400' }}>/{league.rosterSize}</span></div>
          </div>
          <div style={{ padding: '1rem 1.5rem', border: '1px solid var(--accent)', borderRadius: '10px', background: 'var(--accent-subtle)', textAlign: 'center', minWidth: '130px' }}>
            <div style={{ color: 'var(--accent)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>Total Score</div>
            <div style={{ color: 'var(--accent)', fontWeight: '800', fontSize: '1.75rem', fontVariantNumeric: 'tabular-nums' }}>{totalTeamScore.toFixed(1)}</div>
          </div>
        </div>
      </div>

      {/* Roster Data Table */}
      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Player</th>
              <th>Club</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>G</th>
              <th style={{ textAlign: 'center' }}>A</th>
              <th style={{ textAlign: 'center' }}>Rating</th>
              <th style={{ textAlign: 'right', color: 'var(--accent)' }}>Pts</th>
            </tr>
          </thead>
          <tbody>
            {rosterData.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  No players drafted yet.
                </td>
              </tr>
            ) : (
              rosterData.map((row: any) => {
                const isPlaying = row.stats.status === 'Playing Now';
                const isHighRating = row.stats.rating >= 7.5;

                return (
                  <tr key={row.pickId} onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = 'var(--surface)'} onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}>
                    <td>
                      <div style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.95rem' }}>{row.player.name}</div>
                      <div style={{ marginTop: '0.3rem' }}>
                        <span className={`pos-chip pos-${row.player.position}`}>{row.player.position}</span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{row.player.team}</td>
                    <td>
                      {isPlaying ? (
                        <span className="status-live">Live</span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{row.stats.status}</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'center', color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums', fontWeight: '500' }}>{row.stats.goals}</td>
                    <td style={{ textAlign: 'center', color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums', fontWeight: '500' }}>{row.stats.assists}</td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{ color: isHighRating ? 'var(--gold)' : 'var(--text-secondary)', fontWeight: isHighRating ? '700' : '400', fontVariantNumeric: 'tabular-nums' }}>
                        {row.stats.rating > 0 ? row.stats.rating.toFixed(1) : '—'}
                      </span>
                    </td>
                    <td className="score-cell" style={{ textAlign: 'right', fontSize: '1.1rem' }}>{row.points.toFixed(1)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
