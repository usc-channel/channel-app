import { createStackNavigator } from 'react-navigation'
import { Posts, SearchPosts, ViewPost } from '@pages'
import { Theme } from '@config'

export default createStackNavigator(
  {
    posts: {
      screen: Posts,
      navigationOptions: Theme.flatNavigationOptions,
    },
    viewPost: {
      screen: ViewPost,
    },
    searchPosts: {
      screen: SearchPosts,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    headerMode: 'screen',
    navigationOptions: Theme.navigationOptions,
  }
)
