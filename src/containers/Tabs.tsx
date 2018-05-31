import React from 'react'
import { Platform } from 'react-native'
import { TabBarBottom, TabNavigator, TabScene } from 'react-navigation'
import { Theme } from '@config'
import Posts from './Posts.container'
import Lecturers from './Lecturers.container'
import Media from './Media.container'
import Archives from './Archives.container'
import More from './More.container'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default TabNavigator(
  {
    Posts: {
      screen: Posts,
      navigationOptions: {
        tabBarLabel: 'POSTS',
        tabBarIcon: ({ tintColor, focused }: TabScene) => {
          return Platform.OS === 'ios' ? (
            <Ionicons
              name={`ios-paper${!focused ? '-outline' : ''}`}
              size={Theme.tabIconSize}
              color={tintColor!}
            />
          ) : (
            <MaterialIcons
              name="subject"
              size={Theme.tabIconSize}
              color={tintColor!}
            />
          )
        },
      },
    },
    Lecturers: {
      screen: Lecturers,
      navigationOptions: {
        tabBarLabel: 'REVIEWS',
        tabBarIcon: ({ tintColor, focused }: TabScene) => {
          return Platform.OS === 'ios' ? (
            <Ionicons
              name={`ios-chatbubbles${!focused ? '-outline' : ''}`}
              size={Theme.tabIconSize}
              color={tintColor!}
            />
          ) : (
            <MaterialIcons
              name="assignment-ind"
              size={Theme.tabIconSize}
              color={tintColor!}
            />
          )
        },
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
      navigationOptions: {
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
              name="more"
              size={Theme.tabIconSize}
              color={tintColor!}
            />
          )
        },
      },
    },
  },
  {
    initialRouteName: 'More',
    tabBarComponent: props => (
      <TabBarBottom
        {...props}
        style={{
          backgroundColor: '#fff',
          ...(Platform.OS === 'ios' && { height: 56 }),
        }}
      />
    ),
    tabBarOptions: {
      activeTintColor: Theme.primary,
      inactiveTintColor: '#5C5D5E',
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
