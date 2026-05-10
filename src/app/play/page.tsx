'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();
  const [inviteCode, setInviteCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  if (status === 'loading') return <div>Loading...</div>;

  if (!session) {
    return (
      <div className="landing-container animate-fade-in">
        <h1 className="landing-title">ULM: Ultimate Fantasy Manager</h1>
        <div className="philosophy">
          <span>Unique Rosters</span>
          <span>24/7 Transfer Market</span>
          <span>Zero Compromise</span>
        </div>
        <div className="cta-group">
          <button 
            onClick={() => router.push('/play/signup')} 
            className="btn btn-landing btn-create-league"
          >
            Create a League
          </button>
          <button 
            onClick={() => router.push('/play/login')} 
            className="btn btn-landing btn-enter-invite"
          >
            Enter Invite Code
          </button>
        </div>
      </div>
    );
  }

  const handleJoinLeague = async () => {
    setError('');
    const res = await fetch('/api/league/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inviteCode })
    });

    if (res.ok) {
      alert("Successfully joined league!");
      // reload to fetch new session token (which requires login again in basic setup, but we'll refresh)
      window.location.reload(); 
    } else {
      const data = await res.json();
      setError(data.message || 'Error joining league');
    }
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <h1 className="heading">
        Welcome, <span className="text-[#DC2626] dark:text-[#D97706]">{session.user?.name || 'Manager'}</span>
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-lg mt-2 font-medium">
        Team: <span className="text-[#0F172A] dark:text-[#E5E7EB]">{(session.user as any)?.teamName}</span>
      </p>

      {!(session.user as any)?.leagueId ? (
        <div className="mt-12 p-8 bg-white dark:bg-[#0A0A0A] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl transition-all duration-300">
          <h2 className="heading-serif text-2xl mb-4 text-[#0F172A] dark:text-[#E5E7EB]">Initialize Your Season</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">Enter the league invite code provided by your Commissioner, or create your own elite league to begin.</p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                placeholder="LEAGUE CODE (e.g. ULM-WC-2026)" 
                value={inviteCode}
                onChange={e => setInviteCode(e.target.value)}
                className="flex-1 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-[#0F172A] dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#DC2626] dark:focus:ring-[#D97706] transition-all uppercase tracking-wider"
              />
              <button 
                onClick={handleJoinLeague} 
                className="px-8 py-4 bg-[#DC2626] dark:bg-[#D97706] text-white dark:text-black font-bold uppercase tracking-widest rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-lg"
              >
                Join League
              </button>
            </div>
            
            <div className="relative py-4 flex items-center">
              <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">OR</span>
              <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
            </div>

            <button 
              onClick={() => router.push('/play/create-league')} 
              className="w-full py-4 bg-transparent border-2 border-[#DC2626] dark:border-[#D97706] text-[#DC2626] dark:text-[#D97706] font-bold uppercase tracking-widest rounded-xl hover:bg-[#DC2626] hover:text-white dark:hover:bg-[#D97706] dark:hover:text-black active:scale-95 transition-all"
            >
              Establish New League
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-12 p-10 bg-white dark:bg-[#0A0A0A] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl border-l-4 border-l-[#DC2626] dark:border-l-[#D97706]">
          <h2 className="heading-serif text-2xl mb-2 text-[#0F172A] dark:text-[#E5E7EB]">Roster Confirmed</h2>
          <p className="text-gray-500 dark:text-gray-400">You are successfully registered in a league. Await the Commissioner's signal for the Draft Room to open.</p>
        </div>
      )}
    </div>
  );
}
