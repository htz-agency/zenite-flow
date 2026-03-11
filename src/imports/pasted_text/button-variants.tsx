<Card>
          <SectionTitle>Botões</SectionTitle>
          <SectionSubtitle>
            Todos os botões usam rounded-[500px] (full pill), uppercase, font-bold, tracking-[0.5px], fontSize 10.
          </SectionSubtitle>

          {/* Primário Criação de Registro */}
          <Label>Primário Criação de Registro — PillButton (Novo Lead, Nova Conta, Novo Contato…)</Label>
          <div className="flex items-center gap-[10px] mb-[12px]">
            <button className="group/pill relative flex items-center gap-[3px] h-[40px] pl-[16px] pr-[20px] rounded-[100px] bg-[#dcf0ff] text-[#28415c] hover:bg-[#bcdaf1] hover:shadow-[0px_2px_4px_0px_rgba(18,34,50,0.3)] transition-all duration-150 cursor-pointer">
              <Plus size={16} weight="bold" />
              <span className="font-semibold" style={{ fontSize: 15, letterSpacing: -0.5, lineHeight: "22px" }}>
                Novo Dashboard
              </span>
            </button>
            <button className="group/pill relative flex items-center gap-[3px] h-[40px] pl-[16px] pr-[20px] rounded-[100px] bg-[#dcf0ff] text-[#28415c] hover:bg-[#bcdaf1] hover:shadow-[0px_2px_4px_0px_rgba(18,34,50,0.3)] transition-all duration-150 cursor-pointer">
              <Plus size={16} weight="bold" />
              <span className="font-semibold" style={{ fontSize: 15, letterSpacing: -0.5, lineHeight: "22px" }}>Adicionar Worksheet</span>
            </button>
          </div>
          <span className="text-[#98989d] font-mono block mb-[20px]" style={{ fontSize: 10 }}>
            bg-[#dcf0ff] text-[#28415c] · h-[40px] rounded-[100px] · font-semibold fontSize 15 · hover: bg-[#bcdaf1] + shadow · active: radial-gradient overlay
          </span>

          {/* Primário Ação */}
          <Label>Primário Ação — Aplicar, Salvar, Confirmar</Label>
          <div className="flex flex-col gap-[8px] mb-[20px]">
            <div className="flex items-center gap-[10px]">
              <button className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#3CCEA7] text-white hover:bg-[#30B893] transition-colors cursor-pointer">
                <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                  Aplicar
                </span>
              </button>
              <button className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#3CCEA7] text-white hover:bg-[#30B893] transition-colors cursor-pointer">
                <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                  Salvar
                </span>
              </button>
            </div>
            <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
              bg-[#3CCEA7] text-white — Salvar, Aplicar, Confirmar (sempre green)
            </span>
          </div>

          {/* Primário Ação — Check icon */}
          <Label>Primário Ação — Icon-only (Confirmar view)</Label>
          <div className="flex flex-col gap-[8px] mb-[20px]">
            <button className="flex items-center justify-center size-[34px] rounded-full bg-[#3CCEA7] text-white hover:bg-[#30B893] transition-colors cursor-pointer">
              <Check size={16} weight="bold" />
            </button>
            <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
              size-[34px] rounded-full bg-[#3CCEA7] — confirmar view/ação
            </span>
          </div>

          {/* Utilitário Azul */}
          <Label>Utilitário Azul — Ações secundárias (Salvar, Gerar link, Entrar)</Label>
          <div className="flex flex-col gap-[8px] mb-[20px]">
            <div className="flex items-center gap-[10px]">
              <button className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#F6F7F9] text-[#0483AB] hover:bg-[#DCF0FF] hover:text-[#0483AB] transition-colors cursor-pointer">
                <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                  Salvar
                </span>
              </button>
              <button className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#DCF0FF] text-[#0483AB] hover:bg-[#c5e5f7] transition-colors cursor-pointer">
                <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                  Exportar
                </span>
              </button>
            </div>
            <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
              bg-[#F6F7F9] / bg-[#DCF0FF] text-[#0483AB]
            </span>
          </div>

          {/* Neutro / Descartar */}
          <Label>Neutro — Cancelar, Descartar, Voltar</Label>
          <div className="flex flex-col gap-[8px] mb-[20px]">
            <div className="flex items-center gap-[10px]">
              <button className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#F6F7F9] text-[#4E6987] hover:bg-[#ebedf0] transition-colors cursor-pointer">
                <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                  Descartar
                </span>
              </button>
              <button className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#F6F7F9] text-[#4E6987] hover:bg-[#ebedf0] transition-colors cursor-pointer">
                <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                  Cancelar
                </span>
              </button>
            </div>
            <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
              bg-[#F6F7F9] text-[#4E6987] hover:bg-[#ebedf0]
            </span>
          </div>

          {/* Destrutivo */}
          <Label>Destrutivo — Cancelar view, Excluir, Remover</Label>
          <div className="flex flex-col gap-[8px] mb-[20px]">
            <div className="flex items-center gap-[10px]">
              <button className="flex items-center justify-center size-[34px] rounded-full bg-[#F6F7F9] text-[#F56233] hover:bg-[#FFEDEB] transition-colors cursor-pointer">
                <X size={16} weight="bold" />
              </button>
              <button className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#F6F7F9] text-[#F56233] hover:bg-[#FFEDEB] transition-colors cursor-pointer">
                <Trash size={14} weight="bold" />
                <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                  Excluir
                </span>
              </button>
            </div>
            <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
              bg-[#F6F7F9] text-[#F56233] · hover: bg-[#FFEDEB]
            </span>
          </div>

          {/* Filtro */}
          <Label>Botão Filtro — Toggle com estado ativo</Label>
          <div className="flex flex-col gap-[8px] mb-[20px]">
            <div className="flex items-center gap-[10px]">
            <button
              onClick={() => setFilterActive(!filterActive)}
              className={`relative flex items-center justify-center w-[34px] h-[34px] rounded-full transition-colors cursor-pointer ${
                filterActive
                  ? "bg-[#07ABDE] text-[#DCF0FF]"
                  : "bg-[#F6F7F9] text-[#0483AB] hover:bg-[#DCF0FF] hover:text-[#0483AB]"
              }`}
            >
              {filterActive ? <X size={14} weight="bold" /> : <FunnelSimple size={16} weight="bold" />}
            </button>
            {filterActive && (
              <div className="flex items-center gap-[4px] h-[28px] px-[10px] rounded-[500px] bg-[#DCF0FF] text-[#28415c]">
                <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 9, ...fontFeature }}>
                  2 filtros
                </span>
                <X size={10} weight="bold" />
              </div>
            )}
            </div>
            <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
              Inativo: bg-[#F6F7F9] text-[#0483AB] · Ativo: bg-[#07ABDE] text-[#DCF0FF]
            </span>
          </div>

          <Divider />

          {/* Footer pair pattern */}
          <Label>Par de Botões Footer — Painel lateral (Descartar + Salvar)</Label>
          <div className="flex items-center gap-[6px] max-w-[300px] mb-[12px]">
            <button className="flex items-center justify-center gap-[6px] h-[34px] px-[14px] rounded-[500px] bg-[#F6F7F9] text-[#4E6987] hover:bg-[#ebedf0] transition-colors cursor-pointer flex-1">
              <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                Descartar
              </span>
            </button>
            <button className="flex items-center justify-center gap-[6px] h-[34px] px-[14px] rounded-[500px] bg-[#3CCEA7] text-white hover:bg-[#30B893] transition-colors cursor-pointer flex-1">
              <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                Salvar
              </span>
            </button>
          </div>
          <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
            flex-1 cada · h-[34px] · Salvar sempre Primário Green · Sem ícone (exceto Spinner quando saving)
          </span>

          <Divider />

          {/* Disabled */}
          <Label>Desativado — Disabled state (cloud 200, cursor-not-allowed)</Label>
          <div className="flex flex-col gap-[8px] mb-[20px]">
            <div className="flex items-center gap-[10px]">
              <button disabled className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#D9D9D9] text-white cursor-not-allowed opacity-100">
                <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                  Salvar
                </span>
              </button>
              <button disabled className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#D9D9D9] text-white cursor-not-allowed opacity-100">
                <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                  Aplicar
                </span>
              </button>
              <button disabled className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#D9D9D9] text-white cursor-not-allowed opacity-100">
                <Trash size={14} weight="bold" />
                <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                  Excluir
                </span>
              </button>
            </div>
            <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
              bg-[#D9D9D9] text-white · cursor-not-allowed · sem hover · cloud 200
            </span>
          </div>

        </Card>