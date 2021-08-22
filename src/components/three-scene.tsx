import React, { FunctionComponent, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Canvas } from '@react-three/fiber'
import {
  EffectComposer,
  DepthOfField,
  Vignette,
} from '@react-three/postprocessing'
// import { OrbitControls } from '@react-three/drei'
import { Box } from 'theme-ui'

import theme from '../gatsby-plugin-theme-ui'

import ThreeMesh from './three-mesh'
import ThreeStars from './three-stars'

const ThreeScene: FunctionComponent = () => {
  const [hasLoaded, setHasLoaded] = useState(false)

  const {
    allLocations: { nodes },
  } = useStaticQuery(graphql`
    query {
      allLocations {
        nodes {
          city
          country
          country_code
          count
          lat
          lng
        }
      }
    }
  `)

  const handleLoad = () => {
    setHasLoaded(true)
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: (theme: any) => theme.sizes.header,
        left: 0,
        width: '100%',
        zIndex: 'canvas',
        overflow: 'hidden',
        canvas: {
          width: '100%',
          height: ['50vh', 'canvas'],
          opacity: hasLoaded ? 1 : 0,
        },
      }}
    >
      <Canvas
        gl={{ antialias: false, alpha: false }}
        camera={{
          fov: 45,
          position: [0, 100, 300],
        }}
        onCreated={handleLoad}
      >
        <color attach="background" args={[theme.colors.three.background]} />
        <ambientLight intensity={0.5} />
        <ThreeStars />
        <ThreeMesh locations={nodes} />
        <EffectComposer>
          <DepthOfField
            focusDistance={0}
            focalLength={0.8}
            bokehScale={1.8}
            height={theme.sizes.canvas}
          />
          <Vignette eskil={false} offset={0.2} darkness={1} />
        </EffectComposer>
      </Canvas>
    </Box>
  )
}

export default ThreeScene
