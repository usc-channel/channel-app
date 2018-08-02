import React from 'react'

import { Keyboard, Platform, StatusBar } from 'react-native'
import { createStackNavigator, NavigationScreenProps } from 'react-navigation'
import { ForgotPassword, SignIn, SignUp } from '@pages'
import { NavIcon } from '@components'
import { Theme } from '@config'

export default createStackNavigator(
  {
    signIn: {
      screen: SignIn,
      navigationOptions: ({ navigation }: NavigationScreenProps<{}>) => ({
        headerStyle: {
          backgroundColor: '#fff',
          borderBottomWidth: 0,
          elevation: 0,
        },
        headerLeft: (
          <NavIcon
            iconName={Platform.OS === 'ios' ? 'ios-arrow-down' : 'arrow-back'}
            color={Theme.primary}
            onPress={() => {
              Keyboard.dismiss()
              StatusBar.setBarStyle('light-content', true)
              navigation.pop()
            }}
          />
        ),
      }),
    },
    signUp: {
      screen: SignUp,
      navigationOptions: ({ navigation }: NavigationScreenProps<{}>) => ({
        headerStyle: {
          backgroundColor: '#fff',
          borderBottomWidth: 0,
          elevation: 0,
        },
        headerLeft: (
          <NavIcon
            iconName={Platform.OS === 'ios' ? 'ios-arrow-back' : 'arrow-back'}
            color={Theme.primary}
            onPress={() => navigation.pop()}
          />
        ),
      }),
    },
    forgotPassword: {
      screen: ForgotPassword,
      navigationOptions: ({ navigation }: NavigationScreenProps<{}>) => ({
        headerStyle: {
          backgroundColor: '#fff',
          borderBottomWidth: 0,
          elevation: 0,
        },
        headerLeft: (
          <NavIcon
            iconName={Platform.OS === 'ios' ? 'ios-arrow-back' : 'arrow-back'}
            color={Theme.primary}
            onPress={() => navigation.pop()}
          />
        ),
      }),
    },
  },
  {
    headerMode: 'screen',
  }
)
