import React from 'react'
import { ListItem, ListItemProps } from 'react-native-elements'

import { Theme } from '@config'

const MoreListItem: React.SFC<ListItemProps> = props => (
  <ListItem
    titleStyle={{
      fontFamily: Theme.fonts.regular,
      color: 'rgba(0,0,0,0.87)',
    }}
    subtitleStyle={{
      fontFamily: Theme.fonts.regular,
      color: 'rgba(0,0,0,0.87)',
    }}
    containerStyle={{
      paddingHorizontal: 0,
      paddingVertical: 20,
    }}
    topDivider
    {...props}
  />
)

export default MoreListItem
