export default function ThemeBadge({ theme }) {
  const isDark = theme === "dark";

  const badgeStyle = {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: 600,
    backgroundColor: isDark ? "#111827" : "#f3f4f6",
    border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
  };

  // Conditional rendering based on theme
  return (
    <span style={badgeStyle}>
      {isDark ? "🌙 " : "☀️ "}
      {theme.toUpperCase()}
    </span>
  );
}
