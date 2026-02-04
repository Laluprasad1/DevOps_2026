export default function ThemeStats({ theme, switchCount }) {
  const isDark = theme === "dark";

  const statsContainerStyle = {
    marginTop: "20px",
    padding: "16px",
    borderRadius: "12px",
    backgroundColor: isDark ? "#111827" : "#f3f4f6",
    border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
  };

  const statItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
  };

  const badgeStyle = {
    backgroundColor: isDark ? "#4f46e5" : "#3b82f6",
    color: "#ffffff",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
  };

  return (
    <div style={statsContainerStyle}>
      <h3 style={{ marginTop: 0, fontSize: "16px", marginBottom: "12px" }}>
        📊 Theme Statistics
      </h3>
      <div style={statItemStyle}>
        <span>Theme Switches:</span>
        <span style={badgeStyle}>{switchCount}</span>
      </div>
      <div style={statItemStyle}>
        <span>Current Mode:</span>
        <span style={badgeStyle}>{isDark ? "🌙 Dark" : "☀️ Light"}</span>
      </div>
      <div style={statItemStyle}>
        <span>Preference Saved:</span>
        <span style={badgeStyle}>✓ Yes</span>
      </div>
    </div>
  );
}
