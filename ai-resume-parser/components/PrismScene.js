"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const FACE_COUNT = 6;

function GlassPrism({ progressRef, pointerRef }) {
  const groupRef = useRef();
  const edgesRef = useRef();
  const currentRotation = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Base idle spin + scroll-driven rotation
    const targetProgress = progressRef.current || 0;
    const scrollSpin = targetProgress * Math.PI * 2;
    currentRotation.current += delta * 0.15; // slow continuous idle spin

    groupRef.current.rotation.y = currentRotation.current + scrollSpin;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      (pointerRef.current?.y || 0) * 0.25,
      0.05
    );

    // gentle bob
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.15;

    if (edgesRef.current) {
      edgesRef.current.rotation.copy(groupRef.current.rotation);
    }
  });

  const geometry = useMemo(() => new THREE.CylinderGeometry(1.6, 1.6, 2.2, FACE_COUNT, 1, false), []);
  const edgesGeometry = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <MeshTransmissionMaterial
          transmission={1}
          roughness={0.05}
          thickness={1.2}
          ior={1.3}
          chromaticAberration={0.03}
          backside
          color="#dbeafe"
          attenuationColor="#60a5fa"
          attenuationDistance={2}
        />
      </mesh>
      <lineSegments ref={edgesRef} geometry={edgesGeometry}>
        <lineBasicMaterial color="#2563eb" transparent opacity={0.9} linewidth={2} />
      </lineSegments>
    </group>
  );
}

function RigLights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 4]} intensity={40} color="#3b82f6" />
      <pointLight position={[-4, -2, -3]} intensity={20} color="#60a5fa" />
      <directionalLight position={[0, 5, 5]} intensity={0.8} color="#ffffff" />
    </>
  );
}

export default function PrismScene({ progressRef, pointerRef }) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <RigLights />
      <GlassPrism progressRef={progressRef} pointerRef={pointerRef} />
      <Sparkles count={60} scale={5} size={2} speed={0.3} color="#60a5fa" opacity={0.6} />
      <Environment preset="city" />
    </Canvas>
  );
}
