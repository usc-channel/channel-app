import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'

import { Touchable } from '@components'
import { Release } from '@types'

interface Props {
  release: Release
  viewRelease(release: Release): void
}

const ReleaseThumbnail: React.SFC<Props> = ({ release, viewRelease }) => (
  <Touchable onPress={() => viewRelease(release)}>
    <View style={styles.container}>
      <FastImage source={{ uri: release.cover }} style={styles.image} />
    </View>
  </Touchable>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 1.26,
  },
})

export default ReleaseThumbnail
