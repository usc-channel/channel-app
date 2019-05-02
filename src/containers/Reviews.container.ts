import { Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import {
  Reviews,
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
  },
  {
    defaultNavigationOptions: Theme.navigationOptions,
    headerMode: 'screen',
  }
)
