import { useEffect } from "react";
import Card from "./Card";
import ThemeBadge from "./ThemeBadge";
import ThemeButton from "./ThemeButton";
import ThemeContent from "./ThemeContent";
import LampToggle from "./LampToggle";
import ThemeStats from "./ThemeStats";
import KeyboardShortcut from "./KeyboardShortcut";
import useTheme from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme, switchCount, resetStats } = useTheme();

  const isDark = theme === "dark";

  // Keyboard shortcut: Press 'T' to toggle theme
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.toLowerCase() === "t" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // Only trigger if not typing in an input
        if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
          toggleTheme();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [toggleTheme]);

  const pageStyle = {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: isDark 
      ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" 
      : "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
    color: isDark ? "#f9fafb" : "#111827",
    transition: "all 0.4s ease",
    padding: "24px",
    boxSizing: "border-box",
  };

  const resetButtonStyle = {
    marginTop: "12px",
    padding: "6px 12px",
    fontSize: "12px",
    backgroundColor: isDark ? "#374151" : "#e5e7eb",
    color: isDark ? "#f9fafb" : "#111827",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  return (
    <div style={pageStyle}>
      {/* Passing theme as props to Card component */}
      <Card theme={theme}>
        {/* Passing theme as props to ThemeContent component */}
        <ThemeContent theme={theme} />

        <p style={{ marginTop: "16px" }}>
          Current theme: {/* Passing theme as props to ThemeBadge component */}
          <ThemeBadge theme={theme} />
        </p>

        <hr style={{ 
          margin: "24px 0", 
          border: "none", 
          borderTop: isDark ? "1px solid #374151" : "1px solid #e5e7eb" 
        }} />

        {/* Interactive lamp toggle */}
        <LampToggle theme={theme} onToggle={toggleTheme} />

        {/* Keyboard shortcut tip */}
        <KeyboardShortcut theme={theme} />

        {/* Theme statistics */}
        <ThemeStats theme={theme} switchCount={switchCount} />

        <button 
          style={resetButtonStyle} 
          onClick={resetStats}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = isDark ? "#4b5563" : "#d1d5db";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = isDark ? "#374151" : "#e5e7eb";
          }}
        >
          🔄 Reset Statistics
        </button>
      </Card>
    </div>
  );
}