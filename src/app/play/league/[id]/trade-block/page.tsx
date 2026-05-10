'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getLeagueById } from '@/app/actions/league';
import { getLeagueTransactions, proposeTrade, claimFreeAgent } from '@/app/actions/trades';
import { declareInterestChat } from '@/app/actions/chat';
import { players as staticPlayers } from '@/data/players';
import { RefreshCw, ArrowRightLeft, UserPlus, AlertCircle } from 'lucide-react';

export default function TradeBlockPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  
  const [league, setLeague] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'TRADE' | 'FA'>('TRADE');
  
  const [proposeModalOpen, setProposeModalOpen] = useState(false);
  const [tradeTargetPlayer, setTradeTargetPlayer] = useState<any>(null);
  const [tradeTargetManager, setTradeTargetManager] = useState<any>(null);
  const [mySelectedPlayerId, setMySelectedPlayerId] = useState<string>('');

  const fetchLeague = async () => {
    if (params.id) {
      const data = await getLeagueById(params.id as string);
      const txs = await getLeagueTransactions(params.id as string);
      setLeague(data);
      setTransactions(txs);
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: '#aaa' }}>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .spinner-icon { animation: spin 1s linear infinite; }`}</style>
        <RefreshCw size={48} className="spinner-icon" style={{ marginBottom: '1rem', color: '#00ff88' }} />
        <h2>Loading Market Data...</h2>
      </div>
    );
  }

  const currentUserId = (session.user as any).id;
  const isMarketOpen = league.tradeStatus === 'OPEN';

  // 1. Calculate Free Agents
  const draftedIds = new Set(league.picks.map((p: any) => p.playerId));
  const availablePlayers = staticPlayers.filter(p => !draftedIds.has(p.id));

  // 2. Cap Logic (uses dynamic waiverCap from league)
  const waiverCap = league.waiverCap ?? 2;
  const myRecentClaims = transactions.filter((tx: any) => tx.managerId === currentUserId && tx.round === league.currentRound && tx.type === 'CLAIM');
  const hasReachedCap = myRecentClaims.length >= waiverCap;

  // Handlers
  const handleClaim = async (playerId: string) => {
    try {
      await claimFreeAgent(league.id, playerId);
      await fetchLeague();
    } catch (e: any) {
      alert(e.message || "Failed to claim player.");
    }
  };

  const handleInterest = async (targetUserId: string, playerId: string, playerName: string) => {
    try {
      await declareInterestChat(league.id, targetUserId, playerId, playerName);
      router.push(`/play/league/${league.id}/messages`);
    } catch (e) {
      alert("Failed to declare interest.");
    }
  };

  const openTradeModal = (manager: any, player: any) => {
    setTradeTargetManager(manager);
    setTradeTargetPlayer(player);
    setProposeModalOpen(true);
  };

  const submitTrade = async () => {
    if (!mySelectedPlayerId) return alert("Select a player to offer.");
    try {
      await proposeTrade(league.id, tradeTargetManager.id, mySelectedPlayerId, tradeTargetPlayer.id);
      alert("Official Trade Proposed! Notification sent.");
      setProposeModalOpen(false);
    } catch (e) {
      alert("Trade proposal failed.");
    }
  };

  const myPicks = league.picks.filter((p: any) => p.managerId === currentUserId);

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <p className="heading-sub" style={{ marginBottom: '0.75rem' }}>Transfer Market</p>
        <h1 className="heading">
          The <span className="heading-accent">Market</span>
        </h1>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #333' }}>
        <button 
          onClick={() => setActiveTab('TRADE')}
          style={{ padding: '1rem 2rem', background: 'transparent', border: 'none', borderBottom: activeTab === 'TRADE' ? '3px solid #00ff88' : '3px solid transparent', color: activeTab === 'TRADE' ? '#fff' : '#888', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.2s' }}
        >
          <ArrowRightLeft size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
          Trade Block
        </button>
        <button 
          onClick={() => setActiveTab('FA')}
          style={{ padding: '1rem 2rem', background: 'transparent', border: 'none', borderBottom: activeTab === 'FA' ? '3px solid #00ff88' : '3px solid transparent', color: activeTab === 'FA' ? '#fff' : '#888', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.2s' }}
        >
          <UserPlus size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
          Free Agents
        </button>
      </div>

      {!isMarketOpen && (
        <div style={{ background: 'rgba(255, 165, 0, 0.1)', border: '1px solid orange', padding: '1rem', borderRadius: '8px', color: 'orange', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <AlertCircle /> Market Locked: Matches in Progress. Official trades and claims are disabled. You may still "Declare Interest".
        </div>
      )}

      {activeTab === 'TRADE' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {league.managers.filter((m: any) => m.id !== currentUserId).map((manager: any) => {
            const mPicks = league.picks.filter((p: any) => p.managerId === manager.id);
            return (
              <div key={manager.id} style={{ background: 'rgba(26,26,26,0.6)', borderRadius: '16px', border: '1px solid #333', padding: '1.5rem', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}>
                <h3 style={{ color: '#00ff88', marginBottom: '1rem', borderBottom: '1px solid #222', paddingBottom: '0.5rem' }}>{manager.displayName}'s Team</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                  {mPicks.map((pick: any) => {
                    const player = staticPlayers.find(p => p.id === pick.playerId);
                    if (!player) return null;
                    return (
                      <div key={pick.id} style={{ background: '#111', padding: '1rem', borderRadius: '8px', border: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ color: '#fff', fontWeight: 'bold' }}>{player.name}</div>
                          <div style={{ color: 'var(--primary-accent)', fontSize: '0.8rem' }}>{player.position}</div>
                        </div>
                        {isMarketOpen ? (
                          <button onClick={() => openTradeModal(manager, player)} style={{ padding: '0.5rem 1rem', background: 'transparent', color: '#00ff88', border: '1px solid #00ff88', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold', transition: 'all 0.2s' }}>Propose Trade</button>
                        ) : (
                          <button onClick={() => handleInterest(manager.id, player.id, player.name)} style={{ padding: '0.5rem 1rem', background: 'transparent', color: 'orange', border: '1px solid orange', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold', transition: 'all 0.2s' }}>Declare Interest</button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'FA' && (
        <div style={{ background: 'rgba(26,26,26,0.6)', borderRadius: '16px', border: '1px solid #333', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ color: '#fff', margin: 0, fontSize: '1.2rem' }}>Available Players</h3>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {waiverCap >= 15 && (
                <span style={{ color: '#ff4d4d', fontWeight: 'bold', fontSize: '0.85rem', background: 'rgba(255,77,77,0.1)', padding: '0.35rem 0.75rem', borderRadius: '20px', border: '1px solid #ff4d4d' }}>⚡ WILDCARD ACTIVE</span>
              )}
              <span style={{ color: hasReachedCap ? '#ff4d4d' : '#00ff88', fontWeight: 'bold' }}>Weekly Claims: {myRecentClaims.length}/{waiverCap >= 15 ? '∞' : waiverCap}</span>
            </div>
          </div>
          <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
            {availablePlayers.map(player => (
              <div key={player.id} style={{ background: '#111', padding: '1rem', borderRadius: '8px', border: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>{player.name}</div>
                  <div style={{ color: '#aaa', fontSize: '0.85rem', marginTop: '0.25rem' }}>{player.team} • <span style={{ color: 'var(--primary-accent)' }}>{player.position}</span></div>
                </div>
                {!isMarketOpen ? (
                  <span style={{ color: '#ff4d4d', fontSize: '0.8rem', fontStyle: 'italic', background: 'rgba(255,77,77,0.1)', padding: '0.5rem', borderRadius: '4px' }}>Market Locked</span>
                ) : hasReachedCap ? (
                  <span style={{ color: '#ff4d4d', fontSize: '0.8rem', fontWeight: 'bold', background: 'rgba(255,77,77,0.1)', padding: '0.5rem', borderRadius: '4px' }}>Cap Reached</span>
                ) : (
                  <button onClick={() => handleClaim(player.id)} style={{ padding: '0.5rem 1.5rem', background: 'var(--primary-accent)', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', transition: 'transform 0.2s' }}>Claim</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trade Proposal Modal */}
      {proposeModalOpen && tradeTargetPlayer && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="animate-fade-in" style={{ background: '#111', border: '1px solid #333', borderRadius: '16px', padding: '2rem', maxWidth: '500px', width: '100%', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
            <h2 style={{ color: '#fff', marginBottom: '1.5rem', borderBottom: '1px solid #222', paddingBottom: '1rem' }}>Propose Trade to {tradeTargetManager?.displayName}</h2>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ color: '#aaa', marginBottom: '0.5rem' }}>Target Player:</div>
              <div style={{ padding: '1rem', background: 'rgba(0,255,136,0.1)', borderRadius: '8px', border: '1px solid #00ff88', color: '#00ff88', fontWeight: 'bold', fontSize: '1.2rem' }}>{tradeTargetPlayer.name}</div>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ color: '#aaa', marginBottom: '0.5rem' }}>Select a player to offer:</div>
              <select 
                value={mySelectedPlayerId} 
                onChange={(e) => setMySelectedPlayerId(e.target.value)}
                style={{ width: '100%', padding: '1rem', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer' }}
              >
                <option value="">-- Choose a Player --</option>
                {myPicks.map((pick: any) => {
                  const p = staticPlayers.find(x => x.id === pick.playerId);
                  return <option key={pick.id} value={p?.id}>{p?.name} ({p?.position})</option>;
                })}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setProposeModalOpen(false)} style={{ flex: 1, padding: '1rem', background: '#222', color: '#aaa', border: '1px solid #444', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
              <button onClick={submitTrade} style={{ flex: 1, padding: '1rem', background: 'var(--primary-accent)', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Send Official Offer</button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
