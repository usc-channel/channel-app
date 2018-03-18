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

interface State {
  top: Animated.Value
}

interface Props {
  search: string
}

const SpringValue = Platform.OS === 'ios' ? -50 : -70

class SearchEmpty extends React.Component<Props, State> {
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
    const { search } = this.props

    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            marginTop: -100,
            transform: [{ translateY: this.state.top }],
          }}
        >
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('../../../assets/tv-empty.png')}
          />

          <Text style={styles.text}>No results found for</Text>
          <Text style={styles.text}>"{search}"</Text>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  text: {
    color: 'rgba(0,0,0,0.87)',
    fontSize: 18,
    fontFamily: 'NunitoSans-SemiBold',
    textAlign: 'center',
  },
  image: {
    marginBottom: 16,
    width: 150,
    height: 120,
    position: 'relative',
  },
})

export default SearchEmpty
