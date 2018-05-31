import React from 'react'
import { Icon, IconProps } from 'react-native-elements'

const MoreIcon: React.SFC<IconProps> = props => (
  <Icon type="ionicon" size={30} color="rgba(0,0,0,.87)" {...props} />
)

export default MoreIcon
