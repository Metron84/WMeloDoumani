'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getLeagueById } from '@/app/actions/league';
import { draftPlayer } from '@/lib/draft-logic';
import { getActivePickerIndex } from '@/lib/draft-utils';
import { players, Position, Player } from '@/data/players';
import { RefreshCw, Search } from 'lucide-react';

export default function DraftRoomPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  
  const [league, setLeague] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [draftingId, setDraftingId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(90);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  
  const [filter, setFilter] = useState<Position | 'ALL'>('ALL');
  const [search, setSearch] = useState('');

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

  useEffect(() => {
    if (league?.status === 'POST_DRAFT') {
      setShowCompleteModal(true);
    }
  }, [league?.status]);

  useEffect(() => {
    if (league?.status === 'POST_DRAFT' || league?.status === 'ACTIVE') return;
    const timerId = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timerId);
  }, [league?.status]);

  useEffect(() => {
    setTimeLeft(90);
  }, [league?.picks?.length]);

  if (loading || !league) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: '#aaa' }}>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .spinner-icon { animation: spin 1s linear infinite; }`}</style>
        <RefreshCw size={48} className="spinner-icon" style={{ marginBottom: '1rem', color: '#00ff88' }} />
        <h2>Entering Draft Room...</h2>
      </div>
    );
  }

  // Derived state
  const isDraftComplete = league.status === 'POST_DRAFT' || league.status === 'ACTIVE';
  const activePickerIdx = isDraftComplete ? -1 : getActivePickerIndex(league.currentPickIndex, league.currentRound, league.maxTeams);
  const activeManager = isDraftComplete ? null : league.managers[activePickerIdx];
  const currentUserIsActive = session && activeManager && (session.user as any).id === activeManager.id;
  
  // Calculate Available Players
  const draftedPlayerIds = new Set(league.picks.map((p: any) => p.playerId));
  const availablePlayers = players.filter(p => !draftedPlayerIds.has(p.id))
    .filter(p => filter === 'ALL' || p.position === filter)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const handleDraft = async (playerId: string) => {
    if (!currentUserIsActive || isDraftComplete) return;
    setDraftingId(playerId);
    try {
      await draftPlayer(league.id, playerId, (session.user as any).id);
      await fetchLeague(); // instantly update
    } catch (e) {
      alert("Error drafting player");
    } finally {
      setDraftingId(null);
    }
  };

  const isDangerTime = timeLeft < 15 && !isDraftComplete;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)', overflow: 'hidden' }}>
      {/* HEADER: Draft Clock */}
      <div style={{ 
        padding: '1rem', 
        marginBottom: '1rem', 
        background: isDangerTime ? 'rgba(255, 77, 77, 0.1)' : 'rgba(26,26,26,0.6)', 
        borderRadius: '16px', 
        border: isDangerTime ? '2px solid #ff4d4d' : '1px solid #333', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        transition: 'all 0.3s',
        animation: isDangerTime ? 'pulse 1s infinite' : 'none'
      }}>
        <style>{`@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(255,77,77,0.4); } 70% { box-shadow: 0 0 0 15px rgba(255,77,77,0); } 100% { box-shadow: 0 0 0 0 rgba(255,77,77,0); } }`}</style>
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isDangerTime ? '#ff4d4d' : '#fff', letterSpacing: '2px' }}>
          {isDraftComplete ? 'DRAFT COMPLETE' : `ON THE CLOCK: ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`}
        </span>
      </div>

      {/* POST DRAFT MODAL */}
      {showCompleteModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="animate-fade-in" style={{ background: '#111', border: '2px solid #00ff88', borderRadius: '16px', padding: '3rem', textAlign: 'center', maxWidth: '500px', boxShadow: '0 0 40px rgba(0,255,136,0.3)' }}>
            <h1 style={{ color: '#00ff88', marginBottom: '1rem', fontSize: '2.5rem' }}>Draft Complete! 🎉</h1>
            <p style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '2rem' }}>
              The war room has officially closed. All rosters are locked in.
            </p>
            <button 
              onClick={() => router.push(`/play/league/${league.id}/team`)}
              style={{ padding: '1rem 2rem', fontSize: '1.2rem', fontWeight: 'bold', background: 'var(--primary-accent)', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', width: '100%', transition: 'all 0.2s' }}
            >
              Go to My Team
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '2rem', flex: 1, overflow: 'hidden' }}>
      
      {/* LEFT COLUMN: Player Pool (30%) */}
      <div style={{ width: '30%', display: 'flex', flexDirection: 'column', background: 'rgba(26,26,26,0.6)', borderRadius: '16px', border: '1px solid #333', padding: '1.5rem', overflow: 'hidden' }}>
        <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Player Pool</h2>
        
        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {['ALL', 'GK', 'DF', 'MF', 'FW'].map(pos => (
            <button 
              key={pos} 
              onClick={() => setFilter(pos as any)}
              style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: 'none', background: filter === pos ? 'var(--primary-accent)' : '#222', color: filter === pos ? '#000' : '#aaa', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              {pos}
            </button>
          ))}
        </div>
        
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
          <input 
            type="text" 
            placeholder="Search players..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid #333', background: '#111', color: '#fff' }}
          />
        </div>

        {/* Player List */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingRight: '0.5rem' }}>
          {availablePlayers.length === 0 && <div style={{ color: '#666', textAlign: 'center', marginTop: '2rem' }}>No players found</div>}
          {availablePlayers.map(p => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#111', borderRadius: '8px', border: '1px solid #222' }}>
              <div>
                <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>{p.name}</div>
                <div style={{ color: '#aaa', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  <span style={{ color: 'var(--primary-accent)', fontWeight: 'bold', marginRight: '0.5rem' }}>{p.position}</span>
                  {p.team}
                </div>
              </div>
              
              {!isDraftComplete && currentUserIsActive ? (
                <button 
                  onClick={() => handleDraft(p.id)}
                  disabled={draftingId === p.id}
                  style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', background: 'var(--primary-accent)', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  {draftingId === p.id ? '...' : 'DRAFT'}
                </button>
              ) : !isDraftComplete ? (
                <span style={{ fontSize: '0.8rem', color: '#555', fontStyle: 'italic', maxWidth: '100px', textAlign: 'right' }}>
                  Waiting for {activeManager?.displayName}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: The Big Board (70%) */}
      <div style={{ width: '70%', display: 'flex', flexDirection: 'column', background: 'rgba(26,26,26,0.6)', borderRadius: '16px', border: '1px solid #333', padding: '1.5rem', overflowX: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#fff', margin: 0 }}>The Big Board</h2>
          {isDraftComplete ? (
            <span style={{ background: '#00ff88', color: '#000', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 'bold' }}>DRAFT COMPLETE</span>
          ) : (
            <span style={{ color: '#00ff88', fontWeight: 'bold', fontSize: '1.1rem' }}>
              Round {league.currentRound} • Pick {league.currentPickIndex + 1}
            </span>
          )}
        </div>

        <div style={{ minWidth: '800px' }}>
          {/* Grid Headers */}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${league.maxTeams}, 1fr)`, gap: '0.5rem', marginBottom: '0.5rem' }}>
            {league.managers.map((manager: any, idx: number) => (
              <div key={manager.id} style={{ padding: '0.75rem', background: '#222', color: '#fff', fontWeight: 'bold', textAlign: 'center', borderRadius: '6px', borderBottom: '3px solid #444' }}>
                {manager.displayName}
              </div>
            ))}
          </div>

          {/* Grid Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {Array.from({ length: league.rosterSize }).map((_, rowIndex) => {
              const round = rowIndex + 1;
              return (
                <div key={round} style={{ display: 'grid', gridTemplateColumns: `repeat(${league.maxTeams}, 1fr)`, gap: '0.5rem' }}>
                  {league.managers.map((manager: any, colIndex: number) => {
                    const pick = league.picks.find((p: any) => p.managerId === manager.id && p.round === round);
                    const draftedPlayer = pick ? players.find(p => p.id === pick.playerId) : null;
                    const isActiveCell = !isDraftComplete && league.currentRound === round && activePickerIdx === colIndex;

                    return (
                      <div 
                        key={manager.id} 
                        style={{ 
                          height: '80px', 
                          background: draftedPlayer ? '#111' : 'rgba(0,0,0,0.2)', 
                          borderRadius: '6px', 
                          border: isActiveCell ? '2px solid #00ff88' : '1px solid #333',
                          boxShadow: isActiveCell ? '0 0 15px rgba(0,255,136,0.3)' : 'none',
                          padding: '0.5rem',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                          transition: 'all 0.3s'
                        }}
                      >
                        {draftedPlayer ? (
                          <>
                            <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.9rem' }}>{draftedPlayer.name}</div>
                            <div style={{ color: 'var(--primary-accent)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{draftedPlayer.position}</div>
                          </>
                        ) : (
                          <span style={{ color: isActiveCell ? '#00ff88' : '#444', fontSize: '0.8rem' }}>
                            {isActiveCell ? 'On the Clock' : `R${round}`}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      </div>
    </div>
  );
}
