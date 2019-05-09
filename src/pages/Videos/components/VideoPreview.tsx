import React from 'react'
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import moment from 'moment'

import { Video } from '@types'
import { Theme } from '@config'
import { Touchable } from '@components'

interface Props {
  video: Video
  onPress(video: Video): void
}

const VideoPreview: React.SFC<Props> = ({ video, onPress }) => (
  <ImageBackground source={{ uri: video.thumbnail }} style={styles.image}>
    <ImageBackground
      source={require('../../../assets/shadow.png')}
      style={styles.shadow}
    >
      <Touchable onPress={() => onPress(video)}>
        <View>
          <Text style={styles.title}>{video.title}</Text>

          <View style={styles.meta}>
            <Text style={styles.date}>
              {moment(video.publishedAt).format('DD MMM YYYY')}
            </Text>
          </View>
        </View>
      </Touchable>
    </ImageBackground>
  </ImageBackground>
)

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    minHeight: 200,
  },
  shadow: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    minHeight: 200,
    width: Dimensions.get('window').width,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  title: {
    paddingTop: 104,
    color: '#fff',
    fontFamily: Theme.fonts.semiBold,
    fontSize: 18,
    maxWidth: '100%',
  },
  meta: {
    marginTop: 8,
    flexDirection: 'row',
  },
  date: {
    color: 'rgba(255,255,255,0.7)',
    fontFamily: Theme.fonts.regular,
    fontSize: 12,
  },
})

export default VideoPreview
