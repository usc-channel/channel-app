import React from 'react'
import {
  Animated,
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Theme } from '@config'
import { ImageSource } from 'react-native-vector-icons/Icon'

interface Props {
  title: string
  message: string
  image: ImageSource
  keyboard?: boolean
}

interface State {
  top: Animated.Value
}

const SpringValue = Platform.OS === 'ios' ? -50 : -70

class Empty extends React.Component<Props, State> {
  state = {
    top: new Animated.Value(SpringValue),
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      Keyboard.addListener('keyboardWillShow', this.springUp)
      Keyboard.addListener('keyboardWillHide', this.springDown)
    } else {
      Keyboard.addListener('keyboardDidShow', this.springUp)
      Keyboard.addListener('keyboardDidHide', this.springDown)
    }
  }

  springUp = () => {
    Animated.spring(this.state.top, {
      toValue: SpringValue,
      useNativeDriver: true,
    }).start()
  }

  springDown = () => {
    Animated.spring(this.state.top, {
      toValue: 0,
      useNativeDriver: true,
    }).start()
  }

  render() {
    const { title, message, image, keyboard = false } = this.props
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            marginTop: keyboard ? -100 : 0,
            transform: [{ translateY: this.state.top }],
            alignItems: 'center',
            maxWidth: '90%',
          }}
        >
          <Image source={image} style={styles.image} resizeMode="contain" />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.sub}>{message}</Text>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 75,
    height: 73,
    marginBottom: 20,
    marginTop: -60,
  },
  title: {
    fontFamily: 'NunitoSans-Bold',
    color: Theme.primary,
    fontSize: 20,
  },
  sub: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 16,
    maxWidth: 300,
    marginTop: 5,
    lineHeight: 20,
    textAlign: 'center',
    color: 'rgba(0,0,0,.54)',
  },
})

export default Empty
