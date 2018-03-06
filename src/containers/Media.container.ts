import { StackNavigator, TabNavigator } from 'react-navigation'
import { Gallery, Videos } from '@pages'
import { Theme } from '@config'

const Tabs = TabNavigator(
  {
    Videos: {
      screen: Videos,
    },
    Gallery: {
      screen: Gallery,
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
        title: 'Media',
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
      headerTitleStyle: {
        fontFamily: 'NunitoSans-Bold',
        fontSize: 20,
        alignSelf: 'flex-start',
      },
    },
  }
)
