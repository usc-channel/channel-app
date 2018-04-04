import { StackNavigator } from 'react-navigation'
import { Lecturers, ViewLecturer } from '@pages'
import { Theme } from '@config'

export default StackNavigator(
  {
    posts: {
      screen: Lecturers,
      navigationOptions: {
        header: null,
      },
    },
    viewLecturer: {
      screen: ViewLecturer,
      navigationOptions: {
        headerStyle: {
          ...Theme.navigationOptions.headerStyle,
          borderBottomWidth: 0,
          elevation: 0,
        },
        tabBarVisible: false,
      },
    },
  },
  {
    navigationOptions: Theme.navigationOptions,
    headerMode: 'screen',
  }
)
