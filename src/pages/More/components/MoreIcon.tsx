import React from 'react'
import { IconProps } from 'react-native-elements'

import { Ionicon } from '@components'

const MoreIcon: React.SFC<IconProps> = props => (
  <Ionicon type="ionicon" size={30} color="rgba(0,0,0,.87)" {...props} />
)

export default MoreIcon
