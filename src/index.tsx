import React from 'react'
import { AppRegistry, StatusBar, View } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { createStackNavigator } from 'react-navigation'
import { withNetworkConnectivity } from 'react-native-offline'
import FlashMessage from 'react-native-flash-message'
import SplashScreen from 'react-native-splash-screen'

import Tabs from './containers/Tabs'
import Auth from './containers/Auth.container'
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
      screen: Auth,
      navigationOptions: {
        header: null,
      },
    },
    newReview: {
      screen: NewReview,
      navigationOptions: {
        ...Theme.flatNavigationOptions,
        headerTitleStyle: {
          ...Theme.navigationOptions.headerTitleStyle,
          textAlign: 'center',
        },
      },
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

class AppRoot extends React.Component {
  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    return (
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
  }
}

AppRegistry.registerComponent('USCChannel', () => AppRoot)
