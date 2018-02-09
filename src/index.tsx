import React from 'react'
import { AppRegistry, StatusBar, View } from 'react-native'
import Tabs from './containers/Tabs'
import { StackNavigator } from 'react-navigation'
import { Theme } from '@config'

const ModalStack = StackNavigator(
  {
    main: {
      screen: Tabs,
    },
  },
  {
    navigationOptions: {
      header: null,
    },
    mode: 'modal',
  }
)

const AppRoot = () => (
  <View style={{ flex: 1 }}>
    <StatusBar backgroundColor={Theme.darkPrimary} barStyle="light-content" />
    <ModalStack />
  </View>
)

AppRegistry.registerComponent('USCChannel', () => AppRoot)
