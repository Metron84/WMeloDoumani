'use client';
import React, { createContext, useContext, useState } from 'react';

type LogEntry = {
  id: string;
  timestamp: string;
  message: string;
};

type LeagueStatus = 'OPEN' | 'LOCKED';

interface LeagueContextType {
  logs: LogEntry[];
  addLog: (message: string) => void;
  leagueStatus: LeagueStatus;
  setLeagueStatus: (status: LeagueStatus) => void;
}

const LeagueContext = createContext<LeagueContextType | undefined>(undefined);

export function LeagueProvider({ children }: { children: React.ReactNode }) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [leagueStatus, setLeagueStatus] = useState<LeagueStatus>('OPEN');

  const addLog = (message: string) => {
    const newLog = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      message,
    };
    setLogs(prev => [newLog, ...prev]);
  };

  return (
    <LeagueContext.Provider value={{ logs, addLog, leagueStatus, setLeagueStatus }}>
      {children}
    </LeagueContext.Provider>
  );
}

export function useLeague() {
  const context = useContext(LeagueContext);
  if (context === undefined) {
    throw new Error('useLeague must be used within a LeagueProvider');
  }
  return context;
}
