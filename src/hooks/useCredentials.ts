import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface Credential {
  id: string;
  name: string;
  type: string;
  is_valid: boolean;
  last_tested: string | null;
  meta: {
    email?: string;
    name?: string;
    picture?: string;
    scopes?: string[];
    connected_at?: string;
  } | null;
  created_at: string;
}

export function useCredentials() {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    const org_id = user?.user_metadata?.org_id;
    if (!org_id) { setLoading(false); return; }

    const { data } = await supabase
      .from('flow_credentials')
      .select('id, name, type, is_valid, last_tested, meta, created_at')
      .eq('org_id', org_id)
      .order('created_at', { ascending: false });

    setCredentials(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const deleteCredential = useCallback(async (id: string) => {
    await supabase.from('flow_credentials').delete().eq('id', id);
    await load();
  }, [load]);

  return { credentials, loading, reload: load, deleteCredential };
}
