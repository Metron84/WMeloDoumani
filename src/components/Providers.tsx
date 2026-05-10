'use client';
import { SessionProvider } from 'next-auth/react';
import { LeagueProvider } from '@/context/LeagueContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LeagueProvider>
        {children}
      </LeagueProvider>
    </SessionProvider>
  );
}
