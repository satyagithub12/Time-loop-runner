import React, { useState, useEffect, useRef } from "react";
import background from "./assets/images/image2.png";
import playerImg from "./assets/images/player4.png";
import obstacleImg from "./assets/images/obs2.png";
import backMusic from "./assets/audio/backmusic.mp3";
import obstouchSound from "./assets/audio/obstouch.mp3";

const Game = () => {
  const gameWidth = 800;
  const gameHeight = 400;
  const playerSize = 50;
  const obstacleSize = 50;
  const playerSpeed = 10;
  const obstacleSpeed = 5;

  const [playerX, setPlayerX] = useState(gameWidth / 2 - playerSize / 2);
  const [obstacles, setObstacles] = useState([]);
  const [backgroundX, setBackgroundX] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const backgroundMusicRef = useRef(null);

  useEffect(() => {
    const audio = backgroundMusicRef.current;
    if (audio) {
      audio.volume = 0.5; // Adjust volume
      audio.loop = true; // Loop background music

      // Play music after a user interaction to bypass autoplay restrictions
      const playAudio = () => {
        if (audio.paused) {
          audio.play().catch((error) => console.error("Audio play error:", error));
        }
      };

      window.addEventListener("click", playAudio);
      window.addEventListener("keydown", playAudio); 

      return () => {
        window.removeEventListener("click", playAudio);
        window.removeEventListener("keydown", playAudio);
      };
    }
  }, []);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (!gameOver) {
        setObstacles((prevObstacles) =>
          prevObstacles
            .map((obs) => ({ ...obs, y: obs.y + obstacleSpeed }))
            .filter((obs) => obs.y < gameHeight)
        );

        if (Math.random() < 0.02) {
          setObstacles((prevObstacles) => [
            ...prevObstacles,
            { x: Math.random() * (gameWidth - obstacleSize), y: 0 },
          ]);
        }

        setBackgroundX((prevX) => (prevX - 2) % gameWidth);

        // Collision detection
        obstacles.forEach((obs) => {
          if (
            obs.y + obstacleSize >= gameHeight - playerSize - 20 &&
            obs.x < playerX + playerSize &&
            obs.x + obstacleSize > playerX
          ) {
            setGameOver(true);
            clearInterval(gameLoop);
            new Audio(obstouchSound).play();
            if (backgroundMusicRef.current) {
              backgroundMusicRef.current.pause();
            }
          }
        });
      }
    }, 30);

    return () => clearInterval(gameLoop);
  }, [obstacles, playerX, gameOver]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!gameOver) {
        if (event.key === "ArrowLeft") {
          setPlayerX((prevX) => Math.max(0, prevX - playerSpeed));
        } else if (event.key === "ArrowRight") {
          setPlayerX((prevX) => Math.min(gameWidth - playerSize, prevX + playerSpeed));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {gameOver && <h2 style={{ color: "red" }}>Game Over!</h2>}

      {/* Background Music */}
      <audio ref={backgroundMusicRef} src={backMusic} />

      <div
        style={{
          position: "relative",
          width: `${gameWidth}px`,
          height: `${gameHeight}px`,
          border: "2px solid black",
          overflow: "hidden",
          background: `url(${background}) repeat-x`,
          backgroundSize: "cover",
          backgroundPosition: `${backgroundX}px 0`,
        }}
      >
        {/* Player Character */}
        <img
          src={playerImg}
          alt="Player"
          style={{
            position: "absolute",
            width: `${playerSize}px`,
            height: `${playerSize}px`,
            left: `${playerX}px`,
            bottom: "20px",
          }}
        />

        {/* Obstacles */}
        {obstacles.map((obs, index) => (
          <img
            key={index}
            src={obstacleImg}
            alt="Obstacle"
            style={{
              position: "absolute",
              width: `${obstacleSize}px`,
              height: `${obstacleSize}px`,
              left: `${obs.x}px`,
              top: `${obs.y}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;