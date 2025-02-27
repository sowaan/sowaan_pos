import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { FrappeProvider } from "frappe-react-sdk";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-tailwind/react";

import "./css/style.css";
import "./css/satoshi.css";
import { store } from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT ?? ""}>
      <Provider store={store}>
        <ThemeProvider>
          <Router basename={import.meta.env.VITE_BASE_PATH}>
            <App />
          </Router>
        </ThemeProvider>
      </Provider>
    </FrappeProvider>
  </StrictMode>
);
