import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useHomeData() {
  const [flows, setFlows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('flow_dashboard')
        .select('*')
        .order('updated_at', { ascending: false });
      setFlows(data || []);
      setLoading(false);
    }
    load();
  }, []);

  return { flows, loading };
}
