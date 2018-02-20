declare module 'react-native-render-html' {
  import * as React from 'react'
  import { StyleProp, TextStyle } from 'react-native'

  interface Props {
    html: string
    tagsStyles?: object
    baseFontStyle?: StyleProp<TextStyle>
    ignoredStyles?: string[]
    imagesMaxWidth?: number
  }

  export default class HTML extends React.Component<Props> {}
}

declare module 'react-native-status-bar-height' {
  function getStatusBarHeight(): number
}
