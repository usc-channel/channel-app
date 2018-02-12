import { StackNavigator } from 'react-navigation'
import { Posts, ViewPost } from '@pages'
import { Theme } from '@config'

export default StackNavigator(
  {
    posts: {
      screen: Posts,
    },
    viewPost: {
      screen: ViewPost,
    },
  },
  {
    navigationOptions: Theme.navigationOptions,
  }
)
