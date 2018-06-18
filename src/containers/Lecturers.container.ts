import { Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import { Lecturers, ViewCourse, ViewLecturer } from '@pages'
import { Theme } from '@config'

export default createStackNavigator(
  {
    posts: {
      screen: Lecturers,
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
    viewCourse: {
      screen: ViewCourse,
      navigationOptions: Theme.flatNavigationOptions,
    },
  },
  {
    navigationOptions: Theme.navigationOptions,
    headerMode: 'screen',
  }
)
