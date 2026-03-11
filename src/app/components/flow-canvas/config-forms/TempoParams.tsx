import FormField from '../config-fields/FormField';
import TextInput from '../config-fields/TextInput';
import Dropdown from '../config-fields/Dropdown';
import NumberInput from '../config-fields/NumberInput';

interface TempoParamsProps {
  params: any;
  onChange: (params: any) => void;
}

export default function TempoParams({ params, onChange }: TempoParamsProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...params, [field]: value });
  };

  const tipo = params.tipo || '';

  return (
    <div className="flex flex-col gap-[20px]">
      {/* Tipo */}
      <FormField label="Tipo" required>
        <Dropdown
          value={tipo}
          onChange={(v) => updateField('tipo', v)}
          placeholder="Selecione o tipo"
          options={[
            { value: 'duracao_fixa', label: 'Duração fixa' },
            { value: 'ate_data_hora', label: 'Até data/hora' },
            { value: 'ate_webhook', label: 'Aguardar webhook' },
          ]}
        />
      </FormField>

      {/* TIPO: DURAÇÃO FIXA */}
      {tipo === 'duracao_fixa' && (
        <div className="grid grid-cols-2 gap-[12px]">
          <FormField label="Duração" required>
            <NumberInput
              value={params.duracao || 1}
              onChange={(v) => updateField('duracao', v)}
              min={1}
            />
          </FormField>
          <FormField label="Unidade" required>
            <Dropdown
              value={params.unidade || 'minutos'}
              onChange={(v) => updateField('unidade', v)}
              options={[
                { value: 'segundos', label: 'Segundos' },
                { value: 'minutos', label: 'Minutos' },
                { value: 'horas', label: 'Horas' },
                { value: 'dias', label: 'Dias' },
              ]}
            />
          </FormField>
        </div>
      )}

      {/* TIPO: ATÉ DATA/HORA */}
      {tipo === 'ate_data_hora' && (
        <FormField label="Data e hora" description="Formato ISO 8601 ou expressão dinâmica">
          <TextInput
            value={params.data_hora || ''}
            onChange={(v) => updateField('data_hora', v)}
            placeholder="{{ $trigger.data_agendada }}"
          />
        </FormField>
      )}

      {/* TIPO: ATÉ WEBHOOK */}
      {tipo === 'ate_webhook' && (
        <>
          <FormField label="Caminho do webhook" required>
            <TextInput
              value={params.caminho_webhook || ''}
              onChange={(v) => updateField('caminho_webhook', v)}
              placeholder="/aguardar-aprovacao"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-[12px]">
            <FormField label="Timeout máximo">
              <NumberInput
                value={params.timeout_valor || 1}
                onChange={(v) => updateField('timeout_valor', v)}
                min={1}
              />
            </FormField>
            <FormField label="Unidade">
              <Dropdown
                value={params.timeout_unidade || 'horas'}
                onChange={(v) => updateField('timeout_unidade', v)}
                options={[
                  { value: 'minutos', label: 'Minutos' },
                  { value: 'horas', label: 'Horas' },
                  { value: 'dias', label: 'Dias' },
                ]}
              />
            </FormField>
          </div>

          <FormField label="Ação ao timeout">
            <Dropdown
              value={params.acao_timeout || 'continuar'}
              onChange={(v) => updateField('acao_timeout', v)}
              options={[
                { value: 'continuar', label: 'Continuar fluxo' },
                { value: 'erro', label: 'Retornar erro' },
                { value: 'saida_alternativa', label: 'Saída alternativa' },
              ]}
            />
          </FormField>
        </>
      )}
    </div>
  );
}
