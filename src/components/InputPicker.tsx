import React from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { Touchable } from '@components'

interface Props {
  label: string
  value: string
  style?: StyleProp<ViewStyle>
  onPress(): void
}

const InputPicker: React.SFC<Props> = ({ style, value, label, onPress }) => (
  <Touchable onPress={onPress}>
    <View style={[styles.container, style]}>
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>

      <Icon name="md-arrow-dropdown" size={20} />
    </View>
  </Touchable>
)

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
    fontSize: 14,
    color: 'rgba(0,0,0,.38)',
  },
  value: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 16,
    color: 'rgba(0,0,0,.87)',
  },
})

export default InputPicker
