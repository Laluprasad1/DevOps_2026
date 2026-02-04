export default function Card({ theme, children }) {
  const isDark = theme === "dark";

  const cardStyle = {
    width: "100%",
    maxWidth: "600px",
    borderRadius: "16px",
    padding: "32px",
    backgroundColor: isDark ? "#1f2937" : "#ffffff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
    border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
    transition: "all 0.25s ease",
    margin: "0 auto",
  };

  return <div style={cardStyle}>{children}</div>;
}
