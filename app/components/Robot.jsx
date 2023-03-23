"use client";

import React, { useRef } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Robot() {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.z -= 0.0025));

  const { nodes, materials } = useGLTF("/robot_sm.glb");
  return (
    <group castShadow dispose={null}>
      <group castShadow scale={0.01}>
        <mesh
          castShadow
          geometry={nodes.CHARACTER__0.geometry}
          material={materials["Scene_-_Root"]}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={60}
          ref={ref}
        />
      </group>
      <OrbitControls enableZoom={false} enableRotate={true} enablePan={false} />
    </group>
  );
}
