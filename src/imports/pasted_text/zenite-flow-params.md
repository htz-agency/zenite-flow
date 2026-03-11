# Zenite Flow — Referência de Parâmetros dos Nós
> Baseado na estrutura do n8n. Cada nó tem: **aba Parâmetros** (configuração funcional) + **aba Configurações** (comportamento de execução).

---

## ⚙️ ABA CONFIGURAÇÕES — Presente em TODOS os nós

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `nome_exibicao` | string | Nome personalizado do nó no canvas |
| `notas` | string (textarea) | Anotações internas |
| `exibir_nota_no_canvas` | boolean | Mostra a nota abaixo do nó |
| `sempre_retornar_dados` | boolean | Retorna item vazio mesmo sem output |
| `executar_uma_vez` | boolean | Processa só o 1º item da entrada |
| `reintentar_em_falha` | boolean | Reexecuta o nó automaticamente se falhar |
| `numero_tentativas` | number | Qtd máxima de retentativas (default: 3) |
| `intervalo_tentativas_ms` | number | Espera entre tentativas em ms |
| `ao_falhar` | enum | `parar_fluxo` \| `continuar` \| `saida_de_erro` |

---

## ⚡ 1. GATILHOS
> n8n equivalente: Schedule Trigger, Webhook Trigger, Manual Trigger, App Triggers

### Parâmetro raiz
| Parâmetro | Tipo | Obrigatório |
|---|---|---|
| `tipo` | enum | ✅ |

### → tipo: `manual`
Sem parâmetros adicionais. Só para testes no editor.

### → tipo: `agendado`
| Parâmetro | Tipo | Obrigatório | Notas |
|---|---|---|---|
| `modo_agenda` | enum: `intervalo` \| `cron` | ✅ | |
| `intervalo` | number | Se modo=intervalo | |
| `unidade_intervalo` | enum: `segundos` \| `minutos` \| `horas` \| `dias` \| `semanas` \| `meses` | Se modo=intervalo | |
| `expressao_cron` | string | Se modo=cron | Ex: `0 9 * * 1-5` |
| `fuso_horario` | string | ✅ | Ex: `America/Sao_Paulo` |

### → tipo: `webhook`
| Parâmetro | Tipo | Obrigatório | Notas |
|---|---|---|---|
| `metodo_http` | enum: `GET` \| `POST` \| `PUT` \| `PATCH` \| `DELETE` | ✅ | |
| `caminho` | string | ✅ | Ex: `/meu-webhook` |
| `autenticacao` | enum: `nenhuma` \| `basica` \| `bearer` \| `header_customizado` \| `hmac` | ✅ | |
| `origens_permitidas_cors` | string | ❌ | |
| `resposta_imediata` | boolean | ❌ | Se false, aguarda fim do fluxo |
| `codigo_resposta_padrao` | number | ❌ | Default: 200 |

### → tipo: `evento_app`
| Parâmetro | Tipo | Obrigatório |
|---|---|---|
| `aplicativo` | dropdown (integrações disponíveis) | ✅ |
| `credenciais` | credential reference | ✅ |
| `evento` | dropdown (eventos do app) | ✅ |
| `filtros_evento` | key-value pairs | ❌ |

### → tipo: `formulario`
| Parâmetro | Tipo | Obrigatório |
|---|---|---|
| `titulo_formulario` | string | ✅ |
| `descricao` | string | ❌ |
| `campos` | array de campos do form | ✅ |
| `botao_envio` | string | ❌ |
| `pagina_apos_envio` | enum: `padrao` \| `url_customizada` | ❌ |

### → tipo: `erro`
| Parâmetro | Tipo | Obrigatório |
|---|---|---|
| `fluxo_monitorado` | workflow reference | ❌ | Se vazio, captura erros de qualquer fluxo |

---

## ▶️ 2. AÇÕES
> n8n equivalente: App nodes (Gmail, Slack, HTTP Request, etc.)

| Parâmetro | Tipo | Obrigatório | Notas |
|---|---|---|---|
| `aplicativo` | dropdown | ✅ | Lista de integrações |
| `credenciais` | credential reference | ✅ | |
| `recurso` | dropdown | ✅ | Ex: Mensagem, Arquivo, Contato |
| `operacao` | dropdown | ✅ | Ex: Criar, Buscar, Atualizar, Deletar |
| *(campos dinâmicos)* | varia | Varia | Gerados conforme recurso + operação |
| `campos_adicionais` | expandable section | ❌ | Parâmetros opcionais do recurso |

---

## ⑂ 3. BIFURCAÇÃO
> n8n equivalente: não tem equivalente direto (paralelismo nativo)

| Parâmetro | Tipo | Obrigatório | Notas |
|---|---|---|---|
| `numero_ramificacoes` | number (min: 2) | ✅ | |
| `modo` | enum: `paralelo` \| `condicional` | ✅ | |
| `ramificacoes` | array | ✅ | |
| → `nome` | string | ✅ | Nome de cada branch |
| → `condicao` | expression | Se modo=condicional | |

---

## ➡️ 4. ROTA
> n8n equivalente: IF node, Switch node

| Parâmetro | Tipo | Obrigatório | Notas |
|---|---|---|---|
| `modo` | enum: `se_senao` \| `multiplas_rotas` | ✅ | |
| `rotas` | array | ✅ | |
| → `nome_rota` | string | ✅ | |
| → `campo_avaliado` | expression | ✅ | |
| → `operador` | enum | ✅ | `igual`, `diferente`, `contem`, `nao_contem`, `maior_que`, `menor_que`, `maior_igual`, `menor_igual`, `esta_vazio`, `nao_esta_vazio`, `comeca_com`, `termina_com`, `regex` |
| → `valor` | any | Depende do operador | |
| `combinacao_condicoes` | enum: `E` \| `OU` | ❌ | AND/OR para múltiplas condições por rota |
| `rota_padrao` | string | ❌ | Fallback se nenhuma condição bater |

---

## 🔁 5. REPETIÇÃO
> n8n equivalente: Loop Over Items, Split in Batches

| Parâmetro | Tipo | Obrigatório | Notas |
|---|---|---|---|
| `tipo` | enum: `sobre_lista` \| `numero_fixo` \| `ate_condicao` | ✅ | |
| **Se tipo = sobre_lista** | | | |
| `lista` | expression | ✅ | Deve resolver para array |
| `variavel_item_atual` | string | ✅ | Default: `item_atual` |
| `variavel_indice` | string | ❌ | Default: `indice` |
| `tamanho_lote` | number | ❌ | Processa em batches |
| **Se tipo = numero_fixo** | | | |
| `quantidade` | number | ✅ | |
| `variavel_contador` | string | ❌ | Default: `contador` |
| **Se tipo = ate_condicao** | | | |
| `condicao` | expression | ✅ | Deve resolver para boolean |
| `limite_maximo` | number | ✅ | Proteção contra loop infinito |

---

## ⏳ 6. TEMPO
> n8n equivalente: Wait node

| Parâmetro | Tipo | Obrigatório | Notas |
|---|---|---|---|
| `tipo` | enum: `duracao_fixa` \| `ate_data_hora` \| `ate_webhook` | ✅ | |
| **Se tipo = duracao_fixa** | | | |
| `valor` | number | ✅ | |
| `unidade` | enum: `segundos` \| `minutos` \| `horas` \| `dias` | ✅ | |
| **Se tipo = ate_data_hora** | | | |
| `data_hora` | datetime expression | ✅ | |
| `fuso_horario` | string | ✅ | Ex: `America/Sao_Paulo` |
| **Se tipo = ate_webhook** | | | |
| `url_retomada` | string (readonly) | — | Gerado automaticamente |
| `tempo_limite` | number | ✅ | |
| `unidade_limite` | enum: `minutos` \| `horas` \| `dias` | ✅ | |
| `acao_timeout` | enum: `falhar` \| `prosseguir` | ✅ | |

---

## ⑃ 7. JUNÇÃO
> n8n equivalente: Merge node

| Parâmetro | Tipo | Obrigatório | Notas |
|---|---|---|---|
| `modo` | enum: `aguardar_todos` \| `primeiro_a_terminar` \| `combinar_dados` | ✅ | |
| **Se modo = combinar_dados** | | | |
| `estrategia` | enum: `juntar_por_campo` \| `acrescentar` \| `mesclar` | ✅ | |
| `campo_chave` | string | Se estrategia=juntar_por_campo | |
| `remover_duplicatas` | boolean | ❌ | |

---

## ≡ 8. FILTRO
> n8n equivalente: Filter node

| Parâmetro | Tipo | Obrigatório | Notas |
|---|---|---|---|
| `condicoes` | array | ✅ | |
| → `campo` | expression | ✅ | |
| → `operador` | enum | ✅ | Igual ao nó Rota |
| → `valor` | any | Depende do operador | |
| `combinacao` | enum: `E` \| `OU` | ✅ | AND/OR entre condições |
| `acao_para_excluidos` | enum: `descartar` \| `saida_separada` | ✅ | |

---

## 🔌 9. CONECTOR
> n8n equivalente: HTTP Request node

| Parâmetro | Tipo | Obrigatório | Notas |
|---|---|---|---|
| `tipo_conexao` | enum: `api_rest` \| `graphql` \| `banco_dados` \| `ftp` \| `smtp` | ✅ | |
| `url_base` | string | ✅ | |
| `metodo` | enum: `GET` \| `POST` \| `PUT` \| `PATCH` \| `DELETE` | ✅ | |
| `autenticacao` | enum: `nenhuma` \| `api_key` \| `oauth2` \| `bearer` \| `basica` \| `header_customizado` | ✅ | |
| `credenciais` | credential reference | Se autenticacao ≠ nenhuma | |
| `headers` | key-value pairs | ❌ | |
| `parametros_query` | key-value pairs | ❌ | |
| `corpo` | boolean | ❌ | Habilita envio de body |
| `tipo_corpo` | enum: `json` \| `form_data` \| `texto` \| `binario` | Se corpo=true | |
| `dados_corpo` | expression/object | Se corpo=true | |
| `paginacao` | boolean | ❌ | |
| `tipo_paginacao` | enum: `url_proxima` \| `offset` \| `cursor` | Se paginacao=true | |
| `tempo_limite_ms` | number | ❌ | Default: 30000 |
| `ignorar_ssl` | boolean | ❌ | |

---

## 🔗 10. WEBHOOKS
> n8n equivalente: Webhook node (entrada) + HTTP Request node (saída)

| Parâmetro | Tipo | Obrigatório | Notas |
|---|---|---|---|
| `modo` | enum: `receber` \| `enviar` | ✅ | |
| **Se modo = receber** | | | |
| `metodo_http` | enum | ✅ | |
| `caminho` | string | ✅ | |
| `resposta` | enum: `automatica` \| `personalizada` | ✅ | |
| `codigo_resposta` | number | Se resposta=personalizada | |
| `corpo_resposta` | expression | Se resposta=personalizada | |
| `autenticacao` | enum: `nenhuma` \| `basica` \| `bearer` \| `hmac` | ✅ | |
| `segredo_hmac` | string | Se autenticacao=hmac | |
| **Se modo = enviar** | | | |
| `url` | string | ✅ | |
| `metodo_http` | enum | ✅ | |
| `headers` | key-value pairs | ❌ | |
| `tipo_corpo` | enum: `json` \| `form_data` \| `texto` \| `binario` | ❌ | |
| `dados` | expression/object | ❌ | |

---

## </> 11. SCRIPT
> n8n equivalente: Code node

| Parâmetro | Tipo | Obrigatório | Notas |
|---|---|---|---|
| `linguagem` | enum: `javascript` \| `python` | ✅ | |
| `modo` | enum: `executar_uma_vez` \| `executar_por_item` | ✅ | |
| `codigo` | code editor | ✅ | |
| `variaveis_entrada` | array de strings | ❌ | Variáveis disponíveis no contexto |
| `timeout_ms` | number | ❌ | Default: 10000 |

---

## ✅ 12. APROVAÇÃO
> n8n equivalente: Wait node + Form (human-in-the-loop)

| Parâmetro | Tipo | Obrigatório | Notas |
|---|---|---|---|
| `tipo_aprovador` | enum: `usuario_especifico` \| `grupo` \| `email_externo` | ✅ | |
| `aprovador` | string/expression | ✅ | User ID, nome do grupo ou e-mail |
| `titulo` | string | ✅ | |
| `mensagem` | string/expression | ✅ | Contexto exibido para o aprovador |
| `opcoes_resposta` | array | ✅ | |
| → `rotulo` | string | ✅ | Ex: "Aprovar", "Rejeitar" |
| → `valor` | string | ✅ | Valor salvo no output |
| → `cor` | enum: `verde` \| `vermelho` \| `amarelo` \| `azul` \| `cinza` | ❌ | |
| `tempo_limite` | number | ❌ | |
| `unidade_limite` | enum: `minutos` \| `horas` \| `dias` | Se tempo_limite definido | |
| `acao_timeout` | enum: `aprovar_auto` \| `rejeitar_auto` \| `escalar` \| `prosseguir` | Se tempo_limite definido | |
| `variavel_saida` | string | ❌ | Default: `resposta_aprovacao` |

---

## 🤖 13. TURING
> n8n equivalente: AI Agent node, OpenAI node, Anthropic node

| Parâmetro | Tipo | Obrigatório | Notas |
|---|---|---|---|
| `tipo` | enum: `chat` \| `completar_texto` \| `agente` \| `classificar` \| `extrair_dados` | ✅ | |
| `provedor` | enum: `openai` \| `anthropic` \| `google` \| `custom` | ✅ | |
| `modelo` | dropdown (baseado no provedor) | ✅ | Ex: `gpt-4o`, `claude-3-5-sonnet` |
| `credenciais` | credential reference | ✅ | |
| `prompt_sistema` | string/expression (textarea) | ❌ | System message |
| `prompt_usuario` | string/expression | ✅ | |
| `temperatura` | number (0–2) | ❌ | Default: 1 |
| `max_tokens` | number | ❌ | |
| `formato_saida` | enum: `texto_livre` \| `json` \| `campo_especifico` | ✅ | |
| `schema_json` | JSON editor | Se formato=json | |
| `campo_saida` | string | Se formato=campo_especifico | |
| **Se tipo = agente** | | | |
| `ferramentas` | array de referências de nós | ❌ | Sub-fluxos ou nós disponíveis como tools |
| `memoria` | enum: `nenhuma` \| `janela` \| `completa` | ❌ | |
| `tamanho_janela` | number | Se memoria=janela | |

---

## 𝚺 14. VARIÁVEL
> n8n equivalente: Edit Fields (Set) node + global variables

| Parâmetro | Tipo | Obrigatório | Notas |
|---|---|---|---|
| `operacao` | enum: `definir` \| `ler` \| `incrementar` \| `decrementar` \| `apagar` | ✅ | |
| `escopo` | enum: `fluxo` \| `execucao` \| `global` | ✅ | |
| `variaveis` | array | ✅ | |
| → `nome` | string | ✅ | |
| → `tipo` | enum: `texto` \| `numero` \| `booleano` \| `objeto` \| `lista` \| `data` | ✅ | |
| → `valor` | expression/any | Se operacao=definir | |

---

## 🖼️ 15. MOLDE
> n8n equivalente: não tem equivalente direto (similar a template engines)

| Parâmetro | Tipo | Obrigatório | Notas |
|---|---|---|---|
| `tipo_molde` | enum: `texto` \| `html` \| `markdown` \| `json` \| `email` | ✅ | |
| `conteudo` | code/text editor | ✅ | Suporta `{{ variavel }}` |
| `variaveis` | key-value pairs | ❌ | Mapeamento explícito de variáveis |
| `codificacao_saida` | enum: `utf-8` \| `base64` | ❌ | |
| `nome_variavel_saida` | string | ❌ | Default: `molde_saida` |

---

## 🔔 16. NOTIFICAÇÕES
> n8n equivalente: Send Email node, Slack node, Telegram node, etc.

| Parâmetro | Tipo | Obrigatório | Notas |
|---|---|---|---|
| `canal` | enum: `email` \| `push` \| `sms` \| `slack` \| `teams` \| `telegram` \| `whatsapp` \| `webhook` | ✅ | |
| `credenciais` | credential reference | Depende do canal | |
| **Canal = email** | | | |
| `para` | string/expression | ✅ | |
| `de` | string | ❌ | |
| `assunto` | string/expression | ✅ | |
| `corpo` | string/expression | ✅ | |
| `formato_corpo` | enum: `texto` \| `html` | ❌ | |
| `cc` | string | ❌ | |
| `cco` | string | ❌ | |
| `anexos` | expression (list of binary) | ❌ | |
| **Canal = slack / teams** | | | |
| `workspace_canal` | string/expression | ✅ | |
| `mensagem` | string/expression | ✅ | |
| `mencoes` | array | ❌ | |
| **Canal = sms / whatsapp** | | | |
| `numero_destino` | string/expression | ✅ | |
| `mensagem` | string/expression | ✅ | |

---

## 🔀 17. SUB-FLUXO
> n8n equivalente: Execute Sub-workflow node

| Parâmetro | Tipo | Obrigatório | Notas |
|---|---|---|---|
| `fluxo_filho` | dropdown / ID | ✅ | |
| `modo_execucao` | enum: `aguardar_resposta` \| `disparar_e_esquecer` | ✅ | |
| `modo_input` | enum: `definir_campos` \| `json_completo` \| `aceitar_tudo` | ✅ | |
| `dados_entrada` | key-value / expression | Se modo_input ≠ aceitar_tudo | |
| `timeout_ms` | number | ❌ | Só se modo=aguardar_resposta |
| `tratar_erro_filho` | enum: `propagar` \| `ignorar` \| `capturar` | ❌ | |

---

## 📋 18. REGISTRO
> n8n equivalente: não há equivalente direto no n8n (usa-se Code node para logging)

| Parâmetro | Tipo | Obrigatório | Notas |
|---|---|---|---|
| `nivel` | enum: `debug` \| `info` \| `aviso` \| `erro` \| `critico` | ✅ | |
| `mensagem` | string/expression | ✅ | |
| `dados_extras` | key-value / expression | ❌ | Campos adicionais ao log |
| `tag` | string | ❌ | Para filtrar logs depois |
| `destino` | enum: `log_interno` \| `sistema_externo` \| `banco_dados` | ✅ | |
| `credenciais_destino` | credential reference | Se destino ≠ log_interno | |
| `incluir_contexto_execucao` | boolean | ❌ | Inclui execution_id, timestamp, fluxo |

---

*Referência gerada com base na estrutura do n8n — adaptada para o Zenite Flow*