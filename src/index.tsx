import { AppRegistry } from 'react-native'

import { StorybookUIRoot } from '../storybook'
import App from './App'

const SHOW_STORYBOOK = false

if (SHOW_STORYBOOK && __DEV__) {
  // 🎗 REMINDER: Storybook has a server you need to run from a terminal window.
  //
  // $> yarn run storybook
  //
  AppRegistry.registerComponent('USCChannel', () => StorybookUIRoot)
} else {
  // load our app
  AppRegistry.registerComponent('USCChannel', () => App)
}
