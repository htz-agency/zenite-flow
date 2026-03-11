import { useEffect } from "react";
import { Plus, Key, Trash } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useCredentials } from "../../hooks/useCredentials";
import { Skeleton } from "../components/ui/skeleton";
import { supabase } from "../../lib/supabase";

const fontFeature = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

// Mapeia scopes para labels legíveis
function mapScope(scope: string): string | null {
  if (scope.includes('gmail')) return 'Gmail';
  if (scope.includes('calendar')) return 'Calendar';
  if (scope.includes('drive')) return 'Drive';
  if (scope.includes('spreadsheets')) return 'Sheets';
  if (scope.includes('documents')) return 'Docs';
  return null;
}

// Formata data relativa
function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffDays === 0) return 'hoje';
  if (diffDays === 1) return 'ontem';
  if (diffDays < 30) return `há ${diffDays} dias`;
  
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths === 1) return 'há 1 mês';
  if (diffMonths < 12) return `há ${diffMonths} meses`;
  
  const diffYears = Math.floor(diffDays / 365);
  return diffYears === 1 ? 'há 1 ano' : `há ${diffYears} anos`;
}

function CredentialCard({ credential, onDelete }: { credential: any; onDelete: (id: string) => void }) {
  const meta = credential.meta || {};
  const scopes = (meta.scopes || []).map(mapScope).filter(Boolean);
  const initial = meta.name?.[0]?.toUpperCase() || credential.name[0].toUpperCase();

  return (
    <div className="group relative bg-white rounded-[12px] p-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all">
      {/* Header */}
      <div className="flex items-start gap-[12px] mb-[12px]">
        {/* Avatar */}
        {meta.picture ? (
          <img
            src={meta.picture}
            alt={meta.name || credential.name}
            className="size-[48px] rounded-full object-cover"
          />
        ) : (
          <div className="size-[48px] rounded-full bg-[#E8E8FD] flex items-center justify-center">
            <span className="text-[#6868B1] font-bold" style={{ fontSize: 20, ...fontFeature }}>
              {initial}
            </span>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="text-[#1A1A2E] mb-[2px]" style={{ fontSize: 16, fontWeight: 700, letterSpacing: -0.3, ...fontFeature }}>
            {credential.name}
          </h3>
          
          {/* Badge de tipo */}
          <div className="flex items-center gap-[6px] mb-[4px]">
            <div
              className="flex items-center gap-[4px] h-[20px] px-[8px] rounded-[500px]"
              style={{ backgroundColor: "#DCF0FF" }}
            >
              <span
                className="uppercase whitespace-nowrap font-bold tracking-[0.5px]"
                style={{ fontSize: 8, color: "#07ABDE", ...fontFeature }}
              >
                {credential.type}
              </span>
            </div>
          </div>

          {/* Email */}
          {meta.email && (
            <p className="text-[#9B9BAD] truncate" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.2, ...fontFeature }}>
              {meta.email}
            </p>
          )}
        </div>
      </div>

      {/* Badge de status */}
      <div className="flex items-center gap-[8px] mb-[12px]">
        <div
          className="flex items-center gap-[4px] h-[24px] px-[10px] rounded-[500px]"
          style={{ backgroundColor: credential.is_valid ? "#D9F8EF" : "#FFE8E8" }}
        >
          <span
            className="uppercase whitespace-nowrap font-bold tracking-[0.5px]"
            style={{
              fontSize: 8,
              color: credential.is_valid ? "#135543" : "#FF6B6B",
              ...fontFeature,
            }}
          >
            {credential.is_valid ? "Conectado" : "Reconectar"}
          </span>
        </div>
      </div>

      {/* Chips de escopos */}
      {scopes.length > 0 && (
        <div className="flex items-center gap-[6px] mb-[16px] flex-wrap">
          {scopes.map((scope) => (
            <div
              key={scope}
              className="flex items-center gap-[4px] px-[10px] py-[4px] bg-[#F6F7F9] border border-[#EBEBF5] rounded-[8px]"
            >
              <span className="text-[#4A4A6A] whitespace-nowrap" style={{ fontSize: 11, fontWeight: 600, ...fontFeature }}>
                {scope}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-[#9B9BAD]" style={{ fontSize: 12, fontWeight: 500, ...fontFeature }}>
        <span>
          Conectado {meta.connected_at ? formatRelativeDate(meta.connected_at) : formatRelativeDate(credential.created_at)}
        </span>
        <button
          onClick={() => {
            if (confirm(`Deseja remover a credencial "${credential.name}"?`)) {
              onDelete(credential.id);
            }
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF6B6B] hover:text-[#FF4444]"
        >
          <Trash size={16} weight="bold" />
        </button>
      </div>
    </div>
  );
}

function CredentialCardSkeleton() {
  return (
    <div className="bg-white rounded-[12px] p-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="flex items-start gap-[12px] mb-[12px]">
        <Skeleton className="size-[48px] rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-[16px] w-[140px] mb-[6px]" />
          <Skeleton className="h-[20px] w-[120px] mb-[4px]" />
          <Skeleton className="h-[13px] w-[180px]" />
        </div>
      </div>
      <Skeleton className="h-[24px] w-[100px] mb-[12px]" />
      <div className="flex items-center gap-[6px] mb-[16px]">
        <Skeleton className="h-[24px] w-[60px] rounded-[8px]" />
        <Skeleton className="h-[24px] w-[70px] rounded-[8px]" />
        <Skeleton className="h-[24px] w-[50px] rounded-[8px]" />
      </div>
      <Skeleton className="h-[12px] w-[150px]" />
    </div>
  );
}

export function Credentials() {
  const { credentials, loading, deleteCredential } = useCredentials();

  const handleConnectGoogle = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const org_id = user?.user_metadata?.org_id;
    const user_id = user?.id;
    const supabaseUrl = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co`;
    window.location.href = `${supabaseUrl}/functions/v1/google-oauth-start?org_id=${org_id}&user_id=${user_id}&name=Google+Workspace`;
  };

  // Toast de retorno OAuth via URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sucesso = params.get('sucesso');
    const erro = params.get('erro');
    const email = params.get('email');
    if (sucesso === 'google_conectado') {
      toast.success(`Google conectado: ${email}`);
      window.history.replaceState({}, '', window.location.pathname);
    } else if (erro) {
      toast.error('Falha ao conectar Google', { description: erro });
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="px-[32px] pt-[28px] pb-[24px] border-b border-[#EBEBF5] bg-white">
        <div className="flex items-start justify-between mb-[16px]">
          <div>
            <h1 className="text-[#1A1A2E] mb-[4px]" style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5, ...fontFeature }}>
              Credenciais
            </h1>
            {loading ? (
              <Skeleton className="h-[14px] w-[120px]" />
            ) : (
              <p className="text-[#4A4A6A]" style={{ fontSize: 14, fontWeight: 500, letterSpacing: -0.3, ...fontFeature }}>
                {credentials.length} conectada{credentials.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          
          <button
            onClick={handleConnectGoogle}
            className="group/pill relative flex items-center gap-[3px] h-[40px] pl-[16px] pr-[20px] rounded-[100px] bg-[#dcf0ff] text-[#28415c] hover:bg-[#bcdaf1] hover:shadow-[0px_2px_4px_0px_rgba(18,34,50,0.3)] transition-all duration-150"
          >
            <Plus size={16} weight="bold" />
            <span className="font-semibold" style={{ fontSize: 15, letterSpacing: -0.5, lineHeight: "22px" }}>
              Conectar Google Workspace
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-[32px] py-[24px]">
        {loading ? (
          <div className="grid grid-cols-3 gap-[16px]">
            <CredentialCardSkeleton />
            <CredentialCardSkeleton />
            <CredentialCardSkeleton />
          </div>
        ) : credentials.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-[80px]">
            <Key size={64} weight="duotone" className="text-[#C8CFDB] mb-[16px]" />
            <h3 className="text-[#1A1A2E] mb-[8px]" style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.3, ...fontFeature }}>
              Nenhuma credencial conectada
            </h3>
            <p className="text-[#9B9BAD] mb-[20px]" style={{ fontSize: 14, fontWeight: 500, ...fontFeature }}>
              Conecte contas do Google Workspace para usar nos fluxos
            </p>
            <button
              onClick={handleConnectGoogle}
              className="flex items-center justify-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#3CCEA7] text-white hover:bg-[#30B893] transition-colors"
            >
              <Plus size={14} weight="bold" />
              <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                Conectar Google Workspace
              </span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-[16px]">
            {credentials.map((credential) => (
              <CredentialCard key={credential.id} credential={credential} onDelete={deleteCredential} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
