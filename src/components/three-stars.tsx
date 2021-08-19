import React, { FunctionComponent, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

interface IThreeStarsProps {}

const ThreeStars: FunctionComponent<IThreeStarsProps> = () => {
  const mesh = useRef<THREE.Mesh>(null!)

  useFrame(() => {
    return (mesh.current.rotation.y += 0.001)
  })

  return (
    <mesh ref={mesh}>
      <Stars radius={100} depth={20} count={500} factor={7} fade />
    </mesh>
  )
}

export default ThreeStars
