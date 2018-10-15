import React from 'react'
import { Divider, ListItem, ListItemProps } from 'react-native-elements'

import { Theme } from '@config'

const MoreListItem: React.SFC<ListItemProps> = props => (
  <>
    <Divider style={{ zIndex: 2, marginHorizontal: 15 }} />
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
        paddingHorizontal: 15,
        paddingVertical: 20,
      }}
      {...props}
    />
  </>
)

export default MoreListItem
