import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import "./index.css";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

import Dashboard from "./components/Dashboard";
import Courses from "./components/Courses";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NavBar from "./components/NavBar";

function AppContent() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`app-wrapper ${theme}`}>
      <BrowserRouter>
        <NavBar />
        <main className="app-main">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/courses" element={<ProtectedRoute element={<Courses />} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;