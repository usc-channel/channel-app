import { StackNavigator } from 'react-navigation'

import {
  Lecturers,
  NewReview,
  SearchCourses,
  ViewCourse,
  ViewLecturer,
} from '@pages'
import { Search } from '@components'
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
        ...Theme.flatNavigationOptions,
        tabBarVisible: false,
      },
    },
    viewCourse: {
      screen: ViewCourse,
      navigationOptions: {
        ...Theme.flatNavigationOptions,
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
        ...Theme.flatNavigationOptions,
        tabBarVisible: false,
      },
    },
    searchCourses: {
      screen: SearchCourses,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
      },
    },
    search: {
      screen: Search,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
      },
    },
  },
  {
    mode: 'modal',
  }
)
