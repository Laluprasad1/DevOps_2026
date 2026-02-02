import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Counter.css";

function Counter() {
  // 1️⃣ Initialize state
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("dark");
  const [shatterKey, setShatterKey] = useState(0);
  const [currentKey, setCurrentKey] = useState(0);
  const [pieces, setPieces] = useState([]);
  const [stepSize, setStepSize] = useState(1);
  const [history, setHistory] = useState([0]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [confetti, setConfetti] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const prevCountRef = useRef(count);
  const holdIntervalRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Sound effects
  const playSound = useCallback((frequency, duration = 100) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  }, []);

  // Confetti animation
  const triggerConfetti = useCallback(() => {
    const newConfetti = Array.from({ length: 50 }).map((_, i) => ({
      id: `confetti-${Date.now()}-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
      duration: 2 + Math.random() * 1,
      color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731', '#5f27cd'][Math.floor(Math.random() * 5)]
    }));
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 3000);
  }, []);

  // Check for milestones
  useEffect(() => {
    if ([100, 500, 1000].includes(Math.abs(count))) {
      triggerConfetti();
      playSound(800, 200);
    }
  }, [count, triggerConfetti, playSound]);

  // 2️⃣ Handler functions and piece creation
  const createPieces = useCallback((value) => {
    return String(value)
      .split("")
      .flatMap((digit, digitIndex) =>
        Array.from({ length: 25 }).map((_, pieceIndex) => {
          // Create radial explosion pattern
          const angle = (Math.PI * 2 * pieceIndex) / 25 + (Math.random() - 0.5) * 0.5;
          const distance = 120 + Math.random() * 100;
          const offsetX = Math.cos(angle) * distance;
          const offsetY = Math.sin(angle) * distance;
          const rotate = Math.random() * 1080 - 540;
          const scale = 0.2 + Math.random() * 0.5;
          return {
            id: `${value}-${digitIndex}-${pieceIndex}-${shatterKey}`,
            digit,
            digitIndex,
            pieceIndex,
            offsetX,
            offsetY,
            rotate,
            scale,
          };
        })
      );
  }, [shatterKey]);

  useEffect(() => {
    const previousValue = prevCountRef.current;
    if (previousValue !== count) {
      setPieces(createPieces(previousValue));
      setShatterKey((value) => value + 1);
      setCurrentKey((value) => value + 1);
      prevCountRef.current = count;
    }
  }, [count, createPieces]);

  const addToHistory = useCallback((newValue) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(newValue);
      if (newHistory.length > 11) newHistory.shift();
      return newHistory;
    });
    setHistoryIndex(prev => Math.min(prev + 1, 10));
  }, [historyIndex]);

  const increment = useCallback(() => {
    playSound(600, 80);
    setCount((value) => {
      const newValue = value + stepSize;
      addToHistory(newValue);
      return newValue;
    });
  }, [stepSize, addToHistory, playSound]);

  const decrement = useCallback(() => {
    playSound(400, 80);
    setCount((value) => {
      const newValue = value - stepSize;
      addToHistory(newValue);
      return newValue;
    });
  }, [stepSize, addToHistory, playSound]);

  const reset = useCallback(() => {
    playSound(500, 100);
    setCount(0);
    addToHistory(0);
  }, [addToHistory, playSound]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      playSound(450, 60);
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCount(history[newIndex]);
    }
  }, [history, historyIndex, playSound]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      playSound(550, 60);
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCount(history[newIndex]);
    }
  }, [history, historyIndex, playSound]);

  const startHold = useCallback((action, event) => {
    if (event) {
      event.preventDefault();
    }
    // Clear any existing interval
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
    }
    // Call action once immediately
    action();
    // Start continuous action after 400ms delay (for hold)
    holdIntervalRef.current = setTimeout(() => {
      holdIntervalRef.current = setInterval(action, 100);
    }, 400);
  }, []);

  const stopHold = useCallback(() => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      clearTimeout(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  // Keyboard shortcuts - must be after function definitions
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "ArrowUp") {
        increment();
      }
      if (event.key === "ArrowDown") {
        decrement();
      }
      if (event.key.toLowerCase() === "r") {
        reset();
      }
      if (event.ctrlKey && event.key === "z") {
        event.preventDefault();
        undo();
      }
      if (event.ctrlKey && event.key === "y") {
        event.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [increment, decrement, reset, undo, redo]);

  return (
    <div className="counter-page">
      {confetti.map(c => (
        <div
          key={c.id}
          className="confetti"
          style={{
            left: `${c.left}%`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
            backgroundColor: c.color
          }}
        />
      ))}
      <div className="counter-card">
        <h2 className="counter-title">Counter Application</h2>
        <p className="counter-subtitle">Track numbers with smooth actions and clear feedback</p>
        <div className="counter-value">
          <div className="counter-shatter" key={shatterKey}>
            {pieces.map((piece) => (
              <span
                key={piece.id}
                className="counter-particle"
                style={{
                  "--x": `${piece.offsetX}px`,
                  "--y": `${piece.offsetY}px`,
                  "--r": `${piece.rotate}deg`,
                  "--s": piece.scale,
                }}
              >
                {piece.digit}
              </span>
            ))}
          </div>
          <div className="counter-current" key={currentKey}>
            {String(count)
              .split("")
              .map((digit, index) => (
                <span className="counter-digit" key={`${count}-${index}`}>
                  {digit}
                </span>
              ))}
          </div>
        </div>

        <div className="step-selector">
          <span className="step-label">Step Size:</span>
          {[1, 5, 10].map(size => (
            <button
              key={size}
              className={`step-btn ${stepSize === size ? 'active' : ''}`}
              onClick={() => setStepSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="counter-actions">
          <button
            className="counter-btn primary"
            onMouseDown={(e) => startHold(increment, e)}
            onMouseUp={stopHold}
            onMouseLeave={stopHold}
            onTouchStart={(e) => startHold(increment, e)}
            onTouchEnd={stopHold}
          >
            Increment (+{stepSize})
          </button>
          <button
            className="counter-btn warning"
            onMouseDown={(e) => startHold(decrement, e)}
            onMouseUp={stopHold}
            onMouseLeave={stopHold}
            onTouchStart={(e) => startHold(decrement, e)}
            onTouchEnd={stopHold}
          >
            Decrement (-{stepSize})
          </button>
          <button className="counter-btn danger" onClick={reset}>
            Reset
          </button>
        </div>

        <div className="history-controls">
          <button
            className="history-btn"
            onClick={undo}
            disabled={historyIndex === 0}
          >
            ↶ Undo
          </button>
          <button
            className="history-btn"
            onClick={redo}
            disabled={historyIndex === history.length - 1}
          >
            ↷ Redo
          </button>
          <button
            className="history-btn"
            onClick={() => setShowHistory(!showHistory)}
          >
            📋 History
          </button>
        </div>

        {showHistory && (
          <div className="history-panel">
            <h4>Recent History</h4>
            <div className="history-list">
              {history.slice().reverse().map((val, idx) => {
                const actualIdx = history.length - 1 - idx;
                return (
                  <div
                    key={idx}
                    className={`history-item ${actualIdx === historyIndex ? 'current' : ''}`}
                  >
                    <span className="history-value">{val}</span>
                    {actualIdx === historyIndex && <span className="history-badge">Current</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="counter-micro">
          <span>Keys: ↑/↓/R | Ctrl+Z/Y</span>
          <button className="theme-toggle" onClick={toggleTheme}>
            Theme: {theme === "dark" ? "Dark" : "Light"}
          </button>
          <span className="counter-pill">Live Counter</span>
        </div>
      </div>
    </div>
  );
}

export default Counter;