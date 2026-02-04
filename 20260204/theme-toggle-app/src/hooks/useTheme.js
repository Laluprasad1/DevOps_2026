import { useState, useEffect } from "react";

export default function useTheme() {
  // Check system preference first, then localStorage, default to "light"
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    
    return "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [switchCount, setSwitchCount] = useState(() => {
    return parseInt(localStorage.getItem("switchCount") || "0");
  });

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  // Save switch count to localStorage
  useEffect(() => {
    localStorage.setItem("switchCount", switchCount.toString());
  }, [switchCount]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = (e) => {
      const autoDetected = localStorage.getItem("autoDetect");
      if (autoDetected === "true") {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    setSwitchCount((prev) => prev + 1);
  };

  const resetStats = () => {
    setSwitchCount(0);
  };

  return { theme, toggleTheme, switchCount, resetStats };
}
