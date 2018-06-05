import React from 'react'
import { TextField, TextFieldProps } from 'react-native-material-textfield'

export default class LoginTextField extends React.Component<TextFieldProps> {
  textField: TextField | null

  focus() {
    this.textField!.focus()
  }

  blur() {
    this.textField!.blur()
  }

  render() {
    return (
      <TextField
        ref={ref => (this.textField = ref)}
        labelTextStyle={{ fontFamily: 'NunitoSans-SemiBold' }}
        fontSize={18}
        style={{ fontFamily: 'NunitoSans-Regular' }}
        labelFontSize={14}
        containerStyle={{ marginTop: 8 }}
        {...this.props}
      />
    )
  }
}
