import React from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { Touchable } from '@components'
import { Theme } from '@config'

interface Props {
  label: string
  placeholder?: string
  value: string
  style?: StyleProp<ViewStyle>
  error?: string | null
  onPress(): void
}

const InputPicker: React.SFC<Props> = ({
  style,
  error,
  value,
  label,
  onPress,
  placeholder,
}) => {
  const isEmpty = value === ''

  return (
    <Touchable onPress={onPress}>
      <View style={[styles.container, style]}>
        <View>
          <Text style={[styles.label, error ? styles.error : {}]}>
            {error || label}
          </Text>

          <Text style={[styles.value, isEmpty ? styles.placeholder : {}]}>
            {isEmpty ? placeholder : value}
          </Text>
        </View>

        <Icon name="md-arrow-dropdown" size={20} />
      </View>
    </Touchable>
  )
}
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,.12)',
    backgroundColor: '#fff',
    paddingTop: 13,
    paddingBottom: 11,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: 12,
    color: 'rgba(0,0,0,.54)',
  },
  value: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 16,
    color: 'rgba(0,0,0,.87)',
  },
  placeholder: {
    color: 'rgba(0,0,0,.26)',
  },
  error: {
    color: Theme.error,
  },
})

export default InputPicker
