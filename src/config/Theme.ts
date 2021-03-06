import {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native'
import { Theme } from 'react-native-elements'

const fonts = {
  regular: 'NunitoSans-Regular',
  light: 'NunitoSans-Light',
  semiBold: 'NunitoSans-SemiBold',
  bold: 'NunitoSans-Bold',
  extraBold: 'NunitoSans-ExtraBold',
}

const navigationOptions = {
  headerStyle: {
    backgroundColor: '#2266AA',
  },
  headerTintColor: '#fff',
  ...(Platform.OS === 'ios'
    ? {
        headerTitleStyle: {
          fontFamily: fonts.bold,
          fontSize: 20,
          flex: 1,
          textAlign: 'left',
        },
      }
    : {
        headerTitleStyle: {
          fontFamily: fonts.bold,
          fontWeight: '400',
        },
      }),
} as any

const theme = {
  accent: '#4E9CD0',
  darkPrimary: '#194D81',
  tabIconSize: 24,
  navigationOptions,
  flatNavigationOptions: {
    ...navigationOptions,
    headerStyle: {
      ...navigationOptions.headerStyle,
      borderBottomWidth: 0,
      elevation: 0,
    },
  },
  primary: '#2266AA',
  background: '#F3F5FA',
  error: '#D23D27',
  success: '#4EC85C',
  star: 'hsl(46, 97%, 46%)',
  loadingTimeout: 400,
  refreshTimeout: 1000,
  fonts,
}

const ElementsTheme: Theme = {
  ListItem: {
    Component:
      Platform.OS === 'ios' ? TouchableHighlight : TouchableNativeFeedback,
  },
  SearchBar: {
    placeholderTextColor: '#bdbdbd',
  },
}

export { ElementsTheme }
export default theme
