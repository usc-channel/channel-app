import React from 'react'
import { Platform } from 'react-native'
import {
  createBottomTabNavigator,
  NavigationScreenProps,
  TabScene,
} from 'react-navigation'
import { Theme } from '@config'
import Posts from './Posts.container'
import Lecturers from './Lecturers.container'
import Media from './Media.container'
import Archives from './Archives.container'
import More from './More.container'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

type Navigation = NavigationScreenProps<{ index: number }>

export default createBottomTabNavigator(
  {
    Posts: {
      screen: Posts,
      navigationOptions: ({ navigation }: any) => {
        let tabBarVisible = true

        if (navigation.state.index > 0) {
          tabBarVisible = false
        }

        return {
          tabBarVisible,
          tabBarLabel: 'POSTS',
          tabBarIcon: ({ tintColor, focused }: TabScene) => (
            <Ionicons
              name={
                Platform.OS === 'ios'
                  ? `ios-paper${!focused ? '-outline' : ''}`
                  : 'md-paper'
              }
              size={Theme.tabIconSize}
              color={tintColor!}
            />
          ),
        }
      },
    },
    Lecturers: {
      screen: Lecturers,
      navigationOptions: ({ navigation }: Navigation) => {
        let tabBarVisible = true

        if (navigation.state.index > 0) {
          tabBarVisible = false
        }

        return {
          tabBarVisible,
          tabBarLabel: 'REVIEWS',
          tabBarIcon: ({ tintColor, focused }: TabScene) => (
            <Ionicons
              name={
                Platform.OS === 'ios'
                  ? `ios-chatbubbles${!focused ? '-outline' : ''}`
                  : 'md-chatbubbles'
              }
              size={Theme.tabIconSize}
              color={tintColor!}
            />
          ),
        }
      },
    },
    Media: {
      screen: Media,
      navigationOptions: {
        tabBarLabel: 'MEDIA',
        tabBarIcon: ({ tintColor, focused }: TabScene) => {
          return Platform.OS === 'ios' ? (
            <Ionicons
              name={`ios-images${!focused ? '-outline' : ''}`}
              size={Theme.tabIconSize}
              color={tintColor!}
            />
          ) : (
            <MaterialIcons
              name="photo-library"
              size={Theme.tabIconSize}
              color={tintColor!}
            />
          )
        },
      },
    },
    Archives: {
      screen: Archives,
      navigationOptions: ({ navigation }: any) => {
        let tabBarVisible = true

        if (navigation.state.index > 0) {
          tabBarVisible = false
        }

        return {
          tabBarVisible,
          tabBarLabel: 'ARCHIVES',
          tabBarIcon: ({ tintColor, focused }: TabScene) => {
            return Platform.OS === 'ios' ? (
              <Ionicons
                name={`ios-bookmarks${!focused ? '-outline' : ''}`}
                size={Theme.tabIconSize}
                color={tintColor!}
              />
            ) : (
              <MaterialIcons
                name="import-contacts"
                size={Theme.tabIconSize}
                color={tintColor!}
              />
            )
          },
        }
      },
    },
    More: {
      screen: More,
      navigationOptions: {
        tabBarLabel: 'MORE',
        tabBarIcon: ({ tintColor }: TabScene) => {
          return Platform.OS === 'ios' ? (
            <Ionicons
              name="ios-menu"
              size={Theme.tabIconSize}
              color={tintColor!}
            />
          ) : (
            <MaterialIcons
              name="menu"
              size={Theme.tabIconSize}
              color={tintColor!}
            />
          )
        },
      },
    },
  },
  {
    initialRouteName: 'Lecturers',
    tabBarOptions: {
      showLabel: Platform.OS === 'ios',
      activeTintColor: Theme.primary,
      inactiveTintColor: '#5C5D5E',
      style: {
        ...(Platform.OS === 'ios' ? { height: 56 } : {}),
      },
      tabStyle: {
        backgroundColor: '#fff',
      },
      ...(Platform.OS === 'ios'
        ? {
            labelStyle: {
              marginBottom: 8,
              marginTop: -6,
              fontFamily: 'NunitoSans-Bold',
              fontSize: 10,
            },
          }
        : {}),
    },
    tabBarPosition: 'bottom',
  }
)
