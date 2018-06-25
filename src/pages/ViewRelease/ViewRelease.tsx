import React from 'react'
import { Dimensions } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import Pdf from 'react-native-pdf'

import { Release } from '@types'

interface ScreenProps {
  release: Release
}

type Props = NavigationScreenProps<ScreenProps>

class ViewRelease extends React.Component<Props> {
  static navigationOptions = ({ navigation }: Props) => ({
    title: navigation.getParam('release').title,
  })

  render() {
    return (
      <Pdf
        style={{
          flex: 1,
          width: Dimensions.get('window').width,
        }}
        source={{ uri: this.props.navigation.getParam('release').magazine }}
      />
    )
  }
}

export default ViewRelease
