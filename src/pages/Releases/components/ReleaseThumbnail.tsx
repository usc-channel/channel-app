import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

import { ImagePulse, Touchable } from '@components'
import { Release } from '@types'

interface Props {
  release: Release
  viewRelease(release: Release): void
}

const ReleaseThumbnail: React.SFC<Props> = ({ release, viewRelease }) => (
  <View style={styles.content}>
    <Touchable onPress={() => viewRelease(release)}>
      <View>
        <ImagePulse
          imageSource={{ uri: release.cover }}
          style={styles.image}
          thumbnailSource={require('../../../assets/newspaper.jpg')}
          thumbnailBlurRadius={0}
        />
      </View>
    </Touchable>
  </View>
)

const width = (Dimensions.get('window').width - 32) / 2

const styles = StyleSheet.create({
  content: {
    width,
    height: width * 1.26,
    margin: 8,
  },
  image: {
    width,
    height: width * 1.26,
  },
})

export default ReleaseThumbnail
