import { StackNavigator } from 'react-navigation'

import { More } from '@pages'

export default StackNavigator(
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
