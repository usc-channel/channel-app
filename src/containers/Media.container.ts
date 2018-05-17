import { StackNavigator } from 'react-navigation'
import { Videos } from '@pages'
import { Theme } from '@config'

export default StackNavigator(
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
