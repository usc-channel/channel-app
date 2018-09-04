import { Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import {
  Reviews,
  SearchReviews,
  ViewCourseLecturers,
  ViewLecturer,
  ViewLecturerCourse,
} from '@pages'
import { Theme } from '@config'

export default createStackNavigator(
  {
    posts: {
      screen: Reviews,
      navigationOptions: {
        ...Theme.navigationOptions,
        headerTitleStyle: {
          ...Theme.navigationOptions.headerTitleStyle,
          ...(Platform.OS === 'ios'
            ? {
                marginLeft: -50,
              }
            : {}),
        },
      },
    },
    viewLecturer: {
      screen: ViewLecturer,
      navigationOptions: Theme.flatNavigationOptions,
    },
    viewLecturerCourse: {
      screen: ViewLecturerCourse,
      navigationOptions: Theme.flatNavigationOptions,
    },
    viewCourseLecturers: {
      screen: ViewCourseLecturers,
      navigationOptions: Theme.flatNavigationOptions,
    },
    searchReviews: {
      screen: SearchReviews,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    navigationOptions: Theme.navigationOptions,
    headerMode: 'screen',
  }
)
