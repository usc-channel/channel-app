import React, { Component } from 'react'
import {
  Animated,
  Image,
  ImageStyle,
  ImageURISource,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native'

interface Props {
  imageSource: ImageURISource
  style?: StyleProp<ImageStyle>
  thumbnailSource: ImageURISource
  placeHolderSource?: ImageURISource
  thumbnailBlurRadius?: number
  imageFadeDuration?: number
}

interface State {
  thumbnailOpacity: Animated.Value
  imageOpacity: Animated.Value
}

export default class ImagePulse extends Component<Props, State> {
  static defaultProps = {
    imageFadeDuration: 400,
    thumbnailBlurRadius: 5,
    onLoadThumbnail: () => null,
    onLoadImage: () => null,
  }
  constructor(props: Props) {
    super(props)
    this.state = {
      imageOpacity: new Animated.Value(0),
      thumbnailOpacity: new Animated.Value(0),
    }
  }

  onLoadThumbnail() {
    Animated.timing(this.state.thumbnailOpacity, {
      toValue: 1,
      duration: 200,
    }).start()
    this.cycleAnimation()
  }

  cycleAnimation() {
    Animated.sequence([
      Animated.timing(this.state.thumbnailOpacity, {
        toValue: 1,
        duration: 500,
      }),
      Animated.timing(this.state.thumbnailOpacity, {
        toValue: 0,
        duration: 500,
      }),
    ]).start(() => {
      this.cycleAnimation()
    })
  }

  onLoadImage() {
    Animated.timing(this.state.imageOpacity, {
      toValue: 1,
      duration: this.props.imageFadeDuration,
    }).start()
  }

  render() {
    return (
      <View style={this.props.style}>
        <Image
          resizeMode="cover"
          style={[styles.image, this.props.style]}
          source={this.props.placeHolderSource!}
        />
        <Animated.Image
          resizeMode="cover"
          style={[
            styles.image,
            { opacity: this.state.thumbnailOpacity },
            this.props.style,
          ]}
          source={this.props.thumbnailSource}
          onLoad={() => this.onLoadThumbnail()}
          blurRadius={this.props.thumbnailBlurRadius}
        />
        <Animated.Image
          resizeMode="cover"
          style={[
            styles.image,
            { opacity: this.state.imageOpacity },
            this.props.style,
          ]}
          source={this.props.imageSource}
          onLoad={() => this.onLoadImage()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
})
