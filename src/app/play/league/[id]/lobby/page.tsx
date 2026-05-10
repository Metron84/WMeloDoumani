'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getLeagueById, updateLeagueStatus } from '@/app/actions/league';
import { Copy, CheckCircle, RefreshCw } from 'lucide-react';

export default function LobbyPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [league, setLeague] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [launching, setLaunching] = useState(false);

  useEffect(() => {
    async function fetchLeague() {
      if (params.id) {
        const data = await getLeagueById(params.id as string);
        setLeague(data);
        setLoading(false);
      }
    }
    
    // Initial fetch
    fetchLeague();

    // Set up "real-time" polling listener every 3 seconds to simulate Firebase onSnapshot
    const intervalId = setInterval(() => {
      fetchLeague();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [params.id]);

  useEffect(() => {
    if (league?.status === 'DRAFTING') {
      router.push(`/play/league/${params.id}/draft`);
    }
  }, [league?.status, params.id, router]);

  const copyToClipboard = () => {
    if (league) {
      navigator.clipboard.writeText(league.inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLaunchDraft = async () => {
    setLaunching(true);
    try {
      await updateLeagueStatus(league.id, 'DRAFTING');
      const updated = await getLeagueById(league.id);
      setLeague(updated);
    } catch (e) {
      alert("Error launching draft");
    } finally {
      setLaunching(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: '#aaa' }}>
        <style>{`
          @keyframes spin { 100% { transform: rotate(360deg); } }
          .spinner-icon { animation: spin 1s linear infinite; }
        `}</style>
        <RefreshCw size={48} className="spinner-icon" style={{ marginBottom: '1rem', color: '#00ff88' }} />
        <h2>Loading Lobby Data...</h2>
      </div>
    );
  }

  if (!league) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#ff4d4d' }}>
        <h2>League Not Found</h2>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0', textAlign: 'center' }}>
      <h1 className="heading">
        <span className="heading-accent">{league.name}</span> Lobby
      </h1>
      <p style={{ color: '#aaa', fontSize: '1.2rem', marginTop: '1rem' }}>
        Welcome to your new league! Share this code with other managers so they can join.
      </p>

      <div style={{ background: '#111', border: '2px solid var(--primary-accent)', borderRadius: '12px', padding: '2rem', display: 'inline-flex', alignItems: 'center', gap: '1.5rem', marginTop: '3rem' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '3rem', fontWeight: 'bold', letterSpacing: '0.5rem', color: '#fff' }}>
          {league.inviteCode}
        </span>
        <button 
          onClick={copyToClipboard}
          style={{ background: 'transparent', border: 'none', color: copied ? 'var(--primary-accent)' : '#aaa', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem' }}
        >
          {copied ? <CheckCircle size={32} /> : <Copy size={32} />}
        </button>
      </div>

      {session && league && (session.user as any).id === league.commissionerId && league.status === 'WAITING' && (
        <div style={{ marginTop: '3rem' }}>
          <button 
            onClick={handleLaunchDraft} 
            disabled={launching}
            style={{ padding: '1rem 3rem', fontSize: '1.2rem', borderRadius: '8px', border: 'none', background: '#00ff88', color: '#000', fontWeight: 'bold', cursor: launching ? 'not-allowed' : 'pointer', transition: 'all 0.2s', boxShadow: '0 0 20px rgba(0,255,136,0.3)' }}
          >
            {launching ? 'Launching Draft...' : 'Launch Draft'}
          </button>
        </div>
      )}

      {league?.status === 'DRAFTING' && (
        <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(0,255,136,0.1)', border: '1px solid #00ff88', borderRadius: '12px', color: '#00ff88', fontSize: '1.2rem', fontWeight: 'bold' }}>
          The Draft has begun! Head to the Draft Room.
        </div>
      )}

      <div style={{ marginTop: '4rem', padding: '2rem', background: 'rgba(26,26,26,0.6)', borderRadius: '16px', border: '1px solid #333', textAlign: 'left' }}>
        <h2 style={{ color: '#fff', marginBottom: '1.5rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>League Details</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', color: '#aaa', fontSize: '1.1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ color: '#666', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 'bold' }}>Draft Type</span>
            <span style={{ color: '#fff' }}>{league.draftType}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ color: '#666', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 'bold' }}>Roster Size</span>
            <span style={{ color: '#fff' }}>{league.rosterSize} Players</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ color: '#666', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 'bold' }}>Goal Points</span>
            <span style={{ color: '#fff' }}>{league.goalPts} pts</span>
          </div>
        </div>
      </div>

      {/* Managers Joined Section */}
      <div style={{ marginTop: '2rem', padding: '2rem', background: 'rgba(26,26,26,0.6)', borderRadius: '16px', border: '1px solid #333', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
          <h2 style={{ color: '#fff', margin: 0 }}>Managers Joined</h2>
          <span style={{ background: 'var(--primary-accent)', color: '#000', padding: '0.25rem 0.75rem', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.9rem' }}>
            Managers: {league.managers.length} / {league.maxTeams}
          </span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
          {league.managers.map((manager: any, idx: number) => (
            <div key={idx} style={{ background: '#111', padding: '1rem', borderRadius: '8px', border: '1px solid #333', textAlign: 'center', color: '#00ff88', fontWeight: 'bold' }}>
              {manager.displayName}
            </div>
          ))}
          
          {/* Empty slots for visual feedback */}
          {Array.from({ length: Math.max(0, league.maxTeams - league.managers.length) }).map((_, idx) => (
            <div key={`empty-${idx}`} style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '1px dashed #444', textAlign: 'center', color: '#555' }}>
              Waiting...
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
