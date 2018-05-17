import React from 'react'
import { TabBarBottom, TabNavigator, TabScene } from 'react-navigation'
import { Theme } from '@config'
import Posts from './Posts.container'
import Lecturers from './Lecturers.container'
import Media from './Media.container'
import Archives from './Archives.container'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default TabNavigator(
  {
    Posts: {
      screen: Posts,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: TabScene) => {
          return (
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
        tabBarIcon: ({ tintColor }: TabScene) => {
          return (
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
        tabBarIcon: ({ tintColor }: TabScene) => {
          return (
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
        tabBarIcon: ({ tintColor }: TabScene) => {
          return (
            <MaterialIcons
              name="import-contacts"
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
    animationEnabled: false,
    swipeEnabled: false,
    tabBarComponent: props => (
      <TabBarBottom {...props} style={{ backgroundColor: '#fff' }} />
    ),
    tabBarOptions: {
      activeTintColor: Theme.primary,
      inactiveTintColor: '#666666',
      showLabel: false,
      tabStyle: {
        backgroundColor: '#fff',
      },
    },
    tabBarPosition: 'bottom',
  }
)
