import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";


import "./styles/navbar.css";
import "./styles/footer.css";
import "./styles/home.css";
import "./styles/register.css";
import "./styles/login.css";
import "./styles/dashboard.css";
import "./styles/profile.css";
import "./styles/pet.css";
import "./styles/petDetails.css";
import "./styles/adoptionForm.css";
import "./styles/applications.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);