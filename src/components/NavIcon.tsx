import React from 'react'
import { Platform, View } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Ionicon, Touchable } from '@components'

interface Props {
  iconName: string
  color?: string
  onPress: () => void
}

const NavIcon: React.SFC<Props> = props => {
  const Icon = Platform.OS === 'ios' ? Ionicon : MaterialIcon

  return (
    <Touchable onPress={props.onPress} rounded>
      <View style={{ marginHorizontal: 16 }}>
        <Icon
          size={Platform.OS === 'ios' ? 24 : 24}
          color={props.color}
          name={props.iconName}
          style={{ paddingVertical: 8 }}
        />
      </View>
    </Touchable>
  )
}

NavIcon.defaultProps = {
  color: '#fff',
}

export default NavIcon
