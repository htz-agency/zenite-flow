Preciso corrigir dois problemas no NodeConfigDialog.tsx e nos config forms.
Problema 1 — Rotear pelo tipo específico, não pelo grupo
Em NodeConfigDialog.tsx, a função getParamsComponent() usa group para decidir qual form mostrar. Isso faz todos os nós passo abrirem o mesmo PassoParams genérico.
Corrija o switch para rotear pelo nodeData.type primeiro:
typescriptconst getParamsComponent = () => {
  const params = localData.params || {};
  const setParams = (newParams: any) => {
    setLocalData({ ...localData, params: newParams });
  };

  // Primeiro tenta pelo tipo específico do nó
  switch (nodeData.type) {
    case 'gmail':
      return <GmailParams params={params} onChange={setParams} credentials={credentials} />;
    case 'notificacoes':
      return <NotificacoesParams params={params} onChange={setParams} credentials={credentials} />;
    case 'turing':
      return <TuringParams params={params} onChange={setParams} credentials={credentials} />;
    case 'tempo':
      return <TempoParams params={params} onChange={setParams} />;
    case 'variavel':
      return <VariavelParams params={params} onChange={setParams} />;
    case 'rota':
    case 'bifurcacao':
      return <RotaParams params={params} onChange={setParams} />;
  }

  // Fallback pelo grupo
  const group = nodeDefinition?.group?.[0] as NodeGroup | undefined;
  switch (group) {
    case 'gatilho':
      return <GatilhoParams params={params} onChange={setParams} nodeType={nodeData.type} />;
    case 'passo':
      return <PassoParams params={params} onChange={setParams} credentials={credentials} />;
    default:
      return <GenericParams nodeType={nodeData.type} params={params} onChange={setParams} />;
  }
};

Problema 2 — Credenciais reais do Supabase
No NodeConfigDialog.tsx, busque as credenciais reais do banco logo no início do componente:
typescriptimport { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

// Dentro do componente, antes do return:
const [credentials, setCredentials] = useState<Array<{ value: string; label: string }>>([]);

useEffect(() => {
  async function loadCredentials() {
    const { data: { user } } = await supabase.auth.getUser();
    const org_id = user?.user_metadata?.org_id;
    if (!org_id) return;

    const { data } = await supabase
      .from('flow_credentials')
      .select('id, name, type, is_valid, meta')
      .eq('org_id', org_id)
      .eq('is_valid', true);

    setCredentials(
      (data || []).map(c => ({
        value: c.id,
        label: `${c.meta?.email ?? c.name} (${c.type})`,
      }))
    );
  }
  loadCredentials();
}, []);
```

Passe `credentials` como prop para todos os forms que têm dropdown de credenciais: `PassoParams`, `NotificacoesParams`, `TuringParams`.

---

### Problema 3 — Criar `GmailParams.tsx`

Crie `src/app/components/flow-canvas/config-forms/GmailParams.tsx` com campos específicos para envio de email — sem o dropdown genérico de Aplicativo/Recurso/Operação:
```
interface GmailParamsProps {
  params: any;
  onChange: (params: any) => void;
  credentials: Array<{ value: string; label: string }>;
}
Campos:

Credencial Google (Dropdown, obrigatório) — usa credentials prop, placeholder: Selecione a conta Gmail
Para (TextInput, obrigatório) — placeholder: {{ $trigger.email }}
CC (TextInput, opcional)
Assunto (TextInput, obrigatório) — placeholder: 🔔 Novo lead: {{ $trigger.nome }}
Corpo (TextArea, obrigatório, rows=6) — description: Suporta HTML. Use {{ $trigger.campo }} para dados dinâmicos


Problema 4 — Corrigir GatilhoParams.tsx
Adicione a prop nodeType e use para pré-selecionar o tipo de gatilho automaticamente quando o form abrir:
typescriptinterface GatilhoParamsProps {
  params: any;
  onChange: (params: any) => void;
  nodeType?: string; // ← ADICIONAR
}

// No início do componente, pré-seleciona o tipo baseado no nodeType:
const resolvedTipo = params.tipo || (
  nodeType === 'objetoCriado' || nodeType === 'objetoAtualizado' || nodeType === 'objetoMudouFase'
    ? 'evento_app'
    : nodeType === 'agendado' ? 'agendado'
    : nodeType === 'webhook' ? 'webhook'
    : nodeType === 'formulario' ? 'formulario'
    : nodeType === 'erro' ? 'erro'
    : 'manual'
);

// Use resolvedTipo no lugar de params.tipo em todo o componente
// E chame onChange imediatamente se params.tipo ainda não estiver definido:
useEffect(() => {
  if (!params.tipo && resolvedTipo) {
    onChange({ ...params, tipo: resolvedTipo });
  }
}, []);

Arquivos a alterar: NodeConfigDialog.tsx, GatilhoParams.tsx, PassoParams.tsx, NotificacoesParams.tsx, TuringParams.tsx
Arquivo a criar: GmailParams.tsx
Não altere nada visual.