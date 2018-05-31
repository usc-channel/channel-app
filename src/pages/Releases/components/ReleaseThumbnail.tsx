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

const width = (Dimensions.get('window').width - 24) / 2

const styles = StyleSheet.create({
  image: {
    width,
    height: width * 1.26,
    margin: 4,
  },
})

export default ReleaseThumbnail
