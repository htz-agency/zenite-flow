import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../lib/supabase';

export function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/', { replace: true });
      } else if (event === 'SIGNED_OUT' || !session) {
        navigate('/login', { replace: true });
      }
    });
  }, [navigate]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#F7F8FA' }}>
      <div style={{ width: 32, height: 32, border: '3px solid #E8E8FD', borderTopColor: '#6868B1', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
