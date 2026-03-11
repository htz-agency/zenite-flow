import FormField from '../config-fields/FormField';
import Dropdown from '../config-fields/Dropdown';

interface PassoParamsProps {
  params: any;
  onChange: (params: any) => void;
  credentials: Array<{ value: string; label: string }>;
}

export default function PassoParams({ params, onChange, credentials }: PassoParamsProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...params, [field]: value });
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <FormField label="Aplicativo" required>
        <Dropdown
          value={params.aplicativo || ''}
          onChange={(v) => updateField('aplicativo', v)}
          placeholder="Selecione uma integração"
          options={[
            { value: 'gmail', label: 'Gmail' },
            { value: 'slack', label: 'Slack' },
            { value: 'zenite_crm', label: 'Zenite CRM' },
            { value: 'zenite_projects', label: 'Zenite Projects' },
            { value: 'zenite_dash', label: 'Zenite Dash' },
            { value: 'http', label: 'HTTP Request' },
          ]}
        />
      </FormField>

      {params.aplicativo && (
        <>
          <FormField label="Credenciais" required>
            <Dropdown
              value={params.credenciais || ''}
              onChange={(v) => updateField('credenciais', v)}
              placeholder="Selecione a credencial"
              options={credentials}
            />
          </FormField>

          <FormField label="Recurso" required>
            <Dropdown
              value={params.recurso || ''}
              onChange={(v) => updateField('recurso', v)}
              placeholder="Selecione o recurso"
              options={[
                { value: 'mensagem', label: 'Mensagem' },
                { value: 'arquivo', label: 'Arquivo' },
                { value: 'contato', label: 'Contato' },
                { value: 'lead', label: 'Lead' },
                { value: 'oportunidade', label: 'Oportunidade' },
              ]}
            />
          </FormField>

          <FormField label="Operação" required>
            <Dropdown
              value={params.operacao || ''}
              onChange={(v) => updateField('operacao', v)}
              placeholder="Selecione a operação"
              options={[
                { value: 'criar', label: 'Criar' },
                { value: 'buscar', label: 'Buscar' },
                { value: 'atualizar', label: 'Atualizar' },
                { value: 'deletar', label: 'Deletar' },
                { value: 'listar', label: 'Listar' },
              ]}
            />
          </FormField>
        </>
      )}
    </div>
  );
}