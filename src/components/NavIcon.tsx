import React from 'react'
import { Platform, View } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Touchable } from '@components'

interface Props {
  iconName: string
  onPress: () => void
}

const NavIcon = (props: Props) => {
  const Icon = Platform.OS === 'ios' ? Ionicon : MaterialIcon

  return (
    <Touchable onPress={props.onPress} rounded>
      <View style={{ marginHorizontal: 16 }}>
        <Icon
          size={Platform.OS === 'ios' ? 24 : 24}
          color="#fff"
          name={props.iconName}
          style={{ paddingVertical: 8 }}
        />
      </View>
    </Touchable>
  )
}

export default NavIcon
