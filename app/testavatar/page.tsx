"use client";

import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useState, useEffect } from "react";

// Load Avatar dynamically (avoids SSR problems)
const Avatar = dynamic(() => import("@/components/Avatar"), { ssr: false });

export default function Home() {
  const avatarUrl = "https://models.readyplayer.me/686d7625a4b84d7afe402e50.glb";
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleAudioStateChange = (event: CustomEvent) => {
      setIsPlaying(event.detail.isPlaying);
    };

    window.addEventListener("audio-state-changed", handleAudioStateChange as EventListener);
    return () => window.removeEventListener("audio-state-changed", handleAudioStateChange as EventListener);
  }, []);

  const handleButtonClick = () => {
    const evt = new Event("trigger-audio-play");
    window.dispatchEvent(evt);
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Canvas camera={{ position: [0, 0.5, 3], fov: 20 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 2]} intensity={1.2} />
        <Environment preset="city" />
        <Avatar url={avatarUrl} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>

      {/* Button positioned below the centered avatar */}
      <div style={{ 
        position: "absolute", 
        bottom: 60, 
        width: "100%", 
        textAlign: "center",
        zIndex: 10 
      }}>
        <button
          id="trigger-btn"
          style={{
            padding: "12px 30px",
            borderRadius: "30px",
            border: "none",
            background: isPlaying ? "#ff6b6b" : "#4ecdc4",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            transition: "background 0.3s",
            minWidth: "120px",
          }}
          onClick={handleButtonClick}
        >
          {isPlaying ? "STOP" : "TALK"}
        </button>
      </div>
    </div>
  );
}