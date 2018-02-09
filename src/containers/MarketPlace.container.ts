import { StackNavigator } from 'react-navigation'
import { MarketPlace } from '@pages'
import { Theme } from '@config'

export default StackNavigator(
  {
    posts: {
      screen: MarketPlace,
    },
  },
  {
    navigationOptions: Theme.navigationOptions,
  }
)
