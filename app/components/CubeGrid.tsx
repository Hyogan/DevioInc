// components/CubeGrid.tsx
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const CubeGrid = () => {
  const meshRefs = useRef<THREE.Mesh[]>([]);
  const lightRef = useRef<THREE.PointLight>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = mouse.x * 10;
      lightRef.current.position.y = mouse.y * 10;
    }
  });

  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <ambientLight intensity={0.2} />
      <pointLight ref={lightRef} position={[0, 0, 5]} intensity={1} />
      {[...Array(9)].map((_, index) => (
        <mesh
          key={index}
          position={[
            (index % 3 - 1) * 1.2,
            Math.floor(index / 3 - 1) * 1.2,
            0,
          ]}
          ref={(el) => (meshRefs.current[index] = el as THREE.Mesh)}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="yellow" roughness={0.5} metalness={0.2} />
        </mesh>
      ))}
      <OrbitControls />
    </Canvas>
  );
};

export default CubeGrid;