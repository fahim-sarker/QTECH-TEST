import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./Routes/Router";
import { Provider } from "react-redux";
import store from "./store";
import { ContextApi } from "./Hooks/ContextApi";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <ContextApi>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ContextApi>
  </StrictMode>
);
