import { MessageOptions, showMessage } from 'react-native-flash-message'

const printArray = (values: string[]) => values.toString().replace(/,/g, ', ')

const showBanner = (options: MessageOptions) => {
  return new Promise(resolve => {
    showMessage({ duration: 3000, ...options })
    setTimeout(resolve, 3000)
  })
}

export { printArray, showBanner }
