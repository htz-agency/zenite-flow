import { Outlet } from "react-router";
import FlowSidebar from "./flow-sidebar";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

export default function FlowLayout() {
  return (
    <div className="flex h-screen bg-[#F6F7F9] font-['DM_Sans',sans-serif]" style={ff}>
      <FlowSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
