import React from 'react'
import { ListItem } from 'react-native-elements'

interface Props {
  onPress(): void
}

const LoggedOutUser: React.SFC<Props> = ({ onPress }) => (
  <ListItem
    title="Not Logged In"
    titleStyle={{
      fontFamily: 'NunitoSans-SemiBold',
      color: 'rgba(0,0,0,0.87)',
      fontSize: 20,
    }}
    subtitleStyle={{
      fontFamily: 'NunitoSans-Regular',
      color: 'rgba(0,0,0,0.87)',
    }}
    subtitle="Adding Reviews requires you to log in."
    containerStyle={{
      paddingHorizontal: 0,
      marginBottom: 10,
    }}
    onPress={onPress}
  />
)

export default LoggedOutUser
