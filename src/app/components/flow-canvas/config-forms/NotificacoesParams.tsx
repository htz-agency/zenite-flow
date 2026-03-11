import FormField from '../config-fields/FormField';
import TextInput from '../config-fields/TextInput';
import TextArea from '../config-fields/TextArea';
import Dropdown from '../config-fields/Dropdown';

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface NotificacoesParamsProps {
  params: any;
  onChange: (params: any) => void;
  credentials: Array<{ value: string; label: string }>;
}

export default function NotificacoesParams({ params, onChange, credentials }: NotificacoesParamsProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...params, [field]: value });
  };

  const canal = params.canal || '';

  return (
    <div className="flex flex-col gap-[20px]">
      {/* Canal */}
      <FormField label="Canal" required>
        <Dropdown
          value={canal}
          onChange={(v) => updateField('canal', v)}
          placeholder="Selecione o canal"
          options={[
            { value: 'email', label: 'Email' },
            { value: 'push', label: 'Push (Navegador)' },
            { value: 'sms', label: 'SMS' },
            { value: 'slack', label: 'Slack' },
            { value: 'teams', label: 'Microsoft Teams' },
            { value: 'telegram', label: 'Telegram' },
            { value: 'whatsapp', label: 'WhatsApp Business' },
            { value: 'webhook', label: 'Webhook' },
          ]}
        />
      </FormField>

      {/* CANAL: EMAIL */}
      {canal === 'email' && (
        <>
          <FormField label="Para" required description="Use {{ expressão }} para dados dinâmicos">
            <TextInput
              value={params.para || ''}
              onChange={(v) => updateField('para', v)}
              placeholder="destinatario@email.com"
            />
          </FormField>

          <FormField label="CC">
            <TextInput
              value={params.cc || ''}
              onChange={(v) => updateField('cc', v)}
              placeholder=""
            />
          </FormField>

          <FormField label="Assunto" required>
            <TextInput
              value={params.assunto || ''}
              onChange={(v) => updateField('assunto', v)}
              placeholder="🔔 Novo lead: {{ $trigger.nome }}"
            />
          </FormField>

          <FormField label="Corpo" required description="Suporta HTML. Use {{ expressão }} para dados dinâmicos">
            <TextArea
              value={params.corpo || ''}
              onChange={(v) => updateField('corpo', v)}
              placeholder=""
              rows={6}
            />
          </FormField>

          <FormField label="Credencial Google" required>
            <Dropdown
              value={params.credencial_google || ''}
              onChange={(v) => updateField('credencial_google', v)}
              placeholder="Selecione a conta Gmail"
              options={credentials}
            />
          </FormField>
        </>
      )}

      {/* CANAL: SLACK */}
      {canal === 'slack' && (
        <>
          <FormField label="Credencial" required>
            <Dropdown
              value={params.credencial || ''}
              onChange={(v) => updateField('credencial', v)}
              placeholder="Selecione a credencial Slack"
              options={credentials}
            />
          </FormField>

          <FormField label="Canal/Usuário" required>
            <TextInput
              value={params.canal_usuario || ''}
              onChange={(v) => updateField('canal_usuario', v)}
              placeholder="#geral ou @usuario"
            />
          </FormField>

          <FormField label="Mensagem" required>
            <TextArea
              value={params.mensagem || ''}
              onChange={(v) => updateField('mensagem', v)}
              placeholder=""
              rows={4}
            />
          </FormField>
        </>
      )}

      {/* CANAL: TELEGRAM */}
      {canal === 'telegram' && (
        <>
          <FormField label="Credencial" required>
            <Dropdown
              value={params.credencial || ''}
              onChange={(v) => updateField('credencial', v)}
              placeholder=""
              options={credentials}
            />
          </FormField>

          <FormField label="Chat ID" required>
            <TextInput
              value={params.chat_id || ''}
              onChange={(v) => updateField('chat_id', v)}
              placeholder="{{ $trigger.telegram_id }}"
            />
          </FormField>

          <FormField label="Mensagem" required>
            <TextArea
              value={params.mensagem || ''}
              onChange={(v) => updateField('mensagem', v)}
              placeholder=""
              rows={4}
            />
          </FormField>
        </>
      )}

      {/* CANAL: WEBHOOK */}
      {canal === 'webhook' && (
        <>
          <FormField label="URL" required>
            <TextInput
              value={params.url || ''}
              onChange={(v) => updateField('url', v)}
              placeholder="https://"
            />
          </FormField>

          <FormField label="Método">
            <Dropdown
              value={params.metodo || 'POST'}
              onChange={(v) => updateField('metodo', v)}
              options={[
                { value: 'POST', label: 'POST' },
                { value: 'PUT', label: 'PUT' },
                { value: 'PATCH', label: 'PATCH' },
              ]}
            />
          </FormField>

          <FormField label="Corpo" description="JSON. Use {{ expressão }} para dados dinâmicos">
            <TextArea
              value={params.corpo || ''}
              onChange={(v) => updateField('corpo', v)}
              placeholder=""
              rows={4}
            />
          </FormField>
        </>
      )}

      {/* CANAL: PUSH, SMS, WHATSAPP, TEAMS */}
      {(canal === 'push' || canal === 'sms' || canal === 'whatsapp' || canal === 'teams') && (
        <div className="p-[16px] bg-[#EBF1FA] rounded-[10px]">
          <p className="text-[#4E6987]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}>
            Integração com {
              canal === 'push' ? 'Push (Navegador)' :
              canal === 'sms' ? 'SMS' :
              canal === 'whatsapp' ? 'WhatsApp Business' :
              'Microsoft Teams'
            } em breve disponível.
          </p>
        </div>
      )}
    </div>
  );
}