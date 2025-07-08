'use client';

import { a, useSpring } from '@react-spring/three';
import { Text } from '@react-three/drei';

export default function HtmlButton({
  onClick,
  isPlaying
}: {
  onClick: () => void;
  isPlaying: boolean;
}) {
  const { scale } = useSpring({
    scale: isPlaying ? 1.2 : 1,
    config: { tension: 300, friction: 10 }
  });

  return (
    <a.mesh position={[0, -0.2, 1.5]} scale={scale} onClick={onClick}>
      <circleGeometry args={[0.3, 32]} />
      <meshStandardMaterial
        color={isPlaying ? '#ff6b6b' : '#4ecdc4'}
        roughness={0.3}
        metalness={0.5}
      />
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {isPlaying ? 'STOP' : 'TALK'}
      </Text>
    </a.mesh>
  );
}
