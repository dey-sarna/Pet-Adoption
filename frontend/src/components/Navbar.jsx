
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          PetAdopt
        </Link>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/pets">Pets</Link>
        </li>

        {user && (
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}

        {user && user.role === "admin" && (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        )}

        {user ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register" className="signup-btn">
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}