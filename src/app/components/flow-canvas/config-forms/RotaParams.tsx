import FormField from '../config-fields/FormField';
import TextInput from '../config-fields/TextInput';
import Dropdown from '../config-fields/Dropdown';

interface RotaParamsProps {
  params: any;
  onChange: (params: any) => void;
}

export default function RotaParams({ params, onChange }: RotaParamsProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...params, [field]: value });
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <FormField label="Modo" required>
        <Dropdown
          value={params.modo || 'se_senao'}
          onChange={(v) => updateField('modo', v)}
          options={[
            { value: 'se_senao', label: 'Se/Senão' },
            { value: 'multiplas_rotas', label: 'Múltiplas rotas' },
          ]}
        />
      </FormField>

      <FormField label="Campo avaliado" required description="Use {{ expressão }} para acessar dados">
        <TextInput
          value={params.campo_avaliado || ''}
          onChange={(v) => updateField('campo_avaliado', v)}
          placeholder="Ex: {{ $json.status }}"
        />
      </FormField>

      <FormField label="Operador" required>
        <Dropdown
          value={params.operador || 'igual'}
          onChange={(v) => updateField('operador', v)}
          options={[
            { value: 'igual', label: 'Igual a' },
            { value: 'diferente', label: 'Diferente de' },
            { value: 'contem', label: 'Contém' },
            { value: 'nao_contem', label: 'Não contém' },
            { value: 'maior_que', label: 'Maior que' },
            { value: 'menor_que', label: 'Menor que' },
            { value: 'maior_igual', label: 'Maior ou igual' },
            { value: 'menor_igual', label: 'Menor ou igual' },
            { value: 'esta_vazio', label: 'Está vazio' },
            { value: 'nao_esta_vazio', label: 'Não está vazio' },
            { value: 'comeca_com', label: 'Começa com' },
            { value: 'termina_com', label: 'Termina com' },
            { value: 'regex', label: 'Regex' },
          ]}
        />
      </FormField>

      {!['esta_vazio', 'nao_esta_vazio'].includes(params.operador) && (
        <FormField label="Valor" required>
          <TextInput
            value={params.valor || ''}
            onChange={(v) => updateField('valor', v)}
            placeholder="Valor para comparação"
          />
        </FormField>
      )}

      <FormField label="Combinação de condições">
        <Dropdown
          value={params.combinacao_condicoes || 'E'}
          onChange={(v) => updateField('combinacao_condicoes', v)}
          options={[
            { value: 'E', label: 'E (AND)' },
            { value: 'OU', label: 'OU (OR)' },
          ]}
        />
      </FormField>
    </div>
  );
}
