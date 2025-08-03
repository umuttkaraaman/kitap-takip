import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { EtiketProvider } from "./context/EtiketContext"; // ✅ bunu ekle

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EtiketProvider> {/* ✅ EtiketProvider'ı da ekledik */}
          <App />
        </EtiketProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
