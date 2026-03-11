import FormField from '../config-fields/FormField';
import TextInput from '../config-fields/TextInput';
import TextArea from '../config-fields/TextArea';
import Dropdown from '../config-fields/Dropdown';

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface GmailParamsProps {
  params: any;
  onChange: (params: any) => void;
  credentials: Array<{ value: string; label: string }>;
}

export default function GmailParams({ params, onChange, credentials }: GmailParamsProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...params, [field]: value });
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <FormField label="Credencial Google" required>
        <Dropdown
          value={params.credencial || ''}
          onChange={(v) => updateField('credencial', v)}
          placeholder="Selecione a conta Gmail"
          options={credentials}
        />
      </FormField>

      <FormField label="Para" required>
        <TextInput
          value={params.para || ''}
          onChange={(v) => updateField('para', v)}
          placeholder="{{ $trigger.email }}"
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

      <FormField label="Corpo" required description="Suporta HTML. Use {{ $trigger.campo }} para dados dinâmicos">
        <TextArea
          value={params.corpo || ''}
          onChange={(v) => updateField('corpo', v)}
          placeholder=""
          rows={6}
        />
      </FormField>
    </div>
  );
}
