'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getChatThreads, sendMessage } from '@/app/actions/chat';
import { RefreshCw, Send, MessageCircle } from 'lucide-react';
import { getLeagueById } from '@/app/actions/league';

export default function MessagesPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  
  const [league, setLeague] = useState<any>(null);
  const [threads, setThreads] = useState<any[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchThreads = async () => {
    if (params.id) {
      try {
        const lData = await getLeagueById(params.id as string);
        setLeague(lData);
        
        const data = await getChatThreads(params.id as string);
        setThreads(data);
        
        if (!activeThreadId && data.length > 0) {
          setActiveThreadId(data[0].id);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchThreads();
    const interval = setInterval(fetchThreads, 3000);
    return () => clearInterval(interval);
  }, [params.id, activeThreadId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [threads, activeThreadId]);

  if (loading || !session || !league) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .spinner-icon { animation: spin 1s linear infinite; }`}</style>
        <RefreshCw size={40} className="spinner-icon" style={{ marginBottom: '1.25rem', color: 'var(--accent)' }} />
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Loading Channels...</p>
      </div>
    );
  }

  const userId = (session.user as any).id;
  const activeThread = threads.find(t => t.id === activeThreadId);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !activeThreadId) return;
    
    setSending(true);
    try {
      await sendMessage(activeThreadId, messageText.trim());
      setMessageText('');
      await fetchThreads();
    } catch (err: any) {
      alert(err.message || "Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  const getOpponentName = (thread: any) => {
    const opponentId = thread.userAId === userId ? thread.userBId : thread.userAId;
    const opponent = league.managers?.find((m: any) => m.id === opponentId);
    return opponent?.displayName || "Unknown Manager";
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem', height: 'calc(100vh - 100px)' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <p className="heading-sub" style={{ marginBottom: '0.75rem' }}>Direct Messages</p>
        <h1 className="heading">Negotiation <span className="heading-accent">Channels</span></h1>
      </div>

      <div style={{ display: 'flex', height: '100%', gap: '2rem' }}>
        
        {/* Left Sidebar - Threads */}
        <div style={{ width: '300px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--surface-raised)' }}>
            <h3 style={{ margin: 0, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', fontWeight: '600', fontSize: '0.9rem' }}>Active Channels</h3>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto' }} className="custom-scrollbar">
            {threads.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#666', fontStyle: 'italic' }}>No active negotiations.</div>
            ) : (
              threads.map(thread => (
                <div 
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  style={{ 
                    padding: '1.5rem 1rem', 
                    borderBottom: '1px solid #222', 
                    cursor: 'pointer',
                    background: activeThreadId === thread.id ? 'rgba(0, 255, 136, 0.1)' : 'transparent',
                    borderLeft: activeThreadId === thread.id ? '4px solid #00ff88' : '4px solid transparent',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = activeThreadId === thread.id ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255,255,255,0.05)'}
                  onMouseLeave={e => e.currentTarget.style.background = activeThreadId === thread.id ? 'rgba(0, 255, 136, 0.1)' : 'transparent'}
                >
                  <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{getOpponentName(thread)}</div>
                  <div style={{ color: '#aaa', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {thread.messages.length > 0 ? thread.messages[thread.messages.length - 1].content : "No messages yet"}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Area - Chat Window */}
        <div style={{ flex: 1, background: 'rgba(26,26,26,0.6)', borderRadius: '16px', border: '1px solid #333', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {!activeThread ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
              <MessageCircle size={64} style={{ marginBottom: '1rem', opacity: 0.3 }} />
              <h3>Select a channel to start negotiating</h3>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div style={{ padding: '1.5rem', borderBottom: '1px solid #333', background: '#111', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 10px #00ff88' }}></div>
                <h2 style={{ margin: 0, color: '#fff' }}>{getOpponentName(activeThread)}</h2>
              </div>

              {/* Message History */}
              <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }} className="custom-scrollbar">
                {activeThread.messages.map((msg: any) => {
                  const isMine = msg.senderId === userId;
                  return (
                    <div key={msg.id} style={{ display: 'flex', justifyContent: isMine ? 'flex-end' : 'flex-start' }}>
                      <div style={{ 
                        maxWidth: '70%', 
                        padding: '1rem 1.5rem', 
                        borderRadius: '16px',
                        background: isMine ? 'var(--primary-accent)' : '#222',
                        color: isMine ? '#000' : '#fff',
                        borderBottomRightRadius: isMine ? '4px' : '16px',
                        borderBottomLeftRadius: !isMine ? '4px' : '16px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                      }}>
                        <div style={{ lineHeight: '1.5' }}>{msg.content}</div>
                        <div style={{ fontSize: '0.7rem', color: isMine ? 'rgba(0,0,0,0.5)' : '#888', marginTop: '0.5rem', textAlign: 'right' }}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div style={{ padding: '1.5rem', borderTop: '1px solid #333', background: '#111' }}>
                <form onSubmit={handleSend} style={{ display: 'flex', gap: '1rem' }}>
                  <input 
                    type="text" 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your offer..." 
                    style={{ flex: 1, padding: '1rem 1.5rem', background: '#222', border: '1px solid #444', borderRadius: '30px', color: '#fff', fontSize: '1rem', outline: 'none' }}
                  />
                  <button 
                    type="submit" 
                    disabled={sending || !messageText.trim()}
                    style={{ background: 'var(--primary-accent)', border: 'none', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: (sending || !messageText.trim()) ? 'not-allowed' : 'pointer', color: '#000', opacity: (sending || !messageText.trim()) ? 0.5 : 1, transition: 'all 0.2s' }}
                  >
                    <Send size={24} />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #111; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
      `}</style>
    </div>
  );
}
