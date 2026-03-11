<div className="flex flex-col items-center w-[72px] min-w-[72px] h-screen bg-[#EBF1FA] py-3 gap-1 z-20">
      {/* Sidebar toggle */}
      <button
        onClick={() => {
          if (location.pathname === "/crm") return;
          setExpandedRail(expandedRail ? null : (crmRailItems.find(r => r.sections) || crmRailItems[0]).id);
        }}
        className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors mb-4 mt-1 shrink-0 ${
          location.pathname === "/crm"
            ? "text-[#98989d] cursor-default"
            : "text-[#4E6987] hover:bg-[#28415C]/10 hover:text-[#28415C] cursor-pointer"
        }`}
        disabled={location.pathname === "/crm"}
      >
        <SidebarIcon size={20} weight="duotone" />
      </button>

      {/* Nav items */}
      <div className="flex flex-col items-center gap-4 flex-1">
        {crmRailItems.map((item) => {
          const ownsPath = railOwnsPath(item, location.pathname);
          const firstOwner = crmRailItems.find((ri) => railOwnsPath(ri, location.pathname));
          const isActive = ownsPath && firstOwner?.id === item.id;
          const isExpanded = expandedRail === item.id;
          const highlighted = isActive || isExpanded;

          return (
            <button
              key={item.id}
              onClick={() => handleRailClick(item)}
              className="flex flex-col items-center gap-0.5 transition-all group cursor-pointer"
            >
              {/* Icon pill */}
              <div
                className={`relative flex items-center justify-center h-[32px] rounded-full transition-all ${
                  highlighted
                    ? "w-[42px] bg-[#28415C] text-[#F6F7F9] backdrop-blur-[50px]"
                    : "w-[32px] text-[#4E6987] group-hover:w-[42px] group-hover:bg-[#28415C]/10 group-hover:text-[#28415C]"
                }`}
                style={
                  highlighted
                    ? { boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" }
                    : undefined
                }
              >
                <span className="flex items-center justify-center">
                  {highlighted ? item.activeIcon : item.icon}
                </span>
                {highlighted && (
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ border: "0.7px solid rgba(200,207,219,0.6)" }}
                  />
                )}
              </div>
              {/* Label */}
              <span
                className={`transition-colors ${highlighted ? "text-[#28415C]" : "text-[#4E6987] group-hover:text-[#28415C]"}`}
                style={{
                  fontSize: 11,
                  fontWeight: highlighted ? 700 : 500,
                  letterSpacing: -0.5,
                  lineHeight: "22px",
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Divider + Atalho */}
        <div className="flex flex-col items-center gap-4 pt-1">
          <svg width="23" height="2" viewBox="0 0 23 2" fill="none" className="shrink-0">
            <path d="M1 1H22" stroke="#98989D" strokeLinecap="round" strokeWidth="2" />
          </svg>

          <button
            onClick={() => navigate("/crm/atalho")}
            className="flex flex-col items-center gap-0.5 transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-center h-[32px] w-[32px] rounded-full text-[#4E6987] group-hover:w-[42px] group-hover:bg-[#28415C]/10 group-hover:text-[#28415C] transition-all">
              <SelectionPlus size={20} weight="duotone" />
            </div>
            <span
              className="text-[#4E6987] group-hover:text-[#28415C] transition-colors"
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: -0.5,
                lineHeight: "22px",
              }}
            >
              Atalho
            </span>
          </button>
        </div>
      </div>

      {/* App Drawer bottom */}
      <div className="mt-auto pt-3">
        {/* User avatar with sign out */}
        {user && (
          <div className="flex flex-col items-center gap-2 mb-2">
            <button
              onClick={signOut}
              title="Sair"
              className="flex items-center justify-center w-10 h-10 rounded-xl text-[#4E6987] hover:bg-[#FFEDEB] hover:text-[#f56233] cursor-pointer transition-all"
            >
              <SignOut size={18} weight="duotone" />
            </button>
            {user.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt=""
                className="w-[32px] h-[32px] rounded-full object-cover ring-2 ring-[#DDE3EC]"
              />
            ) : (
              <div
                className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-[#0483AB] text-white"
                style={{ fontSize: 12, fontWeight: 700 }}
                title={user.email ?? ""}
              >
                {(user.user_metadata?.name || user.email || "U").charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        )}
        <div className="relative" ref={appDrawerRef}>
          <div
            onClick={() => setShowAppDrawer(v => !v)}
            className={`relative flex items-center justify-center h-[32px] rounded-full cursor-pointer transition-all ${
              showAppDrawer
                ? "w-[42px] bg-[#28415C] text-[#F6F7F9] backdrop-blur-[50px]"
                : "w-[32px] text-[#4E6987] hover:w-[42px] hover:bg-[#28415C]/10 hover:text-[#28415C]"
            }`}
            style={showAppDrawer ? { boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" } : undefined}
          >
            <DotsNine size={20} weight={showAppDrawer ? "fill" : "duotone"} />
            {showAppDrawer && (
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ border: "0.7px solid rgba(200,207,219,0.6)" }}
              />
            )}
          </div>

          <AnimatePresence>
            {showAppDrawer && (
              <AppDrawer
                currentAppId="crm"
                onNavigate={(route) => navigate(route)}
                onClose={() => setShowAppDrawer(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>