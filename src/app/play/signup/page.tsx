'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '', password: '', displayName: '', teamName: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push('/play/login');
    } else {
      const data = await res.json();
      setError(data.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] p-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-[#0A0A0A] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl transition-all duration-300">
        <h1 className="heading text-center mb-8 text-[#0F172A] dark:text-[#E5E7EB]">
          Create <span className="text-[#DC2626] dark:text-[#D97706]">Profile</span>
        </h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Display Name</label>
            <input 
              type="text" 
              placeholder="e.g. Burhan" 
              value={formData.displayName}
              onChange={e => setFormData({...formData, displayName: e.target.value})}
              className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-[#0F172A] dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#DC2626] dark:focus:ring-[#D97706] transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Team Name</label>
            <input 
              type="text" 
              placeholder="e.g. Manchester City" 
              value={formData.teamName}
              onChange={e => setFormData({...formData, teamName: e.target.value})}
              className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-[#0F172A] dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#DC2626] dark:focus:ring-[#D97706] transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="manager@ufm.com" 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-[#0F172A] dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#DC2626] dark:focus:ring-[#D97706] transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-[#0F172A] dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#DC2626] dark:focus:ring-[#D97706] transition-all"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-[#DC2626] dark:bg-[#D97706] text-white dark:text-black font-bold uppercase tracking-widest rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-red-500/20 dark:shadow-amber-500/10 mt-4"
          >
            Create Account
          </button>
        </form>

        <p className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
          Already Registered? <Link href="/play/login" className="text-[#DC2626] dark:text-[#D97706] font-semibold hover:underline">Login to Dashboard</Link>
        </p>
      </div>
    </div>
  );
}
