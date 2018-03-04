import React from 'react'
import { AppRegistry, StatusBar, View } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import Tabs from './containers/Tabs'
import { StackNavigator } from 'react-navigation'
import { graphqlClient, store, Theme } from '@config'
import { withNetworkConnectivity } from 'react-native-offline'

let ModalStack = StackNavigator(
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

ModalStack = withNetworkConnectivity({
  withRedux: true,
})(ModalStack)

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
