import FormField from '../config-fields/FormField';
import TextInput from '../config-fields/TextInput';
import TextArea from '../config-fields/TextArea';
import Dropdown from '../config-fields/Dropdown';
import NumberInput from '../config-fields/NumberInput';

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface TuringParamsProps {
  params: any;
  onChange: (params: any) => void;
  credentials: Array<{ value: string; label: string }>;
}

export default function TuringParams({ params, onChange, credentials }: TuringParamsProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...params, [field]: value });
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <FormField label="Tipo" required>
        <Dropdown
          value={params.tipo || 'chat'}
          onChange={(v) => updateField('tipo', v)}
          options={[
            { value: 'chat', label: 'Chat' },
            { value: 'completar_texto', label: 'Completar texto' },
            { value: 'agente', label: 'Agente' },
            { value: 'classificar', label: 'Classificar' },
            { value: 'extrair_dados', label: 'Extrair dados' },
          ]}
        />
      </FormField>

      <FormField label="Provedor" required>
        <Dropdown
          value={params.provedor || 'openai'}
          onChange={(v) => updateField('provedor', v)}
          options={[
            { value: 'openai', label: 'OpenAI' },
            { value: 'anthropic', label: 'Anthropic' },
            { value: 'google', label: 'Google' },
            { value: 'custom', label: 'Customizado' },
          ]}
        />
      </FormField>

      <FormField label="Modelo" required>
        <Dropdown
          value={params.modelo || ''}
          onChange={(v) => updateField('modelo', v)}
          placeholder="Selecione o modelo"
          options={
            params.provedor === 'openai'
              ? [
                  { value: 'gpt-4o', label: 'GPT-4o' },
                  { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
                  { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
                ]
              : params.provedor === 'anthropic'
              ? [
                  { value: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
                  { value: 'claude-3-opus', label: 'Claude 3 Opus' },
                ]
              : [{ value: 'gemini-pro', label: 'Gemini Pro' }]
          }
        />
      </FormField>

      <FormField label="Credenciais" required>
        <Dropdown
          value={params.credenciais || ''}
          onChange={(v) => updateField('credenciais', v)}
          placeholder="Selecione a credencial"
          options={credentials}
        />
      </FormField>

      <FormField label="Prompt do sistema" description="Instruções base para o modelo">
        <TextArea
          value={params.prompt_sistema || ''}
          onChange={(v) => updateField('prompt_sistema', v)}
          placeholder="Você é um assistente prestativo que..."
          rows={4}
        />
      </FormField>

      <FormField label="Prompt do usuário" required description="Use {{ expressão }} para dados dinâmicos">
        <TextArea
          value={params.prompt_usuario || ''}
          onChange={(v) => updateField('prompt_usuario', v)}
          placeholder="Analise o seguinte texto: {{ $json.texto }}"
          rows={4}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-[12px]">
        <FormField label="Temperatura" description="0 = determinístico, 2 = criativo">
          <NumberInput
            value={params.temperatura || 1}
            onChange={(v) => updateField('temperatura', v)}
            min={0}
            max={2}
            step={0.1}
          />
        </FormField>

        <FormField label="Max tokens">
          <NumberInput
            value={params.max_tokens || 1000}
            onChange={(v) => updateField('max_tokens', v)}
            min={1}
            step={100}
          />
        </FormField>
      </div>

      <FormField label="Formato de saída" required>
        <Dropdown
          value={params.formato_saida || 'texto_livre'}
          onChange={(v) => updateField('formato_saida', v)}
          options={[
            { value: 'texto_livre', label: 'Texto livre' },
            { value: 'json', label: 'JSON' },
            { value: 'campo_especifico', label: 'Campo específico' },
          ]}
        />
      </FormField>

      {params.tipo === 'agente' && (
        <>
          <div className="h-[1px] bg-[#DDE3EC]" />
          <div className="p-[16px] bg-gradient-to-r from-[#E8E8FD] to-[#DCF0FF] rounded-[10px]">
            <p className="text-[#4E6987] mb-[8px]" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
              Configurações de Agente
            </p>
            <p className="text-[#98989d]" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.2, ...ff }}>
              Configure ferramentas e memória para o agente autônomo
            </p>
          </div>
        </>
      )}
    </div>
  );
}