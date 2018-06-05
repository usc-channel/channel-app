import { createStackNavigator } from 'react-navigation'
import { Videos } from '@pages'
import { Theme } from '@config'

export default createStackNavigator(
  {
    videos: {
      screen: Videos,
      navigationOptions: {
        title: 'Media',
      },
    },
  },
  {
    navigationOptions: Theme.navigationOptions,
  }
)
