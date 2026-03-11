import FormField from '../config-fields/FormField';
import TextInput from '../config-fields/TextInput';
import TextArea from '../config-fields/TextArea';
import Dropdown from '../config-fields/Dropdown';
import NumberInput from '../config-fields/NumberInput';
import Checkbox from '../config-fields/Checkbox';

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface GatilhoParamsProps {
  params: any;
  onChange: (params: any) => void;
}

export default function GatilhoParams({ params, onChange }: GatilhoParamsProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...params, [field]: value });
  };

  const tipo = params.tipo || '';

  return (
    <div className="flex flex-col gap-[20px]">
      {/* Tipo de gatilho */}
      <FormField label="Tipo de gatilho" required>
        <Dropdown
          value={tipo}
          onChange={(v) => updateField('tipo', v)}
          placeholder="Selecione o tipo"
          options={[
            { value: 'manual', label: 'Manual (Teste)' },
            { value: 'agendado', label: 'Agendado' },
            { value: 'webhook', label: 'Webhook' },
            { value: 'evento_app', label: 'Evento de App' },
            { value: 'formulario', label: 'Formulário' },
            { value: 'erro', label: 'Erro' },
          ]}
        />
      </FormField>

      {/* TIPO: AGENDADO */}
      {tipo === 'agendado' && (
        <>
          <FormField label="Modo de agenda" required>
            <Dropdown
              value={params.modo_agenda || ''}
              onChange={(v) => updateField('modo_agenda', v)}
              placeholder="Selecione o modo"
              options={[
                { value: 'intervalo', label: 'Intervalo' },
                { value: 'cron', label: 'Expressão Cron' },
              ]}
            />
          </FormField>

          {params.modo_agenda === 'intervalo' && (
            <>
              <div className="grid grid-cols-2 gap-[12px]">
                <FormField label="Intervalo" required>
                  <NumberInput
                    value={params.intervalo || 1}
                    onChange={(v) => updateField('intervalo', v)}
                    min={1}
                  />
                </FormField>
                <FormField label="Unidade" required>
                  <Dropdown
                    value={params.unidade_intervalo || 'minutos'}
                    onChange={(v) => updateField('unidade_intervalo', v)}
                    options={[
                      { value: 'segundos', label: 'Segundos' },
                      { value: 'minutos', label: 'Minutos' },
                      { value: 'horas', label: 'Horas' },
                      { value: 'dias', label: 'Dias' },
                      { value: 'semanas', label: 'Semanas' },
                      { value: 'meses', label: 'Meses' },
                    ]}
                  />
                </FormField>
              </div>
            </>
          )}

          {params.modo_agenda === 'cron' && (
            <FormField label="Expressão Cron" required description="Ex: 0 9 * * 1-5 (Segunda a Sexta às 9h)">
              <TextInput
                value={params.expressao_cron || ''}
                onChange={(v) => updateField('expressao_cron', v)}
                placeholder="0 9 * * 1-5"
              />
            </FormField>
          )}

          <FormField label="Fuso horário" required>
            <TextInput
              value={params.fuso_horario || 'America/Sao_Paulo'}
              onChange={(v) => updateField('fuso_horario', v)}
              placeholder="America/Sao_Paulo"
            />
          </FormField>
        </>
      )}

      {/* TIPO: WEBHOOK */}
      {tipo === 'webhook' && (
        <>
          <FormField label="Método HTTP" required>
            <Dropdown
              value={params.metodo_http || 'POST'}
              onChange={(v) => updateField('metodo_http', v)}
              options={[
                { value: 'GET', label: 'GET' },
                { value: 'POST', label: 'POST' },
                { value: 'PUT', label: 'PUT' },
                { value: 'PATCH', label: 'PATCH' },
                { value: 'DELETE', label: 'DELETE' },
              ]}
            />
          </FormField>

          <FormField label="Caminho" required description="Ex: /meu-webhook">
            <TextInput
              value={params.caminho || ''}
              onChange={(v) => updateField('caminho', v)}
              placeholder="/meu-webhook"
            />
          </FormField>

          <FormField label="Autenticação" required>
            <Dropdown
              value={params.autenticacao || 'nenhuma'}
              onChange={(v) => updateField('autenticacao', v)}
              options={[
                { value: 'nenhuma', label: 'Nenhuma' },
                { value: 'basica', label: 'Básica' },
                { value: 'bearer', label: 'Bearer Token' },
                { value: 'header_customizado', label: 'Header Customizado' },
                { value: 'hmac', label: 'HMAC' },
              ]}
            />
          </FormField>

          <Checkbox
            checked={params.resposta_imediata || false}
            onChange={(v) => updateField('resposta_imediata', v)}
            label="Resposta imediata"
            description="Se desmarcado, aguarda o fim do fluxo para responder"
          />

          <FormField label="Código de resposta padrão">
            <NumberInput
              value={params.codigo_resposta_padrao || 200}
              onChange={(v) => updateField('codigo_resposta_padrao', v)}
              min={100}
              max={599}
            />
          </FormField>
        </>
      )}

      {/* TIPO: EVENTO APP */}
      {tipo === 'evento_app' && (
        <>
          <FormField label="Aplicativo" required>
            <Dropdown
              value={params.aplicativo || ''}
              onChange={(v) => updateField('aplicativo', v)}
              placeholder="Selecione o app"
              options={[
                { value: 'gmail', label: 'Gmail' },
                { value: 'slack', label: 'Slack' },
                { value: 'zenite_crm', label: 'Zenite CRM' },
                { value: 'zenite_projects', label: 'Zenite Projects' },
              ]}
            />
          </FormField>

          <FormField label="Credenciais" required>
            <Dropdown
              value={params.credenciais || ''}
              onChange={(v) => updateField('credenciais', v)}
              placeholder="Selecione a credencial"
              options={[
                { value: 'cred_1', label: 'Conta Principal' },
                { value: 'cred_2', label: 'Conta Secundária' },
              ]}
            />
          </FormField>

          <FormField label="Evento" required>
            <Dropdown
              value={params.evento || ''}
              onChange={(v) => updateField('evento', v)}
              placeholder="Selecione o evento"
              options={[
                { value: 'novo_email', label: 'Novo email' },
                { value: 'mensagem_canal', label: 'Mensagem em canal' },
                { value: 'lead_criado', label: 'Lead criado' },
              ]}
            />
          </FormField>
        </>
      )}

      {/* TIPO: FORMULÁRIO */}
      {tipo === 'formulario' && (
        <>
          <FormField label="Título do formulário" required>
            <TextInput
              value={params.titulo_formulario || ''}
              onChange={(v) => updateField('titulo_formulario', v)}
              placeholder="Ex: Solicitação de Suporte"
            />
          </FormField>

          <FormField label="Descrição">
            <TextArea
              value={params.descricao || ''}
              onChange={(v) => updateField('descricao', v)}
              placeholder="Instruções para o usuário..."
              rows={3}
            />
          </FormField>

          <FormField label="Texto do botão de envio">
            <TextInput
              value={params.botao_envio || 'Enviar'}
              onChange={(v) => updateField('botao_envio', v)}
              placeholder="Enviar"
            />
          </FormField>
        </>
      )}

      {/* TIPO: MANUAL */}
      {tipo === 'manual' && (
        <div className="p-[16px] bg-[#EBF1FA] rounded-[10px]">
          <p className="text-[#4E6987]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}>
            Gatilho manual para testes. Execute o fluxo diretamente do editor clicando no botão "Testar".
          </p>
        </div>
      )}

      {/* TIPO: ERRO */}
      {tipo === 'erro' && (
        <>
          <FormField label="Fluxo monitorado" description="Deixe vazio para capturar erros de qualquer fluxo">
            <Dropdown
              value={params.fluxo_monitorado || ''}
              onChange={(v) => updateField('fluxo_monitorado', v)}
              placeholder="Todos os fluxos"
              options={[
                { value: '', label: 'Todos os fluxos' },
                { value: 'flow_1', label: 'Fluxo de Onboarding' },
                { value: 'flow_2', label: 'Fluxo de Vendas' },
              ]}
            />
          </FormField>
        </>
      )}
    </div>
  );
}
