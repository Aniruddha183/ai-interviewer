"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

function RemoteAvatar({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return (
    <group position={[0, -1.5, 0]}>
      <primitive object={scene} scale={2.5} />
    </group>
  );
}

export default function AvatarViewer() {
  const avatarUrl =
    "https://models.readyplayer.me/686d7625a4b84d7afe402e50.glb";

  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 20 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <Environment preset="sunset" />
      <RemoteAvatar url={avatarUrl} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  );
}

// //new code from gemini
// "use client";

// import dynamic from "next/dynamic";
// import { Canvas } from "@react-three/fiber";
// import { Environment, OrbitControls } from "@react-three/drei";
// import { Suspense } from "react";
// import Avatar from "../components/Avatar";

// export default function Home() {
//   const avatarUrl =
//     "https://models.readyplayer.me/686d7625a4b84d7afe402e50.glb";

//   return (
//     <div style={{ width: "100%", height: "100vh" }}>
//       <Canvas camera={{ position: [0, 0, 3.5], fov: 25 }}>
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[3, 5, 2]} intensity={1.5} />
//         <Environment preset="city" />
//         <Suspense fallback={null}>
//           <Avatar url={avatarUrl} />
//         </Suspense>
//         <OrbitControls enableZoom={false} enablePan={false} />
//       </Canvas>
//     </div>
//   );
// }
