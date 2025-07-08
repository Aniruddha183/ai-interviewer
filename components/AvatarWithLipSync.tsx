"use client";
import React, { useEffect, useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useGLTF, Environment, OrbitControls } from "@react-three/drei";

const PHONEME_TO_BLEND: Record<string, string> = {
  A: "mouthOpen",
  B: "mouthSmile",
  C: "mouthFunnel",
  D: "mouthPucker",
  E: "jawOpen",
  F: "mouthShrugUpper",
  G: "mouthShrugLower",
};

function AvatarLipSync({
  url,
  phonemeData,
  audioRef,
  isPlaying,
}: {
  url: string;
  phonemeData: { start: number; end: number; value: string }[];
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
}) {
  const { scene, nodes } = useGLTF(url) as any;
  const head = nodes.Wolf3D_Head;
  const teeth = nodes.Wolf3D_Teeth;

  useFrame(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset all mouth blends
    Object.values(PHONEME_TO_BLEND).forEach((blend) => {
      const idx = head.morphTargetDictionary[blend];
      if (idx !== undefined) head.morphTargetInfluences[idx] = 0;
      const tidx = teeth.morphTargetDictionary[blend];
      if (tidx !== undefined) teeth.morphTargetInfluences[tidx] = 0;
    });

    // Get current time and phoneme
    const t = audio.currentTime;
    const phoneme = phonemeData.find((p) => t >= p.start && t < p.end);
    if (phoneme) {
      const blend = PHONEME_TO_BLEND[phoneme.value];
      const idx = head.morphTargetDictionary[blend];
      if (idx !== undefined) head.morphTargetInfluences[idx] = 1;
      const tidx = teeth.morphTargetDictionary[blend];
      if (tidx !== undefined) teeth.morphTargetInfluences[tidx] = 1;
    }
  });

  return <primitive object={scene} scale={1.5} position={[0, -0.5, 0]} />;
}

export default function AvatarWithLipSync() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [phonemes, setPhonemes] = useState<
    { start: number; end: number; value: string }[]
  >([]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Load JSON data
  useEffect(() => {
    fetch("/questions/q1.json")
      .then((r) => r.json())
      .then(setPhonemes)
      .catch(console.error);

    const audio = new Audio("/questions/q1.mp3");
    audio.onended = () => setIsPlaying(false);
    audioRef.current = audio;
  }, []);

  // Handle play/pause
  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    } else {
      await audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 1.3, 2.8], fov: 30 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 2]} intensity={1.2} />
        <Environment preset="city" />
        <Suspense fallback={null}>
          <AvatarLipSync
            url="https://models.readyplayer.me/686d7625a4b84d7afe402e50.glb"
            phonemeData={phonemes}
            audioRef={audioRef}
            isPlaying={isPlaying}
          />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.4}
          maxPolarAngle={Math.PI / 2.4}
        />
      </Canvas>

      <div className="absolute bottom-16 w-full text-center">
        <button
          className="px-8 py-4 bg-cyan-500 text-white rounded-full text-xl font-bold shadow-lg transition hover:bg-cyan-600"
          onClick={toggle}
        >
          {isPlaying ? "STOP" : "ASK QUESTION"}
        </button>
      </div>
    </div>
  );
}
