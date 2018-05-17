import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'

import { ImagePulse, Touchable } from '@components'
import { Release } from '@types'

interface Props {
  release: Release
  viewRelease(release: Release): void
}

const ReleaseThumbnail: React.SFC<Props> = ({ release, viewRelease }) => (
  <Touchable onPress={() => viewRelease(release)}>
    <ImagePulse
      imageSource={{ uri: release.cover }}
      style={styles.image}
      thumbnailSource={require('../../../assets/newspaper.jpg')}
      thumbnailBlurRadius={0}
    />
  </Touchable>
)

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 1.26,
  },
})

export default ReleaseThumbnail
