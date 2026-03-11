import { Outlet } from "react-router";
import { Sidebar } from "../components/Sidebar";

export function Root() {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
}
