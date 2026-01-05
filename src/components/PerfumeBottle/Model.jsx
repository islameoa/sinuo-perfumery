import React, { useRef } from "react";
import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Model({ scale = 1 }) {
  const { nodes } = useGLTF("/assets/models/sinuo_bottle.glb");
  const group = useRef(null);

//   useFrame(() => {
//     if (group.current) group.current.rotation.y += 0.005;
//   });

  const glassProps = {
    thickness: 0.25,
    roughness: 0.03,
    transmission: 1,
    ior: 1.35,
    chromaticAberration: 0.02,
    backside: true,
  };

  return (
    <group ref={group} scale={scale}>
      <mesh
        geometry={nodes.off006.geometry}
        position={nodes.off006.position}
        rotation={nodes.off006.rotation}
        scale={nodes.off006.scale}
      >
        <MeshTransmissionMaterial {...glassProps} />
      </mesh>

      <mesh geometry={nodes.off003.geometry} material={nodes.off003.material}
        position={nodes.off003.position} rotation={nodes.off003.rotation} scale={nodes.off003.scale}
      />

      <mesh geometry={nodes.INSIDE.geometry} material={nodes.INSIDE.material}
        position={nodes.INSIDE.position} rotation={nodes.INSIDE.rotation} scale={nodes.INSIDE.scale}
      />

      <mesh geometry={nodes.etiqueta_vertical_letras_negras004.geometry} material={nodes.etiqueta_vertical_letras_negras004.material}
        position={nodes.etiqueta_vertical_letras_negras004.position} rotation={nodes.etiqueta_vertical_letras_negras004.rotation} scale={nodes.etiqueta_vertical_letras_negras004.scale}
      />
    </group>
  );
}