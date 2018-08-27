import React from 'react'
import { User } from '@types'
import { Avatar, ListItem } from 'react-native-elements'
import { Theme } from '@config'

interface Props {
  user: Partial<User>
}

const SignedInUser: React.SFC<Props> = ({ user }) => (
  <ListItem
    title={user.name!.substr(0, user.name!.indexOf(' '))}
    titleStyle={{
      fontFamily: Theme.fonts.semiBold,
      fontSize: 30,
      color: 'rgba(0,0,0,0.87)',
    }}
    subtitleStyle={{
      fontFamily: Theme.fonts.regular,
      color: 'rgba(0,0,0,0.87)',
    }}
    subtitle={`Yes, it's your account`}
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
  />
)

export default SignedInUser
