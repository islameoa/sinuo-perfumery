import React, { useRef } from 'react'
import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'

export default function Model() {
    const { nodes } = useGLTF("/assets/models/torrus.glb");
    const { viewport } = useThree()
    const torus = useRef(null);
    
    useFrame( () => {
        torus.current.rotation.x += 0.005;
    })

    // const materialProps = useControls({
    //     thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    //     roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    //     transmission: {value: 1, min: 0, max: 1, step: 0.1},
    //     ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    //     chromaticAberration: { value: 0.02, min: 0, max: 1},
    //     backside: { value: true},
    // })
    const materialProps = {
        thickness: 0.2,
        roughness: 0,
        transmission: 1,
        ior: 1.2,
        chromaticAberration: 0.02,
        backside: true
    }
    
    return (
        <group scale={viewport.width / 3.75} >
            <Text font={'assets/fonts/PPNeueMontreal-Bold.otf'} position={[0, 0, -1]} fontSize={0.7} color="white" anchorX="center" anchorY="middle">
                sinuo
            </Text>
            <mesh ref={torus} {...nodes.Torus002}>
                <MeshTransmissionMaterial {...materialProps}/>
            </mesh>
        </group>
    )
}