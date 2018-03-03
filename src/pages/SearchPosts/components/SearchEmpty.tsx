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

class SearchEmpty extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      top: new Animated.Value(Platform.OS === 'ios' ? -50 : 0),
    }
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      Keyboard.addListener('keyboardWillShow', () => {
        Animated.spring(this.state.top, {
          toValue: -50,
        }).start()
      })

      Keyboard.addListener('keyboardWillHide', () => {
        Animated.spring(this.state.top, {
          toValue: 0,
        }).start()
      })
    }
  }

  render() {
    const { search } = this.props

    return (
      <View style={styles.container}>
        <Animated.View style={{ top: this.state.top }}>
          <Image
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
    marginTop: Platform.OS === 'ios' ? -100 : -30,
  },
})

export default SearchEmpty
