// tslint:disable:max-classes-per-file

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

declare module 'react-native-offline'

declare module 'react-native-dropdownalert' {
  import React from 'react'
  import { StyleProp, ViewStyle } from 'react-native'

  interface DropdownAlertProps {
    zIndex?: number
    defaultContainer?: StyleProp<ViewStyle>
    updateStatusBar?: boolean
    useNativeDriver?: boolean
    showCancel?: boolean
    closeInterval?: number
    renderCancel?(): React.ReactNode
  }

  type AlertType = 'info' | 'warn' | 'error' | 'success' | 'custom'

  export default class DropdownAlert extends React.Component<
    DropdownAlertProps
  > {
    alertWithType(type: AlertType, title: string, message: string): void
  }
}

declare module '*.json' {
  const value: any
  export default value
}

declare module 'react-native-flash-message' {
  import * as React from 'react'

  type MessageType = 'default' | 'info' | 'success' | 'danger' | 'warning'

  interface MessageOptions {
    message: string
    description?: string
    type?: MessageType
    backgroundColor?: string
    color?: string
    duration?: number
    autoHide?: boolean
  }

  interface FlashMessageProps {
    position?: 'top' | 'bottom' | 'center'
  }

  export default class FlashMessage extends React.Component<
    FlashMessageProps
  > {}

  export function showMessage(options: MessageOptions): void
}

declare module 'plur' {
  export default function plur(
    word: string,
    plural: string | number,
    count?: number
  ): string
}

declare module 'react-native-dotenv' {
  export const AUTH: string
  export const API_URL: string
  export const YOUTUBE_KEY: string
}
