import React from 'react'
import { AppRegistry, StatusBar, View } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import Tabs from './containers/Tabs'
import { StackNavigator } from 'react-navigation'
import { graphqlClient, Theme } from '@config'

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
  <ApolloProvider client={graphqlClient}>
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={Theme.darkPrimary} barStyle="light-content" />
      <ModalStack />
    </View>
  </ApolloProvider>
)

AppRegistry.registerComponent('USCChannel', () => AppRoot)
