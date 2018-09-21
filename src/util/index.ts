import { Dimensions, Platform, StatusBar } from 'react-native'
import { MessageOptions, showMessage } from 'react-native-flash-message'

const printArray = (values: string[]) => values.toString().replace(/,/g, ', ')

const showBanner = (options: MessageOptions) => {
  return new Promise(resolve => {
    showMessage({ duration: 3000, ...options })
    setTimeout(resolve, 3000)
  })
}

// See https://mydevice.io/devices/ for device dimensions
const X_WIDTH = 375
const X_HEIGHT = 812
const XSMAX_WIDTH = 414
const XSMAX_HEIGHT = 896

const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window')

const isIPhoneX = () => {
  if (Platform.OS === 'web') {
    return false
  }

  return (
    (Platform.OS === 'ios' &&
      ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
        (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))) ||
    ((D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
      (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT))
  )
}

const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    return isIPhoneX() ? 44 : 20
  }

  return StatusBar.currentHeight
}

export { printArray, showBanner, getStatusBarHeight }
