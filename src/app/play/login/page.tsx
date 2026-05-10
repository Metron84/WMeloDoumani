'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError('Invalid email or password');
    } else {
      router.push('/play');
      router.refresh();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] p-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-[#0A0A0A] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl transition-all duration-300">
        <h1 className="heading text-center mb-8 text-[#0F172A] dark:text-[#E5E7EB]">
          ULM <span className="text-[#DC2626] dark:text-[#D97706]">Login</span>
        </h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="manager@ufm.com" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-[#0F172A] dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#DC2626] dark:focus:ring-[#D97706] transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-[#0F172A] dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#DC2626] dark:focus:ring-[#D97706] transition-all"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-[#DC2626] dark:bg-[#D97706] text-white dark:text-black font-bold uppercase tracking-widest rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-red-500/20 dark:shadow-amber-500/10 mt-2"
          >
            Enter League
          </button>
        </form>

        <p className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
          New Manager? <Link href="/play/signup" className="text-[#DC2626] dark:text-[#D97706] font-semibold hover:underline">Apply for Roster</Link>
        </p>
      </div>
    </div>
  );
}
