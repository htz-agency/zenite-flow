import { Plus, X } from '@phosphor-icons/react';
import FormField from '../config-fields/FormField';
import TextInput from '../config-fields/TextInput';
import Dropdown from '../config-fields/Dropdown';
import NumberInput from '../config-fields/NumberInput';

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface VariavelParamsProps {
  params: any;
  onChange: (params: any) => void;
}

export default function VariavelParams({ params, onChange }: VariavelParamsProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...params, [field]: value });
  };

  const operacao = params.operacao || '';
  const variaveis = params.variaveis || [];

  const adicionarVariavel = () => {
    const novaVariavel = { nome: '', valor: '', tipo: 'string' };
    updateField('variaveis', [...variaveis, novaVariavel]);
  };

  const removerVariavel = (index: number) => {
    const novasVariaveis = variaveis.filter((_: any, i: number) => i !== index);
    updateField('variaveis', novasVariaveis);
  };

  const atualizarVariavel = (index: number, campo: string, valor: any) => {
    const novasVariaveis = [...variaveis];
    novasVariaveis[index] = { ...novasVariaveis[index], [campo]: valor };
    updateField('variaveis', novasVariaveis);
  };

  return (
    <div className="flex flex-col gap-[20px]">
      {/* Operação */}
      <FormField label="Operação" required>
        <Dropdown
          value={operacao}
          onChange={(v) => updateField('operacao', v)}
          placeholder="Selecione a operação"
          options={[
            { value: 'definir', label: 'Definir variável' },
            { value: 'ler', label: 'Ler variável' },
            { value: 'incrementar', label: 'Incrementar' },
            { value: 'decrementar', label: 'Decrementar' },
            { value: 'apagar', label: 'Apagar variável' },
          ]}
        />
      </FormField>

      {/* Escopo */}
      <FormField label="Escopo" required>
        <Dropdown
          value={params.escopo || 'execucao'}
          onChange={(v) => updateField('escopo', v)}
          options={[
            { value: 'execucao', label: 'Execução atual' },
            { value: 'fluxo', label: 'Fluxo (persiste entre execuções)' },
            { value: 'global', label: 'Global (todos os fluxos)' },
          ]}
        />
      </FormField>

      {/* OPERAÇÃO: DEFINIR */}
      {operacao === 'definir' && (
        <>
          {/* Lista de variáveis */}
          {variaveis.map((variavel: any, index: number) => (
            <div key={index} className="p-[16px] bg-[#F6F7F9] rounded-[10px] flex flex-col gap-[12px]">
              <div className="flex items-center justify-between mb-[4px]">
                <span className="text-[#4E6987]" style={{ fontSize: 12, fontWeight: 600, ...ff }}>
                  Variável {index + 1}
                </span>
                <button
                  onClick={() => removerVariavel(index)}
                  className="flex items-center justify-center size-[24px] rounded-full bg-[#DDE3EC] hover:bg-[#C8CFDB] text-[#4E6987] transition-colors"
                >
                  <X size={14} weight="bold" />
                </button>
              </div>

              <FormField label="Nome">
                <TextInput
                  value={variavel.nome || ''}
                  onChange={(v) => atualizarVariavel(index, 'nome', v)}
                  placeholder="minhaVariavel"
                />
              </FormField>

              <FormField label="Valor">
                <TextInput
                  value={variavel.valor || ''}
                  onChange={(v) => atualizarVariavel(index, 'valor', v)}
                  placeholder="{{ $trigger.campo }}"
                />
              </FormField>

              <FormField label="Tipo">
                <Dropdown
                  value={variavel.tipo || 'string'}
                  onChange={(v) => atualizarVariavel(index, 'tipo', v)}
                  options={[
                    { value: 'string', label: 'String' },
                    { value: 'numero', label: 'Número' },
                    { value: 'booleano', label: 'Booleano' },
                    { value: 'json', label: 'JSON' },
                  ]}
                />
              </FormField>
            </div>
          ))}

          {/* Botão adicionar variável */}
          <button
            onClick={adicionarVariavel}
            className="flex items-center justify-center gap-[6px] h-[40px] rounded-[10px] border-2 border-dashed border-[#C8CFDB] hover:border-[#07ABDE] hover:bg-[#F6F7F9] text-[#4E6987] hover:text-[#07ABDE] transition-all"
          >
            <Plus size={16} weight="bold" />
            <span className="font-semibold" style={{ fontSize: 13, letterSpacing: -0.3, ...ff }}>
              Adicionar variável
            </span>
          </button>
        </>
      )}

      {/* OPERAÇÃO: LER */}
      {operacao === 'ler' && (
        <>
          <FormField label="Nome da variável" required>
            <TextInput
              value={params.nome_variavel || ''}
              onChange={(v) => updateField('nome_variavel', v)}
              placeholder="minhaVariavel"
            />
          </FormField>

          <FormField label="Valor padrão se não existir">
            <TextInput
              value={params.valor_padrao || ''}
              onChange={(v) => updateField('valor_padrao', v)}
              placeholder="valor_padrao"
            />
          </FormField>
        </>
      )}

      {/* OPERAÇÃO: INCREMENTAR ou DECREMENTAR */}
      {(operacao === 'incrementar' || operacao === 'decrementar') && (
        <>
          <FormField label="Nome da variável" required>
            <TextInput
              value={params.nome_variavel || ''}
              onChange={(v) => updateField('nome_variavel', v)}
              placeholder=""
            />
          </FormField>

          <FormField label="Valor">
            <NumberInput
              value={params.valor || 1}
              onChange={(v) => updateField('valor', v)}
              min={1}
            />
          </FormField>
        </>
      )}

      {/* OPERAÇÃO: APAGAR */}
      {operacao === 'apagar' && (
        <FormField label="Nome da variável" required>
          <TextInput
            value={params.nome_variavel || ''}
            onChange={(v) => updateField('nome_variavel', v)}
            placeholder=""
          />
        </FormField>
      )}
    </div>
  );
}
