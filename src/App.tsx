import React from 'react'
import { StatusBar, View } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { createStackNavigator } from 'react-navigation'
import { withNetworkConnectivity } from 'react-native-offline'
import FlashMessage from 'react-native-flash-message'

import { AuthContainer, Tabs } from '@containers'
import { graphqlClient, store, Theme } from '@config'
import { NewCourse, NewLecturer, NewReview } from '@pages'
import { Search } from '@components'

let ModalStack = createStackNavigator(
  {
    main: {
      screen: Tabs,
      navigationOptions: {
        header: null,
      },
    },
    signIn: {
      screen: AuthContainer,
      navigationOptions: {
        header: null,
      },
    },
    newReview: {
      screen: NewReview,
      navigationOptions: Theme.flatNavigationOptions,
    },
    search: {
      screen: Search,
      navigationOptions: {
        header: null,
      },
    },
    newCourse: {
      screen: NewCourse,
    },
    newLecturer: {
      screen: NewLecturer,
    },
  },
  {
    initialRouteName: 'main',
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
        <FlashMessage position="bottom" />
      </View>
    </ApolloProvider>
  </Provider>
)

export default AppRoot
