'use client';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function PerfumeBottle() {

    const { nodes, materials } = useGLTF('/assets/models/untitled.glb');
    return (
        <Canvas>
            <group {...nodes} dispose={null}>
                <group rotation={[Math.PI / 2, 0, 0]} scale={[0.219, 0.365, 0.223]}>
                    <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.uploads_files_2721777_lancome_1.geometry}
                    material={materials.aiStandardSurface1SG}
                    />
                    <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.uploads_files_2721777_lancome_2.geometry}
                    material={materials.aiStandardSurface2SG}
                    />
                    <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.uploads_files_2721777_lancome_3.geometry}
                    material={materials.aiStandardSurface3SG}
                    />
                    <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.uploads_files_2721777_lancome_4.geometry}
                    material={materials.aiStandardSurface7SG}
                    />
                    <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.uploads_files_2721777_lancome_5.geometry}
                    material={materials.aiStandardSurface5SG}
                    />
                </group>
            </group>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
        </Canvas>
    );
}