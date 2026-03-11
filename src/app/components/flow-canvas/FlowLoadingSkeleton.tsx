const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

export default function FlowLoadingSkeleton() {
  return (
    <div className="w-full h-full flex flex-col bg-[#F6F7F9]">
      {/* Header Skeleton */}
      <div className="w-full h-[66px] bg-white border-b border-[#DDE3EC] flex items-center justify-between px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <div className="w-[200px] h-[32px] bg-[#EBF1FA] rounded-lg animate-pulse" />
        </div>
        
        {/* Right side */}
        <div className="flex items-center gap-3">
          <div className="w-[100px] h-[34px] bg-[#EBF1FA] rounded-full animate-pulse" />
          <div className="w-[120px] h-[34px] bg-[#EBF1FA] rounded-full animate-pulse" />
        </div>
      </div>

      {/* Canvas Skeleton */}
      <div className="flex-1 relative bg-[#F6F7F9] flex items-center justify-center">
        {/* Background dots pattern */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle, #D8D8E8 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
          }}
        />
        
        {/* Loading message */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 border-4 border-[#DDE3EC] border-t-[#0483AB] rounded-full animate-spin" />
            <span 
              className="text-[#4E6987]"
              style={{ fontSize: 16, fontWeight: 600, letterSpacing: -0.3, ...ff }}
            >
              Carregando fluxo...
            </span>
          </div>
          
          {/* Skeleton nodes */}
          <div className="flex gap-6 mt-8">
            <div className="w-[240px] h-[80px] bg-white rounded-xl border-2 border-[#DDE3EC] shadow-sm animate-pulse" />
            <div className="w-[240px] h-[80px] bg-white rounded-xl border-2 border-[#DDE3EC] shadow-sm animate-pulse" />
            <div className="w-[240px] h-[80px] bg-white rounded-xl border-2 border-[#DDE3EC] shadow-sm animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
