// tslint:disable:quotemark
// tslint:disable:max-line-length

import React from 'react'
import { AppRegistry, Platform, StatusBar, View, YellowBox } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { createStackNavigator, NavigationScreenProps } from 'react-navigation'
import { withNetworkConnectivity } from 'react-native-offline'

import Tabs from './containers/Tabs'
import Auth from './containers/Auth.container'
import { graphqlClient, store, Theme } from '@config'
import { NewCourse, NewReview } from '@pages'
import { NavIcon, Search } from '@components'

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
    initialRouteName: 'main',
    mode: 'modal',
  }
)

ModalStack = withNetworkConnectivity({
  withRedux: true,
})(ModalStack)

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated in plain JavaScript React classes.',
  "Module RNFetchBlob requires main queue setup since it overrides `constantsToExport` but doesn't implement `requiresMainQueueSetup`. In a future release React Native will default to initializing all native modules on a background thread unless explicitly opted-out of.",
  "Module RCTImageLoader requires main queue setup since it overrides `init` but doesn't implement `requiresMainQueueSetup`. In a future release React Native will default to initializing all native modules on a background thread unless explicitly opted-out of.",
])

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
