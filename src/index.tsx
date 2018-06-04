import React from 'react'
import { AppRegistry, StatusBar, View } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import { withNetworkConnectivity } from 'react-native-offline'

import Tabs from './containers/Tabs'
import { graphqlClient, store, Theme } from '@config'
import { Login } from '@pages'

let ModalStack = StackNavigator(
  {
    main: {
      screen: Tabs,
    },
    login: {
      screen: Login,
    },
  },
  {
    initialRouteName: 'login',
    navigationOptions: {
      header: null,
    },
    mode: 'modal',
  }
)

ModalStack = withNetworkConnectivity({
  withRedux: true,
})(ModalStack)

console.disableYellowBox = true

const AppRoot = () => (
  <Provider store={store}>
    <ApolloProvider client={graphqlClient}>
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={Theme.darkPrimary}
          barStyle="light-content"
        />
        <ModalStack />
      </View>
    </ApolloProvider>
  </Provider>
)

AppRegistry.registerComponent('USCChannel', () => AppRoot)
