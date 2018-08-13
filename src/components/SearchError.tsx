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

interface State {
  top: Animated.Value
}

interface Props {
  message: string
}

const SpringValue = Platform.OS === 'ios' ? -50 : -70

/**
 * Same as Error component but with Keyboard handled
 */
class SearchError extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      top: new Animated.Value(SpringValue),
    }
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
    const { message } = this.props

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Animated.View
            style={{
              marginTop: -100,
              transform: [{ translateY: this.state.top }],
              alignItems: 'center',
              maxWidth: '90%',
            }}
          >
            <Image
              resizeMode="contain"
              style={styles.image}
              source={require('../assets/tv-empty.png')}
            />

            <Text style={styles.text}>Oops!</Text>
            <Text style={styles.sub}>{message}</Text>
          </Animated.View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.background,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  text: {
    fontFamily: 'NunitoSans-Bold',
    color: Theme.primary,
    fontSize: 20,
  },
  image: {
    marginBottom: 16,
    width: 150,
    height: 120,
    position: 'relative',
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

export default SearchError
