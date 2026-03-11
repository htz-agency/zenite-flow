import { useState } from 'react';
import FormField from '../config-fields/FormField';
import TextInput from '../config-fields/TextInput';
import TextArea from '../config-fields/TextArea';
import Checkbox from '../config-fields/Checkbox';
import NumberInput from '../config-fields/NumberInput';
import Dropdown from '../config-fields/Dropdown';

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface ConfiguracoesTabProps {
  config: any;
  onChange: (config: any) => void;
}

export default function ConfiguracoesTab({ config, onChange }: ConfiguracoesTabProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="flex flex-col gap-[20px]">
      {/* Nome de exibição */}
      <FormField label="Nome de exibição" description="Nome personalizado do nó no canvas">
        <TextInput
          value={config.nome_exibicao || ''}
          onChange={(v) => updateField('nome_exibicao', v)}
          placeholder="Ex: Criar lead no CRM"
        />
      </FormField>

      {/* Notas */}
      <FormField label="Notas" description="Anotações internas sobre este nó">
        <TextArea
          value={config.notas || ''}
          onChange={(v) => updateField('notas', v)}
          placeholder="Adicione observações sobre este nó..."
          rows={3}
        />
      </FormField>

      {/* Exibir nota no canvas */}
      <Checkbox
        checked={config.exibir_nota_no_canvas || false}
        onChange={(v) => updateField('exibir_nota_no_canvas', v)}
        label="Exibir nota no canvas"
        description="Mostra a nota abaixo do nó no editor"
      />

      {/* Divisor */}
      <div className="h-[1px] bg-[#DDE3EC]" />

      {/* Sempre retornar dados */}
      <Checkbox
        checked={config.sempre_retornar_dados || false}
        onChange={(v) => updateField('sempre_retornar_dados', v)}
        label="Sempre retornar dados"
        description="Retorna um item vazio mesmo sem output"
      />

      {/* Executar uma vez */}
      <Checkbox
        checked={config.executar_uma_vez || false}
        onChange={(v) => updateField('executar_uma_vez', v)}
        label="Executar uma vez"
        description="Processa apenas o primeiro item da entrada"
      />

      {/* Divisor */}
      <div className="h-[1px] bg-[#DDE3EC]" />

      {/* Reintentar em falha */}
      <Checkbox
        checked={config.reintentar_em_falha || false}
        onChange={(v) => updateField('reintentar_em_falha', v)}
        label="Reintentar em caso de falha"
        description="Reexecuta o nó automaticamente se falhar"
      />

      {/* Campos condicionais de retentativa */}
      {config.reintentar_em_falha && (
        <div className="pl-[28px] flex flex-col gap-[16px] border-l-2 border-[#DCF0FF]">
          <FormField label="Número de tentativas" description="Quantidade máxima de retentativas">
            <NumberInput
              value={config.numero_tentativas || 3}
              onChange={(v) => updateField('numero_tentativas', v)}
              min={1}
              max={10}
            />
          </FormField>

          <FormField label="Intervalo entre tentativas (ms)" description="Tempo de espera entre cada tentativa">
            <NumberInput
              value={config.intervalo_tentativas_ms || 1000}
              onChange={(v) => updateField('intervalo_tentativas_ms', v)}
              min={100}
              step={100}
            />
          </FormField>
        </div>
      )}

      {/* Ao falhar */}
      <FormField label="Ao falhar" description="Ação a ser tomada quando o nó falhar">
        <Dropdown
          value={config.ao_falhar || 'parar_fluxo'}
          onChange={(v) => updateField('ao_falhar', v)}
          options={[
            { value: 'parar_fluxo', label: 'Parar fluxo' },
            { value: 'continuar', label: 'Continuar' },
            { value: 'saida_de_erro', label: 'Saída de erro' },
          ]}
        />
      </FormField>
    </div>
  );
}
