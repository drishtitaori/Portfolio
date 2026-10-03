"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

function Prism() {
  const group = useRef<Group>(null);
  useFrame(({ pointer }) => {
    if (group.current) {
      group.current.rotation.y += (pointer.x * 0.45 - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (-pointer.y * 0.24 - group.current.rotation.x) * 0.04;
    }
  });
  return <group ref={group}>
    <mesh><octahedronGeometry args={[1.45, 0]} /><meshStandardMaterial color="#5DA9E9" roughness={0.25} metalness={0.16} /></mesh>
    <Text position={[0, 1.8, 0]} fontSize={0.22} color="#183657">PERMISSION</Text>
    <Text position={[-1.7, -1.25, 0]} fontSize={0.2} color="#FF7D6C">CLARITY</Text>
    <Text position={[1.55, -1.25, 0]} fontSize={0.2} color="#FFC84A">PROOF</Text>
  </group>;
}
export default function DecisionLensScene() {
  return <Canvas camera={{ position: [0, 0, 5], fov: 40 }} dpr={[1, 1.5]}><ambientLight intensity={2} /><directionalLight position={[4, 3, 5]} intensity={3} /><Float speed={1.2} rotationIntensity={0.12}><Prism /></Float></Canvas>;
}
