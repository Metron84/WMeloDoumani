'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getLeagueById } from '@/app/actions/league';
import { toggleMarketStatus, injectScore, forceTrade, generateLeagueSchedule, toggleKnockoutWildcard } from '@/app/actions/admin';
import { executeSeed } from '@/app/actions/seed-players';
import { players as staticPlayers } from '@/data/players';
import { RefreshCw, Lock, Unlock, Zap, ArrowRightLeft, Calendar, Database } from 'lucide-react';

export default function AdminDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  
  const [league, setLeague] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  // Score Injector State
  const [injManagerId, setInjManagerId] = useState('');
  const [injPlayerId, setInjPlayerId] = useState('');
  const [injStatType, setInjStatType] = useState<'goals' | 'assists' | 'manualBonus'>('goals');
  const [injAmount, setInjAmount] = useState<number>(1);
  const [isInjecting, setIsInjecting] = useState(false);

  // Force Trade State
  const [tradeManagerA, setTradeManagerA] = useState('');
  const [tradePlayerA, setTradePlayerA] = useState('');
  const [tradeManagerB, setTradeManagerB] = useState('');
  const [tradePlayerB, setTradePlayerB] = useState('');
  const [isTrading, setIsTrading] = useState(false);

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
    if (!loading && league && session) {
      const userId = (session.user as any).id;
      if (league.commissionerId !== userId) {
        router.push(`/play/league/${league.id}/standings`);
      }
    }
  }, [loading, league, session, router]);

  if (loading || !league || !session || league.commissionerId !== (session.user as any).id) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: '#aaa' }}>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .spinner-icon { animation: spin 1s linear infinite; }`}</style>
        <RefreshCw size={48} className="spinner-icon" style={{ marginBottom: '1rem', color: '#00ff88' }} />
        <h2>Verifying Credentials...</h2>
      </div>
    );
  }

  const handleToggleMarket = async () => {
    const isCurrentlyLocked = league.tradeStatus === 'LOCKED';
    const newStatus = isCurrentlyLocked ? 'OPEN' : 'LOCKED';
    
    if (newStatus === 'LOCKED') {
      const confirm = window.confirm("Are you sure? This will freeze all transactions until matches conclude.");
      if (!confirm) return;
    }

    setIsToggling(true);
    try {
      await toggleMarketStatus(league.id, newStatus);
      await fetchLeague();
    } catch (e: any) {
      alert(e.message || "Failed to update market status.");
    } finally {
      setIsToggling(false);
    }
  };

  const handleInjectScore = async () => {
    if (!injManagerId || !injPlayerId || !injAmount) return alert("Please fill all fields.");
    setIsInjecting(true);
    try {
      await injectScore(league.id, injPlayerId, injStatType, injAmount);
      alert("Score Injected! Audit log generated.");
      setInjPlayerId('');
      await fetchLeague();
    } catch (e: any) {
      alert(e.message || "Failed to inject score.");
    } finally {
      setIsInjecting(false);
    }
  };

  const handleForceTrade = async () => {
    if (!tradeManagerA || !tradePlayerA || !tradeManagerB || !tradePlayerB) return alert("Please fill all fields.");
    if (tradeManagerA === tradeManagerB) return alert("Cannot trade with the same manager.");
    
    const confirm = window.confirm("Execute forced trade? This will bypass user approval and alter rosters immediately.");
    if (!confirm) return;

    setIsTrading(true);
    try {
      await forceTrade(league.id, tradeManagerA, tradePlayerA, tradeManagerB, tradePlayerB);
      alert("Force Trade Executed! Audit log generated.");
      setTradePlayerA('');
      setTradePlayerB('');
      await fetchLeague();
    } catch (e: any) {
      alert(e.message || "Failed to force trade.");
    } finally {
      setIsTrading(false);
    }
  };

  const isLocked = league.tradeStatus === 'LOCKED';
  const hasSchedule = league.fixtures && league.fixtures.length > 0;
  const isWildcardActive = league.waiverCap >= 15;

  const handleWildcard = async (activate: boolean) => {
    const confirmMsg = activate
      ? 'Activate the Knockout Wildcard? This will lift the waiver cap to 15 and notify all managers.'
      : 'Deactivate the Wildcard? The waiver cap will return to 2 per round.';
    if (!window.confirm(confirmMsg)) return;

    setIsActivating(true);
    try {
      await toggleKnockoutWildcard(league.id, activate);
      await fetchLeague();
    } catch (e: any) {
      alert(e.message || 'Failed to toggle Wildcard.');
    } finally {
      setIsActivating(false);
    }
  };

  const handleGenerateSchedule = async () => {
    if (hasSchedule) return alert("Schedule already exists.");
    if (league.status !== 'POST_DRAFT') return alert("League must be in POST_DRAFT state.");
    
    const confirm = window.confirm("Generate a full Round-Robin schedule for the season?");
    if (!confirm) return;

    setIsGenerating(true);
    try {
      await generateLeagueSchedule(league.id);
      alert("Schedule successfully generated!");
      await fetchLeague();
    } catch (e: any) {
      alert(e.message || "Failed to generate schedule.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSeedPlayers = async () => {
    if (!window.confirm("Initialize Player Database? This will wipe existing data and seed the official World Cup pool.")) return;
    setIsSeeding(true);
    try {
      const res = await executeSeed();
      if (res.success) {
        alert(`Success! ${res.count} players seeded.`);
        await fetchLeague();
      } else {
        alert(res.error);
      }
    } catch (e: any) {
      alert("Failed to seed players.");
    } finally {
      setIsSeeding(false);
    }
  };

  // Helpers for cascading dropdowns
  const getPicksForManager = (managerId: string) => {
    return league.picks.filter((p: any) => p.managerId === managerId).map((pick: any) => {
      const p = staticPlayers.find(sp => sp.id === pick.playerId);
      return { pickId: pick.id, player: p };
    }).filter((x: any) => x.player);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ marginBottom: '3rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
        <p className="heading-sub" style={{ marginBottom: '0.75rem' }}>Commissioner Panel</p>
        <h1 className="heading">
          God <span className="heading-accent">Mode</span>
        </h1>
        <p style={{ color: 'var(--danger)', margin: 0, fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Full Administrative Access Granted</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        
        {/* CARD 0: Schedule Generation */}
        <div style={{ background: 'rgba(26,26,26,0.6)', borderRadius: '16px', border: '1px solid #333', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Calendar size={28} color="#00ff88" />
            <h2 style={{ color: '#fff', margin: 0 }}>League Schedule</h2>
          </div>
          <p style={{ color: '#aaa', marginBottom: '2rem', flex: 1, lineHeight: '1.6' }}>
            Generate the official H2H Round-Robin schedule for all managers. This is required to start the season.
          </p>
          <button 
            onClick={handleGenerateSchedule}
            disabled={isGenerating || hasSchedule || league.status !== 'POST_DRAFT'}
            style={{ 
              width: '100%', 
              padding: '1rem', 
              background: hasSchedule ? '#222' : 'var(--primary-accent)', 
              color: hasSchedule ? '#666' : '#000', 
              border: hasSchedule ? '1px solid #333' : 'none', 
              borderRadius: '8px', 
              fontWeight: 'bold', 
              cursor: (isGenerating || hasSchedule || league.status !== 'POST_DRAFT') ? 'not-allowed' : 'pointer',
              opacity: isGenerating ? 0.5 : 1
            }}
          >
            {isGenerating ? 'Generating...' : hasSchedule ? 'Schedule Generated' : 'Generate League Schedule'}
          </button>
        </div>

        {/* CARD 1: Market Status */}
        <div style={{ background: 'rgba(26,26,26,0.6)', borderRadius: '16px', border: '1px solid #333', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            {isLocked ? <Lock size={28} color="#ff4d4d" /> : <Unlock size={28} color="#00ff88" />}
            <h2 style={{ color: '#fff', margin: 0 }}>Market Status</h2>
          </div>
          <p style={{ color: '#aaa', marginBottom: '2rem', flex: 1, lineHeight: '1.6' }}>
            Control the global trade block and waiver wire. Lock the market when live matches are in progress to prevent managers from making unauthorized claims or trade swaps.
          </p>
          
          <div style={{ background: '#111', padding: '1.5rem', borderRadius: '12px', border: isLocked ? '1px solid #ff4d4d' : '1px solid #00ff88', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>{isLocked ? 'MARKET LOCKED' : 'MARKET OPEN'}</div>
              <div style={{ color: isLocked ? '#ff4d4d' : '#00ff88', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                {isLocked ? 'Transactions Frozen' : 'Transactions Allowed'}
              </div>
            </div>
            
            <button 
              onClick={handleToggleMarket}
              disabled={isToggling}
              style={{ 
                background: isLocked ? '#ff4d4d' : '#00ff88', 
                color: '#000', 
                border: 'none', 
                borderRadius: '8px', 
                padding: '0.75rem 1.5rem', 
                fontWeight: 'bold', 
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                opacity: isToggling ? 0.7 : 1,
                boxShadow: isLocked ? '0 0 15px rgba(255,77,77,0.4)' : '0 0 15px rgba(0,255,136,0.4)'
              }}
            >
              {isToggling ? 'Updating...' : (isLocked ? 'OPEN MARKET' : 'LOCK MARKET')}
            </button>
          </div>
        </div>

        {/* CARD 2: Score Injector */}
        <div style={{ background: 'rgba(26,26,26,0.6)', borderRadius: '16px', border: '1px solid #333', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Zap size={28} color="var(--primary-accent)" />
            <h2 style={{ color: '#fff', margin: 0 }}>Score Injector</h2>
          </div>
          <p style={{ color: '#aaa', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Manually inject stats. Actions are logged to the Transparency Feed.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <select value={injManagerId} onChange={(e) => { setInjManagerId(e.target.value); setInjPlayerId(''); }} style={{ width: '100%', padding: '0.75rem', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '8px' }}>
              <option value="">-- Select Manager --</option>
              {league.managers.map((m: any) => <option key={m.id} value={m.id}>{m.displayName}</option>)}
            </select>

            {injManagerId && (
              <select value={injPlayerId} onChange={(e) => setInjPlayerId(e.target.value)} style={{ width: '100%', padding: '0.75rem', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '8px' }}>
                <option value="">-- Select Player --</option>
                {getPicksForManager(injManagerId).map((item: any) => (
                  <option key={item.player.id} value={item.player.id}>{item.player.name} ({item.player.position})</option>
                ))}
              </select>
            )}

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <select value={injStatType} onChange={(e: any) => setInjStatType(e.target.value)} style={{ flex: 2, padding: '0.75rem', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '8px' }}>
                <option value="goals">Goals</option>
                <option value="assists">Assists</option>
                <option value="manualBonus">Manual Bonus Pts</option>
              </select>
              <input type="number" value={injAmount} onChange={(e) => setInjAmount(Number(e.target.value))} style={{ flex: 1, padding: '0.75rem', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '8px' }} />
            </div>

            <button onClick={handleInjectScore} disabled={isInjecting || !injPlayerId} style={{ marginTop: '0.5rem', width: '100%', padding: '1rem', background: 'var(--primary-accent)', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', opacity: (isInjecting || !injPlayerId) ? 0.5 : 1 }}>
              {isInjecting ? 'Injecting...' : 'Inject Score'}
            </button>
          </div>
        </div>

        {/* CARD 3: Force Trade Hub */}
        <div style={{ background: 'rgba(26,26,26,0.6)', borderRadius: '16px', border: '1px solid #333', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <ArrowRightLeft size={28} color="var(--primary-accent)" />
            <h2 style={{ color: '#fff', margin: 0 }}>Force Trade Hub</h2>
          </div>
          <p style={{ color: '#aaa', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Bypass market locks and execute direct swaps between any two rosters.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Side A */}
            <div style={{ background: '#111', padding: '1rem', borderRadius: '8px', border: '1px solid #333' }}>
              <div style={{ color: '#00ff88', marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase' }}>Side A</div>
              <select value={tradeManagerA} onChange={(e) => { setTradeManagerA(e.target.value); setTradePlayerA(''); }} style={{ width: '100%', padding: '0.5rem', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px', marginBottom: '0.5rem' }}>
                <option value="">- Select Manager -</option>
                {league.managers.map((m: any) => <option key={m.id} value={m.id}>{m.displayName}</option>)}
              </select>
              {tradeManagerA && (
                <select value={tradePlayerA} onChange={(e) => setTradePlayerA(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px' }}>
                  <option value="">- Select Player -</option>
                  {getPicksForManager(tradeManagerA).map((item: any) => <option key={item.player.id} value={item.player.id}>{item.player.name}</option>)}
                </select>
              )}
            </div>

            {/* Side B */}
            <div style={{ background: '#111', padding: '1rem', borderRadius: '8px', border: '1px solid #333' }}>
              <div style={{ color: '#00ff88', marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase' }}>Side B</div>
              <select value={tradeManagerB} onChange={(e) => { setTradeManagerB(e.target.value); setTradePlayerB(''); }} style={{ width: '100%', padding: '0.5rem', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px', marginBottom: '0.5rem' }}>
                <option value="">- Select Manager -</option>
                {league.managers.filter((m: any) => m.id !== tradeManagerA).map((m: any) => <option key={m.id} value={m.id}>{m.displayName}</option>)}
              </select>
              {tradeManagerB && (
                <select value={tradePlayerB} onChange={(e) => setTradePlayerB(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px' }}>
                  <option value="">- Select Player -</option>
                  {getPicksForManager(tradeManagerB).map((item: any) => <option key={item.player.id} value={item.player.id}>{item.player.name}</option>)}
                </select>
              )}
            </div>

            <button onClick={handleForceTrade} disabled={isTrading || !tradePlayerA || !tradePlayerB} style={{ marginTop: '0.5rem', width: '100%', padding: '1rem', background: 'var(--primary-accent)', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', opacity: (isTrading || !tradePlayerA || !tradePlayerB) ? 0.5 : 1 }}>
              {isTrading ? 'Executing...' : 'Execute Force Trade'}
            </button>
          </div>
        </div>

        {/* CARD 4: Tournament Stages */}
        <div style={{ background: 'rgba(26,26,26,0.6)', borderRadius: '16px', border: isWildcardActive ? '1px solid #ff4d4d' : '1px solid #333', padding: '2rem', boxShadow: isWildcardActive ? '0 10px 30px rgba(255,77,77,0.2)' : '0 10px 30px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', transition: 'all 0.4s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '28px' }}>⚡</span>
            <h2 style={{ color: '#fff', margin: 0 }}>Tournament Stages</h2>
          </div>
          <p style={{ color: '#aaa', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Activate the Knockout Wildcard to lift the waiver cap and allow unlimited squad rebuilds. Use this during the transition into the Round of 16.
          </p>

          <div style={{ background: '#111', padding: '1.5rem', borderRadius: '12px', border: isWildcardActive ? '1px solid #ff4d4d' : '1px solid #333', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>Waiver Cap</div>
                <div style={{ color: isWildcardActive ? '#ff4d4d' : '#00ff88', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  {isWildcardActive ? 'WILDCARD ACTIVE — UNLIMITED MOVES' : `${league.waiverCap} claims per round`}
                </div>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '900', color: isWildcardActive ? '#ff4d4d' : '#00ff88', textShadow: isWildcardActive ? '0 0 20px rgba(255,77,77,0.7)' : '0 0 20px rgba(0,255,136,0.5)' }}>
                {league.waiverCap >= 15 ? '∞' : league.waiverCap}
              </div>
            </div>
          </div>

          {isWildcardActive ? (
            <button
              onClick={() => handleWildcard(false)}
              disabled={isActivating}
              style={{ width: '100%', padding: '1rem', background: '#333', color: '#aaa', border: '1px solid #555', borderRadius: '8px', fontWeight: 'bold', cursor: isActivating ? 'not-allowed' : 'pointer', opacity: isActivating ? 0.5 : 1 }}
            >
              {isActivating ? 'Updating...' : 'Deactivate Wildcard'}
            </button>
          ) : (
            <button
              onClick={() => handleWildcard(true)}
              disabled={isActivating}
              style={{ width: '100%', padding: '1rem', background: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: isActivating ? 'not-allowed' : 'pointer', opacity: isActivating ? 0.5 : 1, boxShadow: '0 0 20px rgba(255,77,77,0.4)', letterSpacing: '1px', fontSize: '1rem' }}
            >
              {isActivating ? 'Activating...' : '⚡ ACTIVATE KNOCKOUT WILDCARD'}
            </button>
          )}
        </div>

        {/* CARD 5: System Actions */}
        <div style={{ background: 'rgba(26,26,26,0.6)', borderRadius: '16px', border: '1px solid #333', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Database size={28} color="var(--primary-accent)" />
            <h2 style={{ color: '#fff', margin: 0 }}>System Actions</h2>
          </div>
          <p style={{ color: '#aaa', marginBottom: '2rem', flex: 1, lineHeight: '1.6' }}>
            Perform core database maintenance. Initialize the player pool with the official hardcoded World Cup data set.
          </p>
          <button 
            onClick={handleSeedPlayers}
            disabled={isSeeding}
            style={{ 
              width: '100%', 
              padding: '1rem', 
              background: 'transparent', 
              color: 'var(--primary-accent)', 
              border: '1px solid var(--primary-accent)', 
              borderRadius: '8px', 
              fontWeight: 'bold', 
              cursor: isSeeding ? 'not-allowed' : 'pointer',
              opacity: isSeeding ? 0.5 : 1,
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(251, 191, 36, 0.1)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            {isSeeding ? 'Initializing...' : 'Initialize Player Database'}
          </button>
        </div>

      </div>
    </div>
  );
}
