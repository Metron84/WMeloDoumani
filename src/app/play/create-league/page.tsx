'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createNewLeague } from '@/lib/league-actions';
import styles from './create-league.module.css';
import { Upload, Trophy, Settings, Users, Copy, CheckCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function CreateLeague() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: 'ULM World Cup',
    logoUrl: '',
    goalPts: 3,
    assistPts: 1,
    ratingTier1Pts: 1,
    ratingTier2Pts: 2,
    maxTeams: 8,
    draftType: 'Snake',
    rosterSize: 12,
  });

  const [inviteCode, setInviteCode] = useState('');
  const [copied, setCopied] = useState(false);

  if (status === 'loading') return <div>Loading...</div>;
  if (!session) {
    router.push('/play/login');
    return null;
  }

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const payload = {
        leagueName: formData.name,
        draftType: formData.draftType,
        teamCount: formData.maxTeams,
        rosterSize: formData.rosterSize,
        userId: (session as any).user.id,
      };
      const leagueId = await createNewLeague(payload);
      router.push(`/play/league/${leagueId}/lobby`);
    } catch (err) {
      setError("Error creating league. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
      <div className={styles.header}>
        <h1 className="heading">Create <span className="heading-accent">League</span></h1>
        <p className={styles.subtitle}>Configure your rules and generate an invite code for your friends.</p>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressContainer}>
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className={`${styles.stepIndicator} ${step >= s ? styles.activeStep : ''}`}>
            {s === 1 && <Trophy size={18} />}
            {s === 2 && <Settings size={18} />}
            {s === 3 && <Users size={18} />}
            {s === 4 && <CheckCircle size={18} />}
          </div>
        ))}
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
        </div>
      </div>

      <div className={styles.wizardCard}>
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className={styles.stepTitle}>Basic Info</h2>
            <div className={styles.formGroup}>
              <label>League Name</label>
              <input 
                type="text" 
                className={styles.input}
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className={styles.formGroup}>
              <label>League Logo</label>
              <div className={styles.uploadBox}>
                <Upload size={32} color="#aaa" style={{ marginBottom: '1rem' }} />
                <p>Click or drag image to upload (Mock)</p>
                <input type="file" style={{ display: 'none' }} />
              </div>
            </div>
            <button className={styles.nextBtn} onClick={handleNext}>Next: Scoring Rules</button>
          </div>
        )}

        {/* Step 2: Scoring Rules */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className={styles.stepTitle}>Scoring Rules</h2>
            <p style={{ color: '#aaa', marginBottom: '2rem' }}>Preset with ULM standard logic. Adjust if necessary.</p>
            
            <div className={styles.grid2}>
              <div className={styles.formGroup}>
                <label>Goal Points</label>
                <input type="number" className={styles.input} value={formData.goalPts} onChange={e => setFormData({...formData, goalPts: parseFloat(e.target.value)})} />
              </div>
              <div className={styles.formGroup}>
                <label>Assist Points</label>
                <input type="number" className={styles.input} value={formData.assistPts} onChange={e => setFormData({...formData, assistPts: parseFloat(e.target.value)})} />
              </div>
              <div className={styles.formGroup}>
                <label>Rating 7.0 - 7.4 Pts</label>
                <input type="number" className={styles.input} value={formData.ratingTier1Pts} onChange={e => setFormData({...formData, ratingTier1Pts: parseFloat(e.target.value)})} />
              </div>
              <div className={styles.formGroup}>
                <label>Rating 7.5+ Pts</label>
                <input type="number" className={styles.input} value={formData.ratingTier2Pts} onChange={e => setFormData({...formData, ratingTier2Pts: parseFloat(e.target.value)})} />
              </div>
            </div>
            
            <div className={styles.btnGroup}>
              <button className={styles.prevBtn} onClick={handlePrev}>Back</button>
              <button className={styles.nextBtn} onClick={handleNext}>Next: Roster Settings</button>
            </div>
          </div>
        )}

        {/* Step 3: Roster & Draft Settings */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className={styles.stepTitle}>Roster & Draft Settings</h2>
            {error && <p style={{ color: '#ff4d4d', marginBottom: '1rem', background: 'rgba(255, 77, 77, 0.1)', padding: '0.75rem', borderRadius: '8px' }}>{error}</p>}
            
            <div className={styles.formGroup}>
              <label>Number of Teams</label>
              <input type="number" className={styles.input} value={formData.maxTeams} onChange={e => setFormData({...formData, maxTeams: parseInt(e.target.value)})} />
            </div>
            <div className={styles.formGroup}>
              <label>Draft Type</label>
              <select className={styles.input} value={formData.draftType} onChange={e => setFormData({...formData, draftType: e.target.value})}>
                <option value="Snake">Snake Draft</option>
                <option value="Auction">Auction Draft</option>
                <option value="Linear">Linear Draft</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Roster Size</label>
              <input type="number" className={styles.input} value={formData.rosterSize} onChange={e => setFormData({...formData, rosterSize: parseInt(e.target.value)})} />
            </div>

            <div className={styles.btnGroup}>
              <button className={styles.prevBtn} onClick={handlePrev}>Back</button>
              <button className={styles.submitBtn} onClick={handleSubmit} disabled={loading}>
                {loading ? 'Creating...' : 'Create League'}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: The Invite Code */}
        {step === 4 && (
          <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem 0' }}>
            <h2 className={styles.stepTitle} style={{ color: 'var(--primary-accent)', fontSize: '2rem' }}>League Created!</h2>
            <p style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '2rem' }}>
              You are now the Commissioner of <strong>{formData.name}</strong>. Share this code with your friends so they can join:
            </p>

            <div className={styles.codeContainer}>
              <span className={styles.inviteCode}>{inviteCode}</span>
              <button className={styles.copyBtn} onClick={copyToClipboard}>
                {copied ? <CheckCircle size={24} color="var(--primary-accent)" /> : <Copy size={24} />}
              </button>
            </div>

            <button className={styles.nextBtn} onClick={() => { window.location.href = '/play/admin' }} style={{ marginTop: '3rem', width: '100%' }}>
              Go to Commissioner Panel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
