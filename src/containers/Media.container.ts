import { StackNavigator } from 'react-navigation'
import { Media } from '@pages'
import { Theme } from '@config'

export default StackNavigator(
  {
    posts: {
      screen: Media,
    },
  },
  {
    navigationOptions: Theme.navigationOptions,
  }
)
