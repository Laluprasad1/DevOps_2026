export default function ThemeContent({ theme }) {
  const isDark = theme === "dark";

  // Conditional rendering based on theme
  return (
    <>
      <h1 style={{ marginTop: 0 }}>
        {isDark ? "🌙 Dark Mode Active" : "☀️ Light Mode Active"}
      </h1>

      <p style={{ lineHeight: 1.6 }}>
        {isDark
          ? "You're viewing the app in dark mode. Perfect for nighttime browsing!"
          : "You're viewing the app in light mode. Bright and cheerful!"}
      </p>

      {/* Additional conditional content based on theme */}
      {isDark ? (
        <div style={{ 
          backgroundColor: "#111827", 
          padding: "12px", 
          borderRadius: "8px",
          marginBottom: "16px",
          border: "1px solid #374151"
        }}>
          <p style={{ margin: 0, fontSize: "14px" }}>
            💡 Dark mode reduces eye strain in low-light environments.
          </p>
        </div>
      ) : (
        <div style={{ 
          backgroundColor: "#fef3c7", 
          padding: "12px", 
          borderRadius: "8px",
          marginBottom: "16px",
          border: "1px solid #fde68a",
          color: "#92400e"
        }}>
          <p style={{ margin: 0, fontSize: "14px" }}>
            ☀️ Light mode provides better readability in bright environments.
          </p>
        </div>
      )}
    </>
  );
}
