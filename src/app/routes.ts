import { createBrowserRouter, redirect } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { FlowEditorV2 } from "./pages/FlowEditorV2";
import { FlowCanvas } from "./pages/FlowCanvas";
import { Templates } from "./pages/Templates";
import { History } from "./pages/History";
import { Credentials } from "./pages/Credentials";
import { DesignSystem } from "./pages/DesignSystem";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "editor/:id", Component: FlowEditorV2 },
      { path: "flow-builder", Component: FlowCanvas },
      { path: "flow-builder/:id", Component: FlowCanvas },
      { path: "templates", Component: Templates },
      { path: "history", Component: History },
      { path: "credenciais", Component: Credentials },
      { path: "design-system", Component: DesignSystem },
      // Redirect old /canvas route to /flow-builder
      { path: "canvas", loader: () => redirect("/flow-builder") },
      { path: "canvas/:id", loader: ({ params }) => redirect(`/flow-builder/${params.id}`) },
    ],
  },
]);