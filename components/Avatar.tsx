// // components/Avatar.tsx
// "use client";

// import React, { useRef, useState, useEffect, Suspense } from "react";
// import { useFrame } from "@react-three/fiber";
// import { Html, useGLTF } from "@react-three/drei";
// import * as THREE from "three";

// // Mock data (as before)
// const audioUrl = "https://archive.org/download/60s_of_speech/60s_of_speech.mp3";
// // Sample sentence: “This is a test voice”

// const lipSyncData = [
//   { start: 0.1, end: 0.21, value: "A" },
//   { start: 0.21, end: 0.31, value: "B" },
//   { start: 0.31, end: 0.4, value: "C" },
//   { start: 0.4, end: 0.48, value: "A" },
//   { start: 0.48, end: 0.62, value: "F" },
//   { start: 0.62, end: 0.8, value: "C" },
//   { start: 0.8, end: 0.89, value: "B" },
//   { start: 0.89, end: 1.04, value: "A" },
//   { start: 1.04, end: 1.2, value: "G" },
//   { start: 1.2, end: 1.25, value: "A" },
//   { start: 1.25, end: 1.5, value: "F" },
//   { start: 1.5, end: 1.65, value: "C" },
//   { start: 1.65, end: 1.8, value: "B" },
//   { start: 1.8, end: 1.98, value: "A" },
//   { start: 1.98, end: 2.2, value: "F" },
//   { start: 2.2, end: 2.4, value: "C" },
//   { start: 2.4, end: 2.6, value: "B" },
//   { start: 2.6, end: 2.8, value: "A" },
// ];
// const corresponding = {
//   A: "mouthOpen",
//   B: "mouthSmile",
//   C: "mouthFunnel",
//   D: "mouthPucker",
//   E: "jawOpen",
//   F: "mouthShrugUpper",
//   G: "mouthShrugLower",
//   H: "mouthRollUpper",
//   X: "mouthClose",
// };

// // The actual 3D model and its logic
// function AvatarModel({
//   url,
//   isPlaying,
//   audio,
// }: {
//   url: string;
//   isPlaying: boolean;
//   audio: HTMLAudioElement | null;
// }) {
//   // The 'as any' is a temporary workaround for GLTF typing, it's safe here
//   const { scene, nodes } = useGLTF(url) as any;

//   const headMesh = nodes.Wolf3D_Head;
//   const teethMesh = nodes.Wolf3D_Teeth;

//   useFrame(() => {
//     if (!isPlaying || !audio) return;

//     const currentTime = audio.currentTime;
//     const currentPhoneme = lipSyncData.find(
//       (d) => currentTime >= d.start && currentTime <= d.end
//     );

//     // Reset all morph targets
//     Object.values(corresponding).forEach((name) => {
//       const headIdx = headMesh.morphTargetDictionary[name];
//       if (headIdx !== undefined) headMesh.morphTargetInfluences[headIdx] = 0;

//       const teethIdx = teethMesh.morphTargetDictionary[name];
//       if (teethIdx !== undefined) teethMesh.morphTargetInfluences[teethIdx] = 0;
//     });

//     // Apply the current phoneme's morph target
//     if (currentPhoneme) {
//       const morphName =
//         corresponding[currentPhoneme.value as keyof typeof corresponding];
//       const headIdx = headMesh.morphTargetDictionary[morphName];
//       if (headIdx !== undefined) headMesh.morphTargetInfluences[headIdx] = 1;

//       const teethIdx = teethMesh.morphTargetDictionary[morphName];
//       if (teethIdx !== undefined) teethMesh.morphTargetInfluences[teethIdx] = 1;
//     }
//   });

//   // --- CHANGE ---
//   // Adjusted the Y position from -2.5 to -1.5 to bring the avatar up.
//   // Ready Player Me models have their origin at the feet, so we need to shift them down a bit.
//   return (
//     <group position={[0, 1, 0]}>
//       <primitive object={scene} scale={1.5} position={[0, -1.5, 0]} />;
//     </group>
//   );
// }

// // The parent component that manages state and UI
// export default function Avatar({ url }: { url: string }) {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

//   useEffect(() => {
//     const audioEl = new Audio(audioUrl);
//     audioEl.loop = false;
//     audioEl.onended = () => setIsPlaying(false);
//     setAudio(audioEl);

//     const handler = async () => {
//       if (!audioEl) return;
//       try {
//         if (isPlaying) {
//           audioEl.pause();
//           audioEl.currentTime = 0;
//         } else {
//           await audioEl.play();
//         }
//         setIsPlaying(!isPlaying);
//       } catch (err) {
//         console.error("Playback error:", err);
//       }
//     };

//     window.addEventListener("trigger-audio-play", handler);

//     return () => {
//       window.removeEventListener("trigger-audio-play", handler);
//     };
//   }, [isPlaying]);

//   return (
//     <>
//       <Suspense fallback={null}>
//         <AvatarModel url={url} isPlaying={isPlaying} audio={audio} />
//       </Suspense>
//       {/* --- CHANGE --- */}
//       {/* Adjusted the button's Y position to be visible below the centered avatar. */}
//       <Html position={[0, -1.25, 0]} zIndexRange={[100, 0]}>
//         <button
//           style={{
//             padding: "10px 20px",
//             borderRadius: "20px",
//             border: "white",
//             background: isPlaying ? "#ff6b6b" : "#4ecdc4",
//             color: "white",

//             cursor: "pointer",
//             fontSize: "16px",
//             fontWeight: "bold",
//             transition: "background 0.3s",
//             boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
//             zIndex: 9999, // ✅ Ensures it's above everything
//             position: "relative", // ✅ Required for zIndex to work
//           }}
//           onClick={() => {
//             window.dispatchEvent(new Event("trigger-audio-play"));
//           }}
//         >
//           {isPlaying ? "STOP" : "TALK"}
//         </button>
//       </Html>
//     </>
//   );
// }

// // Preload the GLTF model so it's ready for Suspense
// useGLTF.preload("https://models.readyplayer.me/686d7625a4b84d7afe402e50.glb");

//new code
"use client";
import React, { useState, useEffect, Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const audioUrl =
  "https://www.voiptroubleshooter.com/open_speech/american/OSR_us_000_0010_8k.wav";

function AvatarModel({
  url,
  isPlaying,
  audio,
}: {
  url: string;
  isPlaying: boolean;
  audio: HTMLAudioElement | null;
}) {
  const { scene, nodes } = useGLTF(url) as any;
  const headMesh = nodes.Wolf3D_Head;
  const teethMesh = nodes.Wolf3D_Teeth;

  const timerRef = useRef(0);
  const blinkTimerRef = useRef(0);
  const idleTimerRef = useRef(0);
  const nextBlinkTime = useRef(2 + Math.random() * 3);
  const gestureTimerRef = useRef(0);

  // Show hands and arms for sitting pose
  useEffect(() => {
    if (scene) {
      scene.traverse((child: any) => {
        if (child.isMesh) {
          // Make sure hands and arms are visible for sitting pose
          if (
            child.name.includes("Hand") ||
            child.name.includes("Arm") ||
            child.name.includes("hand") ||
            child.name.includes("arm") ||
            child.name === "Wolf3D_Hands" ||
            child.name === "Wolf3D_Arms"
          ) {
            child.visible = true;
          }
        }
      });
    }
  }, [scene]);

  useFrame((_, delta) => {
    if (!headMesh) return;

    // --- SPEECH: Mouth movement ---
    if (isPlaying && audio) {
      timerRef.current += delta;
      const speechInterval = 0.08 + Math.random() * 0.04;

      if (timerRef.current > speechInterval) {
        const intensity = Math.random();
        const open = intensity > 0.3 ? intensity * 0.6 + 0.2 : 0.1;

        const mouthOpenIdx = headMesh.morphTargetDictionary?.["mouthOpen"];
        if (mouthOpenIdx !== undefined)
          headMesh.morphTargetInfluences[mouthOpenIdx] = open;

        const teethOpenIdx = teethMesh?.morphTargetDictionary?.["mouthOpen"];
        if (teethOpenIdx !== undefined)
          teethMesh.morphTargetInfluences[teethOpenIdx] = open;

        const mouthSmileIdx = headMesh.morphTargetDictionary?.["mouthSmile"];
        if (mouthSmileIdx !== undefined)
          headMesh.morphTargetInfluences[mouthSmileIdx] = Math.random() * 0.1;

        timerRef.current = 0;
      }
    } else {
      const mouthOpenIdx = headMesh.morphTargetDictionary?.["mouthOpen"];
      if (mouthOpenIdx !== undefined)
        headMesh.morphTargetInfluences[mouthOpenIdx] = Math.max(
          0,
          headMesh.morphTargetInfluences[mouthOpenIdx] - delta * 2
        );

      const teethOpenIdx = teethMesh?.morphTargetDictionary?.["mouthOpen"];
      if (teethOpenIdx !== undefined)
        teethMesh.morphTargetInfluences[teethOpenIdx] = Math.max(
          0,
          teethMesh.morphTargetInfluences[teethOpenIdx] - delta * 2
        );
    }

    // --- BLINKING ---
    blinkTimerRef.current += delta;
    const blinkDuration = 0.1;

    const blinkTargets = [
      "eyeBlinkLeft",
      "eyeBlinkRight",
      "EyeBlinkLeft",
      "EyeBlinkRight",
      "blink",
      "Blink",
      "eyesClosed",
      "EyesClosed",
    ];

    if (blinkTimerRef.current >= nextBlinkTime.current) {
      const blinkProgress =
        (blinkTimerRef.current - nextBlinkTime.current) / blinkDuration;

      const blinkValue =
        blinkProgress <= 1 ? Math.sin(blinkProgress * Math.PI) : 0;

      blinkTargets.forEach((target) => {
        const idx = headMesh.morphTargetDictionary?.[target];
        if (idx !== undefined) {
          headMesh.morphTargetInfluences[idx] = blinkValue;
        }
      });

      if (blinkProgress > 1) {
        blinkTimerRef.current = 0;
        nextBlinkTime.current = 2 + Math.random() * 3;
      }
    }

    // --- SITTING POSE ANIMATIONS ---
    idleTimerRef.current += delta;
    gestureTimerRef.current += delta;

    // Subtle sitting posture movements
    const sittingBob = Math.sin(idleTimerRef.current * 0.5) * 0.01;
    const sittingLean = Math.cos(idleTimerRef.current * 0.3) * 0.005;

    // Apply sitting movements
    scene.rotation.x = sittingBob;
    scene.rotation.z = sittingLean;

    // Head movements for questioning behavior
    if (isPlaying) {
      const headTilt = Math.sin(gestureTimerRef.current * 1.2) * 0.08;
      const headNod = Math.sin(gestureTimerRef.current * 2) * 0.03;

      scene.rotation.y = headTilt;
      scene.rotation.x += headNod;
    }

    // --- QUESTIONING EXPRESSIONS ---
    const expressionTimer = idleTimerRef.current * 0.4;

    // Raised eyebrows for questioning
    const browInnerUpIdx = headMesh.morphTargetDictionary?.["browInnerUp"];
    if (browInnerUpIdx !== undefined) {
      const browIntensity = isPlaying ? 0.15 : 0.05;
      headMesh.morphTargetInfluences[browInnerUpIdx] =
        Math.sin(expressionTimer) * browIntensity + (isPlaying ? 0.1 : 0);
    }

    // Slight smile for friendly questioning
    const mouthSmileIdx = headMesh.morphTargetDictionary?.["mouthSmile"];
    if (mouthSmileIdx !== undefined && !isPlaying) {
      headMesh.morphTargetInfluences[mouthSmileIdx] =
        Math.sin(expressionTimer * 0.7) * 0.08 + 0.05;
    }
  });

  // Position for sitting pose - adjusted for better framing
  return (
    <group>
      <primitive
        object={scene}
        scale={1.3}
        position={[0, -1.8, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}

// Simple chair component - positioned to be visible
function Chair() {
  return (
    <group position={[0, -2.2, 0.1]}>
      {/* Chair seat */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[1.2, 0.1, 1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Chair back */}
      <mesh position={[0, 0.3, 0.4]}>
        <boxGeometry args={[1.2, 1.2, 0.1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Chair legs */}
      {(
        [
          [-0.5, -0.7, -0.4],
          [0.5, -0.7, -0.4],
          [-0.5, -0.7, 0.4],
          [0.5, -0.7, 0.4],
        ] as [number, number, number][]
      ).map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.04, 0.04, 0.5]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      ))}
    </group>
  );
}

// Desk component - positioned to be visible in frame
function Desk() {
  return (
    <group position={[0, -2.5, -0.3]}>
      {/* Desk top */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 0.1, 1.2]} />
        <meshStandardMaterial color="#DEB887" />
      </mesh>
      {/* Desk legs */}
      {(
        [
          [-1.0, -0.5, -0.5],
          [1.0, -0.5, -0.5],
          [-1.0, -0.5, 0.5],
          [1.0, -0.5, 0.5],
        ] as [number, number, number][]
      ).map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.05, 0.05, 1]} />
          <meshStandardMaterial color="#8B7355" />
        </mesh>
      ))}
    </group>
  );
}

export default function Avatar({ url }: { url: string }) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioEl = new Audio(audioUrl);
    audioEl.onended = () => {
      setIsPlaying(false);
      window.dispatchEvent(
        new CustomEvent("audio-state-changed", { detail: { isPlaying: false } })
      );
    };
    setAudio(audioEl);

    return () => {
      audioEl.pause();
      audioEl.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    const toggle = async () => {
      if (!audio) return;

      if (isPlaying) {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
        window.dispatchEvent(
          new CustomEvent("audio-state-changed", {
            detail: { isPlaying: false },
          })
        );
      } else {
        try {
          await audio.play();
          setIsPlaying(true);
          window.dispatchEvent(
            new CustomEvent("audio-state-changed", {
              detail: { isPlaying: true },
            })
          );
        } catch (error) {
          console.error("Error playing audio:", error);
        }
      }
    };

    window.addEventListener("trigger-audio-play", toggle);
    return () => window.removeEventListener("trigger-audio-play", toggle);
  }, [isPlaying, audio]);

  useEffect(() => {
    const handleSpeakQuestion = (e: any) => {
      const question = e.detail?.question;
      if (!question) return;

      const synth = window.speechSynthesis;
      const utter = new window.SpeechSynthesisUtterance(question);

      let voices = synth.getVoices();
      if (!voices || voices.length === 0) {
        synth.onvoiceschanged = () => {
          voices = synth.getVoices();
          setFemaleVoiceAndSpeak();
        };
      } else {
        setFemaleVoiceAndSpeak();
      }

      function setFemaleVoiceAndSpeak() {
        const femaleVoice =
          voices.find(
            (v) =>
              v.lang.startsWith("en") && v.name.toLowerCase().includes("female")
          ) ||
          voices.find(
            (v) =>
              v.lang.startsWith("en") && v.name.toLowerCase().includes("woman")
          ) ||
          voices.find(
            (v) =>
              v.lang.startsWith("en") && v.name.toLowerCase().includes("zira")
          ) ||
          voices.find(
            (v) =>
              v.lang.startsWith("en") && v.name.toLowerCase().includes("susan")
          ) ||
          voices.find(
            (v) =>
              v.lang.startsWith("en") &&
              v.name.toLowerCase().includes("samantha")
          ) ||
          voices.find(
            (v) =>
              v.lang.startsWith("en") && v.name.toLowerCase().includes("karen")
          ) ||
          voices.find(
            (v) =>
              v.lang.startsWith("en") && v.name.toLowerCase().includes("linda")
          ) ||
          voices.find((v) => v.lang.startsWith("en"));

        if (femaleVoice) {
          utter.voice = femaleVoice;
        }

        utter.onstart = () => {
          setIsPlaying(true);
          window.dispatchEvent(
            new CustomEvent("audio-state-changed", {
              detail: { isPlaying: true },
            })
          );
        };

        utter.onend = () => {
          setIsPlaying(false);
          window.dispatchEvent(
            new CustomEvent("audio-state-changed", {
              detail: { isPlaying: false },
            })
          );
        };

        synth.speak(utter);
      }
    };

    window.addEventListener("avatar-speak-question", handleSpeakQuestion);
    return () =>
      window.removeEventListener("avatar-speak-question", handleSpeakQuestion);
  }, []);

  return (
    <Suspense fallback={null}>
      {/* Chair */}
      <Chair />

      {/* Desk */}
      <Desk />

      {/* Avatar */}
      <AvatarModel url={url} isPlaying={isPlaying} audio={audio} />
    </Suspense>
  );
}

useGLTF.preload("https://models.readyplayer.me/68716fa6f439768e5442bdb2.glb");
// main chick: https://models.readyplayer.me/686d7625a4b84d7afe402e50.glb
