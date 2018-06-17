import React from 'react'
import { User } from '@types'
import { Avatar, ListItem } from 'react-native-elements'

interface Props {
  user: Partial<User>
  onPress(): void
}

const SignedInUser: React.SFC<Props> = ({ user, onPress }) => (
  <ListItem
    title={user.name!.substr(0, user.name!.indexOf(' '))}
    titleStyle={{
      fontFamily: 'NunitoSans-SemiBold',
      fontSize: 30,
      color: 'rgba(0,0,0,0.87)',
    }}
    subtitleStyle={{
      fontFamily: 'NunitoSans-Regular',
      color: 'rgba(0,0,0,0.87)',
    }}
    subtitle="View and edit account"
    rightAvatar={
      <Avatar
        rounded
        size="medium"
        source={{
          uri: user.avatar,
        }}
      />
    }
    containerStyle={{
      paddingHorizontal: 0,
      marginBottom: 10,
    }}
    onPress={onPress}
  />
)

export default SignedInUser
