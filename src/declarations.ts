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

  export default class DropdownAlert extends React.Component<
    DropdownAlertProps
  > {
    alertWithType(type: string, title: string, message: string): void
  }
}

declare module '*.json' {
  const value: any
  export default value
}

declare module 'react-native-star-rating' {
  import * as React from 'react'
  import { ImageURISource, StyleProp, ViewStyle } from 'react-native'

  interface StarRatingProps {
    buttonStyle?: StyleProp<ViewStyle>
    containerStyle?: StyleProp<ViewStyle>
    disabled?: boolean
    emptyStar?: string | ImageURISource
    emptyStarColor?: string
    fullStar?: string | ImageURISource
    fullStarColor?: string
    halfStar?: string | ImageURISource
    halfStarColor?: string
    halfStarEnabled?: boolean
    iconSet?: string
    maxStars?: number
    rating?: number
    reversed?: boolean
    starSize?: number
    starStyle?: StyleProp<ViewStyle>
    selectedStar?(): void
  }

  export default class StarRating extends React.Component<StarRatingProps> {}
}
