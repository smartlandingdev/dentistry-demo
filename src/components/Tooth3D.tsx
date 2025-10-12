import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function Tooth3D() {
  const toothRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Rotate tooth slowly
  useFrame((state) => {
    if (toothRef.current) {
      toothRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
      toothRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }

    // Animate particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  // Create particle positions
  const particleCount = 100;
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const radius = 3 + Math.random() * 2;

    particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particlePositions[i * 3 + 2] = radius * Math.cos(phi);
  }

  return (
    <>
      {/* Ambient Light */}
      <ambientLight intensity={0.5} />

      {/* Main Directional Light */}
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Rim Light */}
      <pointLight position={[-10, 0, -10]} intensity={0.5} color="#3B82F6" />
      <pointLight position={[10, 0, 10]} intensity={0.5} color="#60A5FA" />

      {/* Floating Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#3B82F6"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Tooth Model */}
      <Float
        speed={2}
        rotationIntensity={0.5}
        floatIntensity={0.5}
      >
        <group ref={toothRef} position={[0, 0, 0]}>
          {/* Main Tooth Body */}
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.8, 1.2, 3, 32]} />
            <MeshTransmissionMaterial
              transmission={0.95}
              thickness={0.5}
              roughness={0.1}
              envMapIntensity={1}
              color="#FFFFFF"
              metalness={0.1}
            />
          </mesh>

          {/* Crown (top part) */}
          <mesh position={[0, 1.8, 0]} castShadow>
            <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <MeshTransmissionMaterial
              transmission={0.95}
              thickness={0.5}
              roughness={0.1}
              envMapIntensity={1}
              color="#FFFFFF"
              metalness={0.1}
            />
          </mesh>

          {/* Root */}
          <mesh position={[0, -1.8, 0]} castShadow>
            <coneGeometry args={[1.2, 1.5, 32]} />
            <MeshTransmissionMaterial
              transmission={0.9}
              thickness={0.4}
              roughness={0.15}
              envMapIntensity={0.8}
              color="#F8F8F8"
              metalness={0.05}
            />
          </mesh>

          {/* Glow Effect */}
          <mesh position={[0, 0, 0]} scale={1.1}>
            <cylinderGeometry args={[0.85, 1.25, 3.1, 32]} />
            <meshBasicMaterial
              color="#3B82F6"
              transparent
              opacity={0.1}
              side={THREE.BackSide}
            />
          </mesh>
        </group>
      </Float>

      {/* Rotating Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.3} />
      </mesh>

      <mesh rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[3.2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#60A5FA" transparent opacity={0.2} />
      </mesh>
    </>
  );
}
