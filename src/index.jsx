import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import App from "./App";
import Login from "./components/login";

const root = createRoot(document.getElementById("root"));

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function RootRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginWrapper />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AppWrapper />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

// Needs to be defined INSIDE <Router> to use useNavigate
function LoginWrapper() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    navigate("/home");
  };

  return <Login onLogin={handleLogin} />;
}

function AppWrapper() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return <App onLogout={handleLogout} />;
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RootRoutes />
    </BrowserRouter>
  </React.StrictMode>
);