
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

import Pet from "./pages/Pet";
import PetDetails from "./pages/PetDetails";
import AdoptionForm from "./pages/AdoptionForm";

import Applications from "./pages/Applications";
import AdminDashboard from "./pages/AdminDashboard";

import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* User */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />

          {/* Pets */}
          <Route path="/pets" element={<Pet />} />
          <Route path="/pets/:id" element={<PetDetails />} />

          {/* Adoption Form */}
          <Route path="/adoption-form/:id" element={<AdoptionForm />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* User Apps */}
          <Route path="/applications" element={<Applications />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}