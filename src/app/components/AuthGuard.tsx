import { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import { supabase } from '../../lib/supabase';
import type { User } from '@supabase/supabase-js';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#F7F8FA' }}>
      <div style={{ width: 32, height: 32, border: '3px solid #E8E8FD', borderTopColor: '#6868B1', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
