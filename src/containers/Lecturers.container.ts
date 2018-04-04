import { StackNavigator } from 'react-navigation'

import { Lecturers, NewReview, ViewCourse, ViewLecturer } from '@pages'
import { Theme } from '@config'

const PushStack = StackNavigator(
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
    viewCourse: {
      screen: ViewCourse,
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

export default StackNavigator(
  {
    Main: {
      screen: PushStack,
      navigationOptions: {
        header: null,
      },
    },
    newReview: {
      screen: NewReview,
      navigationOptions: {
        ...Theme.navigationOptions,
        tabBarVisible: false,
      },
    },
  },
  {
    mode: 'modal',
  }
)
