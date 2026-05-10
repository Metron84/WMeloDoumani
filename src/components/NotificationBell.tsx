'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Bell } from 'lucide-react';
import { getMyNotifications } from '@/app/actions/trades';
import { markNotificationsRead } from '@/app/actions/chat';

export default function NotificationBell() {
  const params = useParams();
  const router = useRouter();
  const leagueId = params.id as string;
  
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!leagueId) return;

    const fetchNotifs = async () => {
      try {
        const data = await getMyNotifications(leagueId);
        setNotifications(data);
      } catch (e) {
        console.error("Failed to fetch notifications", e);
      }
    };

    fetchNotifs();
    const interval = setInterval(fetchNotifs, 3000);
    return () => clearInterval(interval);
  }, [leagueId]);

  if (!leagueId) return null;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleOpen = async () => {
    setIsOpen(!isOpen);
    if (!isOpen && unreadCount > 0) {
      await markNotificationsRead(leagueId);
      // Optimistically update
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    }
  };

  const handleNotificationClick = (actionLink?: string | null) => {
    setIsOpen(false);
    if (actionLink) {
      router.push(actionLink);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '1rem 0' }}>
      <button 
        onClick={handleOpen} 
        style={{ 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer', 
          color: '#aaa', 
          position: 'relative',
          padding: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'color 0.2s'
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
        onMouseLeave={e => e.currentTarget.style.color = '#aaa'}
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <div style={{
            position: 'absolute',
            top: '0',
            right: '0',
            background: '#ff4d4d',
            color: '#fff',
            fontSize: '0.7rem',
            fontWeight: 'bold',
            borderRadius: '50%',
            minWidth: '18px',
            height: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #111'
          }}>
            {unreadCount}
          </div>
        )}
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '300px',
          maxHeight: '400px',
          overflowY: 'auto',
          background: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          zIndex: 1000,
          marginTop: '0.5rem'
        }} className="custom-scrollbar">
          <div style={{ padding: '1rem', borderBottom: '1px solid #333', fontWeight: 'bold', color: '#fff' }}>
            Notifications
          </div>
          {notifications.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
              No notifications
            </div>
          ) : (
            notifications.map(n => (
              <div 
                key={n.id} 
                onClick={() => handleNotificationClick(n.actionLink)}
                style={{ 
                  padding: '1rem', 
                  borderBottom: '1px solid #222', 
                  cursor: n.actionLink ? 'pointer' : 'default',
                  background: n.isRead ? 'transparent' : 'rgba(0, 255, 136, 0.05)',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={e => n.actionLink && (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                onMouseLeave={e => n.actionLink && (e.currentTarget.style.background = n.isRead ? 'transparent' : 'rgba(0, 255, 136, 0.05)')}
              >
                <div style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '0.25rem', lineHeight: '1.4' }}>{n.message}</div>
                <div style={{ color: '#aaa', fontSize: '0.75rem' }}>
                  {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))
          )}
        </div>
      )}
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #111; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
      `}</style>
    </div>
  );
}
