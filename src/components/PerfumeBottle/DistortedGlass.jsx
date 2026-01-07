import { Canvas } from '@react-three/fiber'
import Model from './Model'
import { Environment, OrbitControls, Center, Bounds, useBounds } from '@react-three/drei'
import { useEffect } from 'react'

function FitOnce() {
  const bounds = useBounds()
  useEffect(() => { bounds.refresh().fit().clip() }, [bounds])
  return null
}

export default function DistortedGlass() {
  return (
    <Canvas
      style={{ background: '#4e0808', width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 4], fov: 45, near: 0.01, far: 1000 }}
    >
      <directionalLight intensity={2} position={[0, 2, 3]} />
      <Environment preset="city" />

      <Bounds clip margin={1.6}>
        <FitOnce />
        <Center>
          <Model scale={1} />
        </Center>
      </Bounds>

      <OrbitControls enablePan={false} enableZoom={false} enableDamping dampingFactor={0.08} />
    </Canvas>
  )
}