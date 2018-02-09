import { StackNavigator } from 'react-navigation'
import { Posts } from '@pages'
import { Theme } from '@config'

export default StackNavigator(
  {
    posts: {
      screen: Posts,
    },
  },
  {
    navigationOptions: Theme.navigationOptions,
  }
)
