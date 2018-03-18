import { StackNavigator } from 'react-navigation'
import { Posts, SearchPosts, ViewPost } from '@pages'
import { Theme } from '@config'

export default StackNavigator(
  {
    posts: {
      screen: Posts,
      navigationOptions: {
        headerStyle: {
          ...Theme.navigationOptions.headerStyle,
          borderBottomWidth: 0,
          elevation: 0,
        },
      },
    },
    viewPost: {
      screen: ViewPost,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
    searchPosts: {
      screen: SearchPosts,
      navigationOptions: {
        tabBarVisible: false,
        header: null,
      },
    },
  },
  {
    headerMode: 'screen',
    navigationOptions: Theme.navigationOptions,
  }
)
