Preciso criar a tela de Credenciais do Zenite Flow. Para todo o visual, use como referência canônica o arquivo src/app/pages/DesignSystem.tsx — ele é a fonte da verdade de cores, tipografia, shadows, border-radius e componentes do projeto. Não invente nenhuma cor ou estilo fora do que está documentado nele.

ARQUIVO 1 — Criar src/hooks/useCredentials.ts
typescriptimport { useState, useEffect, useCallback } from 'react';
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

ARQUIVO 2 — Criar src/app/pages/Credentials.tsx
Siga o mesmo layout de Home.tsx: header fixo com título + subtítulo + botão de ação, depois conteúdo com scroll.
Header:

Título: Credenciais — mesmo estilo do <h1> de Home.tsx
Subtítulo: {credentials.length} conectada{credentials.length !== 1 ? 's' : ''} — mesmo estilo do subtítulo da Home
Botão: + Conectar Google Workspace — use o mesmo estilo do botão + Criar Fluxo da Home

Ao clicar em "Conectar Google Workspace":
typescriptconst handleConnectGoogle = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  const org_id = user?.user_metadata?.org_id;
  const user_id = user?.id;
  const supabaseUrl = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co`;
  window.location.href = `${supabaseUrl}/functions/v1/google-oauth-start?org_id=${org_id}&user_id=${user_id}&name=Google+Workspace`;
};
Estado vazio (zero credenciais): mesmo padrão do estado vazio de Home.tsx — ícone Key (Phosphor, duotone), título, subtítulo, botão de ação.
Grid de credenciais — mesmo grid grid-cols-3 gap-[16px] dos FlowCards da Home. Cada card deve ter:

Avatar circular com meta.picture (img) ou inicial do nome como fallback
Nome da credencial em negrito
Badge de tipo (ex: Google Workspace) — use o mesmo estilo dos badges de status da Home
Email: meta.email
Badge de status: Conectado se is_valid === true, Reconectar se false — use as mesmas cores de status ativo/inativo da Home
Chips de escopos: mapeie os scopes simplificados (gmail.send → Gmail, calendar → Calendar, drive → Drive, spreadsheets → Sheets, documents → Docs) — use o mesmo estilo dos chips de categoria da Home
Footer: Conectado em {data formatada} à esquerda, botão lixeira Trash (Phosphor) à direita — ao clicar chama deleteCredential(credential.id)

Loading: use Skeleton de ../components/ui/skeleton.tsx simulando 3 cards.
Toast de retorno OAuth via URL params:
typescriptuseEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const sucesso = params.get('sucesso');
  const erro = params.get('erro');
  const email = params.get('email');
  if (sucesso === 'google_conectado') {
    toast.success(`Google conectado: ${email}`);
    window.history.replaceState({}, '', window.location.pathname);
  } else if (erro) {
    toast.error('Falha ao conectar Google', { description: erro });
    window.history.replaceState({}, '', window.location.pathname);
  }
}, []);

ARQUIVO 3 — Atualizar src/app/routes.ts
typescriptimport { Credentials } from './pages/Credentials';

// Adicionar em children:
{ path: "credenciais", Component: Credentials },

ARQUIVO 4 — Atualizar src/app/components/Sidebar.tsx
1. Adicionar Key nos imports do Phosphor.
2. Adicionar /credenciais no isFlowActive:
typescriptconst isFlowActive = location.pathname === "/"
  || location.pathname.startsWith("/editor")
  || location.pathname.startsWith("/flow-builder")
  || location.pathname.startsWith("/templates")
  || location.pathname.startsWith("/history")
  || location.pathname.startsWith("/credenciais"); // ← ADICIONAR
3. Adicionar NavLink de Credenciais após o bloco de Modelos — use exatamente o mesmo padrão JSX dos outros NavLinks já existentes no Sidebar, apenas trocando o ícone por Key e o to por /credenciais com label Credenciais.

Não altere nenhum outro arquivo. Todo o visual deve derivar do DesignSystem.tsx — não use nenhuma cor, shadow ou estilo que não esteja documentado nele.