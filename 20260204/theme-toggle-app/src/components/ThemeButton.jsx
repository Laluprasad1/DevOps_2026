export default function ThemeButton({ theme, onToggle }) {
  const isDark = theme === "dark";

  const buttonStyle = {
    padding: "10px 16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    backgroundColor: isDark ? "#f9fafb" : "#111827",
    color: isDark ? "#111827" : "#f9fafb",
    transition: "all 0.25s ease",
  };

  // Conditional rendering based on theme
  return (
    <button style={buttonStyle} onClick={onToggle}>
      {isDark ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode"}
    </button>
  );
}
