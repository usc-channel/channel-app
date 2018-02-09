import { StackNavigator } from 'react-navigation'
import { Archives } from '@pages'
import { Theme } from '@config'

export default StackNavigator(
  {
    posts: {
      screen: Archives,
    },
  },
  {
    navigationOptions: Theme.navigationOptions,
  }
)
