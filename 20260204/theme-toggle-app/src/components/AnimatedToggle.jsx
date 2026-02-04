export default function AnimatedToggle({ theme, onToggle }) {
  const isDark = theme === "dark";

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "20px 0",
  };

  const toggleStyle = {
    width: "60px",
    height: "30px",
    backgroundColor: isDark ? "#4f46e5" : "#94a3b8",
    borderRadius: "15px",
    position: "relative",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    border: "none",
    padding: 0,
  };

  const knobStyle = {
    width: "24px",
    height: "24px",
    backgroundColor: "#ffffff",
    borderRadius: "50%",
    position: "absolute",
    top: "3px",
    left: isDark ? "33px" : "3px",
    transition: "left 0.3s ease",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
  };

  const labelStyle = {
    fontSize: "14px",
    fontWeight: "500",
  };

  return (
    <div style={containerStyle}>
      <span style={labelStyle}>☀️ Light</span>
      <button style={toggleStyle} onClick={onToggle} aria-label="Toggle theme">
        <div style={knobStyle}>{isDark ? "🌙" : "☀️"}</div>
      </button>
      <span style={labelStyle}>🌙 Dark</span>
    </div>
  );
}
