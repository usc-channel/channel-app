import { createStackNavigator } from 'react-navigation'
import { Releases, ViewRelease } from '@pages'
import { Theme } from '@config'

export default createStackNavigator(
  {
    Archives: {
      screen: Releases,
      navigationOptions: {
        title: 'Archives',
        ...Theme.navigationOptions,
      },
    },
    ViewRelease: {
      screen: ViewRelease,
      navigationOptions: {
        ...Theme.navigationOptions,
        headerTitleStyle: {
          ...Theme.navigationOptions.headerTitleStyle,
          textAlign: 'center',
        },
      },
    },
  },
  {
    navigationOptions: Theme.navigationOptions,
  }
)
