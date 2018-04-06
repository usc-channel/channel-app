import React from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProperties,
  View,
  ViewStyle,
} from 'react-native'

interface Props {
  label: string
  value: string
  style?: StyleProp<ViewStyle>
  inputProps?: TextInputProperties
  onChangeText(text: string): void
}

const Input: React.SFC<Props> = ({
  style,
  inputProps,
  value,
  label,
  onChangeText,
}) => (
  <View style={[styles.container, style]}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      {...inputProps}
      style={styles.value}
      value={value}
      onChangeText={onChangeText}
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,.12)',
    backgroundColor: '#fff',
    paddingTop: 13,
    paddingBottom: 11,
    paddingHorizontal: 16,
  },
  label: {
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: 14,
    color: 'rgba(0,0,0,.38)',
  },
  value: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 16,
    color: 'rgba(0,0,0,.87)',
  },
})

export default Input
