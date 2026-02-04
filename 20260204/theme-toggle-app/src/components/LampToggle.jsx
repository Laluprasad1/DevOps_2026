import { useState } from "react";
import lampImage from "../assets/lamp.png";

export default function LampToggle({ theme, onToggle }) {
  const [isPulling, setIsPulling] = useState(false);
  const [pullAmount, setPullAmount] = useState(0);
  
  const isDark = theme === "dark";

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0",
    margin: "30px 0",
    userSelect: "none",
    position: "relative",
  };

  const lampImageStyle = {
    width: "180px",
    height: "auto",
    display: "block",
    filter: isDark
      ? "brightness(0.6) saturate(0.8)"
      : "brightness(1.05) saturate(1.1)",
    transition: "filter 0.4s ease",
  };

  const imageGlowStyle = {
    position: "absolute",
    top: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "200px",
    height: "200px",
    background: "radial-gradient(circle, rgba(254, 240, 138, 0.35) 0%, transparent 65%)",
    opacity: isDark ? 0 : 1,
    transition: "opacity 0.4s ease",
    pointerEvents: "none",
  };

  const wireStyle = {
    width: "3px",
    height: isPulling ? `${50 + pullAmount}px` : "50px",
    backgroundColor: isDark ? "#6b7280" : "#0ea5e9",
    position: "absolute",
    left: "132px",
    top: "90px",
    transition: isPulling ? "none" : "height 0.3s ease",
    borderRadius: "2px",
  };

  const pullChainStyle = {
    width: "14px",
    height: "30px",
    backgroundColor: isDark ? "#9ca3af" : "#0284c7",
    borderRadius: "50%",
    cursor: "grab",
    position: "absolute",
    left: "126px",
    top: isPulling ? `${120 + pullAmount}px` : "120px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
    transition: isPulling ? "none" : "top 0.3s ease, transform 0.2s ease",
    transform: isPulling ? "scale(1.2)" : "scale(1)",
  };

  const lightRaysStyle = {
    position: "absolute",
    top: "70px",
    left: "40%",
    transform: "translateX(-50%)",
    width: "0",
    height: "0",
    borderLeft: "110px solid transparent",
    borderRight: "110px solid transparent",
    borderBottom: isDark ? "170px solid transparent" : "170px solid rgba(254, 240, 138, 0.15)",
    transition: "border-bottom 0.4s ease",
    pointerEvents: "none",
  };

  const handleMouseDown = (e) => {
    setIsPulling(true);
    e.target.style.cursor = "grabbing";
  };

  const handleMouseUp = (e) => {
    setIsPulling(false);
    setPullAmount(0);
    e.target.style.cursor = "grab";
    
    // Toggle theme when released
    onToggle();
  };

  const handleMouseMove = (e) => {
    if (isPulling) {
      const deltaY = Math.max(0, Math.min(e.movementY * 2, 40));
      setPullAmount((prev) => Math.max(0, Math.min(prev + deltaY, 70)));
    }
  };

  const handleClick = () => {
    // Simple click also toggles
    setIsPulling(true);
    setPullAmount(30);
    setTimeout(() => {
      setIsPulling(false);
      setPullAmount(0);
      onToggle();
    }, 200);
  };

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: "center", marginBottom: "10px", fontSize: "14px", fontWeight: "500" }}>
        {isDark ? "💡 Pull to turn ON the light" : "💡 Pull to turn OFF the light"}
      </div>
      
      <div style={{ position: "relative", width: "220px", height: "360px" }}>
        <div style={imageGlowStyle}></div>
        <img src={lampImage} alt="Lamp" style={lampImageStyle} />
        <div style={lightRaysStyle}></div>

        <div
          style={wireStyle}
          onMouseMove={handleMouseMove}
        ></div>
        <div
          style={pullChainStyle}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            if (isPulling) {
              setIsPulling(false);
              setPullAmount(0);
              onToggle();
            }
          }}
          onClick={handleClick}
        ></div>
      </div>

      <div style={{ 
        marginTop: "20px", 
        fontSize: "12px", 
        color: isDark ? "#9ca3af" : "#6b7280",
        textAlign: "center"
      }}>
        {isDark ? "🌙 Lamp is OFF" : "☀️ Lamp is ON"}
      </div>
    </div>
  );
}
