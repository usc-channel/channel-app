import { StackNavigator, TabNavigator } from 'react-navigation'
import { Adverts, Releases } from '@pages'
import { Theme } from '@config'

const Tabs = TabNavigator(
  {
    Releases: {
      screen: Releases,
    },
    Adverts: {
      screen: Adverts,
    },
  },
  {
    ...TabNavigator.Presets.AndroidTopTabs,
    tabBarPosition: 'top',
    swipeEnabled: true,
    tabBarOptions: {
      style: {
        backgroundColor: Theme.primary,
      },
      indicatorStyle: {
        backgroundColor: '#fff',
      },
      labelStyle: {
        fontFamily: 'NunitoSans-Bold',
        fontSize: 14,
      },
    },
  }
)

export default StackNavigator(
  {
    posts: {
      screen: Tabs,
      navigationOptions: {
        title: 'Archives',
      },
    },
  },
  {
    navigationOptions: {
      ...Theme.navigationOptions,
      headerStyle: {
        ...Theme.navigationOptions.headerStyle,
        borderBottomWidth: 0,
        elevation: 0,
      },
    },
  }
)
