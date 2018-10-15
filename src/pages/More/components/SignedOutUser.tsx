import React from 'react'
import { ListItem } from 'react-native-elements'
import { Theme } from '@config'

const SignedOutUser = () => (
  <ListItem
    title="Not Signed In"
    titleStyle={{
      fontFamily: Theme.fonts.semiBold,
      color: 'rgba(0,0,0,0.87)',
      fontSize: 20,
    }}
    subtitleStyle={{
      fontFamily: Theme.fonts.regular,
      color: 'rgba(0,0,0,0.87)',
    }}
    subtitle="Adding Reviews requires you to sign in."
    containerStyle={{
      paddingHorizontal: 0,
      marginBottom: 10,
      marginHorizontal: 15,
    }}
    disabled
  />
)

export default SignedOutUser
