import React from "react";
import Game from "./Game";

function App() {
  return (
    <div
      style={{
        textAlign: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        overflow: "hidden",
      }}
    >
      <h1 className="cyberpunk-title">Time Loop Runner</h1>

      <div className="glowing-game-box">
        <Game />
      </div>

      <style>
        {`
          /* Slower Cyberpunk Neon Glitch Effect */
          @keyframes neon-glow {
            0% { text-shadow: 0 0 5px #00eaff, 0 0 10px #00eaff, 0 0 20px #00eaff, 0 0 40px #ff00ff; }
            50% { text-shadow: 0 0 10px #00eaff, 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 50px #ff00ff; }
            100% { text-shadow: 0 0 5px #00eaff, 0 0 10px #00eaff, 0 0 20px #ff00ff, 0 0 40px #ff00ff; }
          }

          @keyframes glitch {
            0% { transform: translate(0, 0); }
            20% { transform: translate(-1px, 1px); }
            40% { transform: translate(1px, -1px); }
            60% { transform: translate(-1px, 1px); }
            80% { transform: translate(1px, -1px); }
            100% { transform: translate(0, 0); }
          }

          .cyberpunk-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 50px;
            font-weight: bold;
            color: #00eaff;
            text-transform: uppercase;
            animation: neon-glow 3s infinite alternate, glitch 1s infinite;
            margin-bottom: 10px;
          }

          /* Neon Glowing Border for Game Box */
          @keyframes glow-border {
            0% { box-shadow: 0 0 5px #00eaff, 0 0 10px #00eaff, 0 0 20px #00eaff, 0 0 30px #ff00ff; }
            50% { box-shadow: 0 0 10px #00eaff, 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff; }
            100% { box-shadow: 0 0 5px #00eaff, 0 0 10px #00eaff, 0 0 20px #ff00ff, 0 0 30px #ff00ff; }
          }

          .glowing-game-box {
            margin-top: -30px;
            border: 2px solid #00eaff;
            border-radius: 10px;
            animation: glow-border 3s infinite alternate;
            padding: 5px;
          }
        `}
      </style>
    </div>
  );
}

export default App;