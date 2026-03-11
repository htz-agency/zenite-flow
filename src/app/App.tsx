import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            fontFamily: 'DM Sans, sans-serif',
            fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'",
          },
        }}
      />
    </>
  );
}

export default App;