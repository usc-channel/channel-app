import React from 'react'
import {
  View,
  TextInput,
  TextInputProperties,
  StyleSheet,
  LayoutAnimation,
  Dimensions,
  UIManager,
  Button,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Touchable } from '@components'

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

interface Props extends TextInputProperties {
  onCancel?(): void
}

interface State {
  focused: boolean
  width: number
}

export default class SearchBar extends React.Component<Props, State> {
  static defaultProps = {
    focused: false,
    placeholder: 'Search',
  }

  input: TextInput

  constructor(props: Props) {
    super(props)

    this.state = {
      focused: false,
      width: Dimensions.get('window').width,
    }

    this.input = TextInput
  }

  blur = () => {
    this.input.blur()
  }

  onBlur = () => {
    this.props.onBlur && this.props.onBlur()
    LayoutAnimation.easeInEaseOut()
    this.setState({ focused: false })
  }

  cancel = () => {
    this.blur()
    this.props.onCancel && this.props.onCancel()
  }

  clear = () => {
    this.props.onChangeText && this.props.onChangeText('')
  }

  onFocus = () => {
    this.props.onFocus && this.props.onFocus()
    LayoutAnimation.easeInEaseOut()
    this.setState({ focused: true })
  }

  render() {
    return (
      <View
        style={{ flexDirection: 'row' }}
        onLayout={e => this.setState({ width: e.nativeEvent.layout.width })}
      >
        <View
          style={[
            styles.container,
            this.state.focused
              ? { width: this.state.width - 82 }
              : { width: this.state.width - 15 },
          ]}
        >
          <Icon
            name="ios-search"
            size={18}
            style={{ marginHorizontal: 4 }}
            color="#85848A"
          />

          <TextInput
            {...this.props}
            ref={(input: any) => (this.input = input)}
            autoCorrect={false}
            returnKeyType="search"
            selectionColor="#000"
            placeholder={this.props.placeholder}
            style={styles.text}
            placeholderTextColor="#85848A"
            onBlur={this.onBlur}
            onFocus={this.onFocus}
          />

          {this.props.value!.length > 0 && (
            <Touchable style={{ marginHorizontal: 4 }} onPress={this.clear}>
              <Icon name="ios-close-circle" size={20} color="#B7B8BA" />
            </Touchable>
          )}
        </View>

        <Button title="Cancel" onPress={this.cancel} color="#000" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    padding: 4,
    marginRight: 7,
    backgroundColor: '#EFF0F2',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    height: 26,
    marginLeft: 5,
    flex: 1,
    fontFamily: 'NunitoSans-Regular',
  },
})
