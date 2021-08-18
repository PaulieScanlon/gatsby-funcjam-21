import React, { FunctionComponent } from 'react'

import theme from '../gatsby-plugin-theme-ui'
import { IRadius } from '../types'

interface IThreeSphereProps extends IRadius {}

const ThreeSphere: FunctionComponent<IThreeSphereProps> = ({ radius }) => {
  return (
    <mesh>
      <sphereGeometry args={[radius, 16, 16]} />
      {/* <meshToonMaterial color={theme.colors.three.sphere} /> */}
      <meshPhongMaterial
        color={theme.colors.three.sphere}
        flatShading
        shininess={100}
      />
    </mesh>
  )
}

export default ThreeSphere