import * as THREE from "three";
import React, { useMemo, useRef, useState } from "react";
import { ThreeElements } from "@react-three/fiber";

export default function Box(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />

      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}
