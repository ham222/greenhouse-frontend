import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { SessionProvider } from "./components/SessionProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <SessionProvider>
        <App />
      </SessionProvider>
    </HashRouter>
  </React.StrictMode>
);
