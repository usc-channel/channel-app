import { StackNavigator } from 'react-navigation'
import { Releases, ViewRelease } from '@pages'
import { Theme } from '@config'

export default StackNavigator(
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
    },
  },
  {
    navigationOptions: Theme.navigationOptions,
  }
)
