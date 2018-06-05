import { createStackNavigator } from 'react-navigation'

import { More } from '@pages'

export default createStackNavigator(
  {
    more: {
      screen: More,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    headerMode: 'screen',
  }
)
