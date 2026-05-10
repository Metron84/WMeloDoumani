'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getLeagueById } from '@/app/actions/league';
import { players as staticPlayers } from '@/data/players';
import { calculatePoints, resolveMatchupTie } from '@/lib/scoring-logic';
import { RefreshCw, Swords } from 'lucide-react';

export default function MatchupPage() {
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: 'var(--text-muted)' }}>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .spinner-icon { animation: spin 1s linear infinite; }`}</style>
        <RefreshCw size={40} className="spinner-icon" style={{ marginBottom: '1.25rem', color: 'var(--accent)' }} />
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Entering Matchup Arena...</p>
      </div>
    );
  }

  const userId = (session.user as any).id;
  const currentRound = league.currentRound;

  // Find user's fixture for current round
  const myFixture = league.fixtures?.find((f: any) => 
    f.roundNumber === currentRound && (f.teamAId === userId || f.teamBId === userId)
  );

  if (!myFixture) {
    return (
      <div style={{ textAlign: 'center', marginTop: '4rem', color: '#aaa' }}>
        <Swords size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
        <h2>No Matchup Found</h2>
        <p>You have no active fixture for Round {currentRound}.</p>
      </div>
    );
  }

  const managerA = league.managers.find((m: any) => m.id === myFixture.teamAId);
  const managerB = league.managers.find((m: any) => m.id === myFixture.teamBId);

  // Compile Rosters and Scores
  const compileTeamData = (managerId: string) => {
    const picks = league.picks.filter((p: any) => p.managerId === managerId);
    let totalScore = 0;
    const roster = picks.map((pick: any) => {
      const player = staticPlayers.find(p => p.id === pick.playerId);
      const scoreRecord = league.playerScores?.find((s: any) => s.playerId === pick.playerId);
      const stats = {
        goals: scoreRecord?.goals || 0,
        assists: scoreRecord?.assists || 0,
        rating: scoreRecord?.rating || 0.0,
        manualBonus: scoreRecord?.manualBonus || 0.0,
        status: scoreRecord?.status || 'Upcoming'
      };
      const points = calculatePoints(stats, league);
      totalScore += points;
      return { pickId: pick.id, player, stats, points };
    }).filter((r: any) => r.player);

    roster.sort((a: any, b: any) => b.points - a.points);
    return { roster, totalScore };
  };

  const teamAData = compileTeamData(myFixture.teamAId);
  const teamBData = compileTeamData(myFixture.teamBId);

  // Optional: Apply Tie Breaker if game is over (just visual for now)
  const isTied = teamAData.totalScore === teamBData.totalScore && teamAData.totalScore > 0;
  let tieBreakerWinner = null;
  if (isTied) {
    const winnerLetter = resolveMatchupTie(
      teamAData.roster.map((r: any) => r.stats),
      teamBData.roster.map((r: any) => r.stats)
    );
    tieBreakerWinner = winnerLetter === 'A' ? managerA.displayName : (winnerLetter === 'B' ? managerB.displayName : 'TIE');
  }

  const renderRoster = (data: any, isLeft: boolean) => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {data.roster.map((row: any) => {
        // Flash animation if player is actively scoring
        const isScoring = row.stats.status === 'Playing Now' && row.points > 0;
        
        return (
          <div key={row.pickId} className={isScoring ? 'scoring-flash' : ''} style={{ 
            background: 'rgba(26,26,26,0.6)', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            border: isScoring ? '1px solid #00ff88' : '1px solid #333',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: isLeft ? 'row' : 'row-reverse',
            textAlign: isLeft ? 'left' : 'right',
            transition: 'all 0.3s'
          }}>
            <div>
              <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>{row.player.name}</div>
              <div style={{ color: '#aaa', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                <span style={{ color: 'var(--primary-accent)', fontWeight: 'bold' }}>{row.player.position}</span> • {row.stats.goals}G {row.stats.assists}A
              </div>
            </div>
            <div style={{ 
              color: isScoring ? '#00ff88' : '#fff', 
              fontSize: '1.5rem', 
              fontWeight: 'bold',
              background: isScoring ? 'rgba(0,255,136,0.1)' : '#111',
              padding: '0.5rem 1rem',
              borderRadius: '8px'
            }}>
              {row.points.toFixed(1)}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h3 style={{ color: 'var(--primary-accent)', textTransform: 'uppercase', letterSpacing: '2px', margin: 0, fontSize: '1rem' }}>
          Gameweek {currentRound} Matchup
        </h3>
      </div>

      {/* SCOREBOARD */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', marginBottom: '4rem' }}>
        {/* TEAM A Score */}
        <div style={{ flex: 1, textAlign: 'right' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem', fontFamily: 'Inter, sans-serif' }}>
            {managerA?.displayName}
          </div>
          <div style={{ fontSize: '5.5rem', fontWeight: '900', fontFamily: 'Inter, sans-serif', color: teamAData.totalScore >= teamBData.totalScore ? 'var(--text-primary)' : 'var(--text-muted)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
            {teamAData.totalScore.toFixed(1)}
          </div>
        </div>

        {/* VS Divider */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <Swords size={48} color="var(--primary-accent)" />
          <div style={{ background: '#222', padding: '0.5rem 1rem', borderRadius: '20px', color: '#aaa', fontSize: '0.9rem', fontWeight: 'bold' }}>
            LIVE
          </div>
        </div>

        {/* TEAM B Score */}
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem', fontFamily: 'Inter, sans-serif' }}>
            {managerB?.displayName}
          </div>
          <div style={{ fontSize: '5.5rem', fontWeight: '900', fontFamily: 'Inter, sans-serif', color: teamBData.totalScore >= teamAData.totalScore ? 'var(--text-primary)' : 'var(--text-muted)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
            {teamBData.totalScore.toFixed(1)}
          </div>
        </div>
      </div>

      {isTied && (
        <div style={{ textAlign: 'center', color: '#ff4d4d', fontWeight: 'bold', marginBottom: '2rem', padding: '1rem', border: '1px solid #ff4d4d', borderRadius: '8px', background: 'rgba(255,77,77,0.1)' }}>
          Scores are Tied! Tie-Breaker Advantage: {tieBreakerWinner}
        </div>
      )}

      {/* ROSTERS SPLIT SCREEN */}
      <div style={{ display: 'flex', gap: '2rem' }}>
        {renderRoster(teamAData, true)}
        {renderRoster(teamBData, false)}
      </div>

      <style>{`
        @keyframes flashGreen {
          0% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.7); background: rgba(0,255,136,0.15); }
          50% { box-shadow: 0 0 0 15px rgba(0, 255, 136, 0); background: rgba(26,26,26,0.6); }
          100% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0); background: rgba(0,255,136,0.15); }
        }
        .scoring-flash {
          animation: flashGreen 2s infinite;
        }
      `}</style>
    </div>
  );
}
