import React from 'react'
import {
  Platform,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProperties,
  TouchableOpacity,
  TouchableOpacityProperties,
} from 'react-native'

let Component: any = TouchableOpacity

if (Platform.OS === 'android' && Platform.Version >= 21) {
  Component = TouchableNativeFeedback
}

type TouchableProps = {
  rounded?: boolean
} & TouchableOpacityProperties &
  TouchableNativeFeedbackProperties

const Touchable: React.SFC<TouchableProps> = props => (
  <Component
    {...props}
    background={
      Platform.OS === 'android' &&
      Platform.Version >= 21 &&
      (props.rounded
        ? TouchableNativeFeedback.SelectableBackgroundBorderless()
        : TouchableNativeFeedback.SelectableBackground())
    }
  >
    {props.children}
  </Component>
)

export default Touchable
