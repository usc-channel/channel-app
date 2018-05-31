import React from 'react'
import { ListItem, ListItemProps } from 'react-native-elements'

const MoreListItem: React.SFC<ListItemProps> = props => (
  <ListItem
    titleStyle={{
      fontFamily: 'NunitoSans-Regular',
      color: 'rgba(0,0,0,0.87)',
    }}
    subtitleStyle={{
      fontFamily: 'NunitoSans-Regular',
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
