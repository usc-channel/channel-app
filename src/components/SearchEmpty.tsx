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
import { ListItem } from 'react-native-elements'

interface State {
  top: Animated.Value
}

interface Props {
  search: string
  message?: string
  newItem?: {
    message: string
    subtitle: string
    action(): void
  }
}

const SpringValue = Platform.OS === 'ios' ? -50 : -70

class SearchEmpty extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    message: 'No results found for',
  }

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
    const { search, message, newItem } = this.props

    return (
      <View style={[{ flex: 1 }, newItem ? { zIndex: 3 } : {}]}>
        {newItem && (
          <ListItem
            title={newItem.message}
            subtitle={newItem.subtitle}
            leftIcon={{
              name: 'md-add-circle',
              color: '#fff',
              type: 'ionicon',
            }}
            containerStyle={{
              backgroundColor: Theme.accent,
              paddingVertical: 10,
            }}
            titleStyle={{
              fontFamily: 'NunitoSans-SemiBold',
              color: '#fff',
              fontSize: 16,
            }}
            subtitleStyle={{
              fontFamily: 'NunitoSans-Regular',
              fontSize: 13,
              marginTop: -2,
              color: 'rgba(255,255,255,0.9)',
            }}
            onPress={() => {
              Keyboard.dismiss()
              newItem.action()
            }}
          />
        )}

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

            <Text style={styles.text}>{message}</Text>
            <Text style={[styles.text, styles.search]}>"{search}"</Text>
          </Animated.View>
        </View>
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
  search: {
    marginTop: 8,
    color: Theme.accent,
  },
})

export default SearchEmpty
