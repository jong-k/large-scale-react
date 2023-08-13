import React from "react";
import ReactDOM from "react-dom/client";
import "./axios"; // axios default config 를 탑재
import App from "./App.tsx";
import "./styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
