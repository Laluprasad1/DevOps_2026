export default function KeyboardShortcut({ theme }) {
  const isDark = theme === "dark";

  const tipStyle = {
    marginTop: "20px",
    padding: "12px",
    borderRadius: "8px",
    backgroundColor: isDark ? "#1e293b" : "#f8fafc",
    border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
    fontSize: "13px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const keyStyle = {
    backgroundColor: isDark ? "#374151" : "#ffffff",
    padding: "4px 8px",
    borderRadius: "4px",
    fontFamily: "monospace",
    fontWeight: "600",
    border: isDark ? "1px solid #4b5563" : "1px solid #cbd5e1",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  };

  return (
    <div style={tipStyle}>
      <span>💡 Tip: Press</span>
      <kbd style={keyStyle}>T</kbd>
      <span>to toggle theme quickly!</span>
    </div>
  );
}
