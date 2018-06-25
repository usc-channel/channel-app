// Modified from https://github.com/ananddayalan/react-native-material-design-searchbar

import React from 'react'
import {
  Keyboard,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProperties,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

interface Props extends TextInputProperties {
  height: number
  autoCorrect?: boolean
  padding?: number
  inputStyle?: StyleProp<TextStyle>
  iconCloseComponent?: React.ReactElement<{}>
  iconSearchComponent?: React.ReactElement<{}>
  iconBackComponent?: React.ReactElement<{}>
  iconCloseName?: string
  iconSearchName?: string
  iconBackName?: string
  placeholderColor?: string
  iconColor?: string
  iconSize?: number
  textStyle?: StyleProp<TextStyle>
  inputProps?: TextInputProperties
  alwaysShowBackButton?: boolean
  iconPadding?: number
  onBackPress?(): void
  onClose?(): void
  onClear?(): void
  onSearchChange(text: string): void
}

interface State {
  isOnFocus: boolean
  wait: boolean
}

export default class SearchBar extends React.Component<Props, State> {
  static defaultProps = {
    onSearchChange: () => null,
    onEndEditing: () => null,
    onSubmitEditing: () => null,
    onClose: () => null,
    onClear: () => null,
    inputStyle: {},
    iconCloseName: 'md-close',
    iconSearchName: 'md-search',
    iconBackName: 'md-arrow-back',
    placeholder: 'Search...',
    returnKeyType: 'search',
    padding: 5,
    placeholderColor: '#bdbdbd',
    iconColor: '#737373',
    textStyle: {},
    alwaysShowBackButton: false,
  }

  state = {
    isOnFocus: false,
    wait: true,
  }

  onClear = () => {
    this.props.onSearchChange('')
    this.props.onClear!()
  }

  onFocus = () => {
    this.setState({ isOnFocus: true })
    if (this.props.onFocus) {
      this.props.onFocus()
    }
  }

  onBlur = () => {
    this.setState({ isOnFocus: false })
    if (this.props.onBlur) {
      this.props.onBlur()
    }
    Keyboard.dismiss()
  }

  backPressed = () => {
    Keyboard.dismiss()
    if (this.props.onBackPress) {
      this.props.onBackPress()
    }
  }

  render() {
    const {
      height,
      autoCorrect,
      returnKeyType,
      onSearchChange,
      placeholder,
      padding,
      inputStyle,
      iconColor,
      iconCloseComponent,
      iconSearchComponent,
      iconBackComponent,
      iconBackName,
      iconSearchName,
      iconCloseName,
      placeholderColor,
      textStyle,
    } = this.props

    let { iconSize, iconPadding } = this.props

    iconSize = typeof iconSize !== 'undefined' ? iconSize : height * 0.5
    iconPadding =
      typeof iconPadding !== 'undefined' ? iconPadding : height * 0.25

    return (
      <View style={{ padding }}>
        <View
          style={[
            styles.searchBar,
            {
              height,
              paddingLeft: iconPadding,
            },
            inputStyle,
          ]}
        >
          {this.state.isOnFocus || this.props.alwaysShowBackButton ? (
            <TouchableOpacity onPress={this.backPressed}>
              {iconBackComponent ? (
                iconBackComponent
              ) : (
                <Icon
                  name={iconBackName!}
                  size={height * 0.5}
                  color={iconColor}
                />
              )}
            </TouchableOpacity>
          ) : iconSearchComponent ? (
            iconSearchComponent
          ) : (
            <Icon
              name={iconSearchName!}
              size={height * 0.5}
              color={iconColor}
            />
          )}
          <TextInput
            autoCorrect={autoCorrect === true}
            returnKeyType={returnKeyType}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChangeText={onSearchChange}
            onEndEditing={this.props.onEndEditing}
            onSubmitEditing={this.props.onSubmitEditing}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            underlineColorAndroid="transparent"
            style={[
              styles.searchBarInput,
              {
                paddingLeft: iconPadding,
                fontSize: height * 0.4,
              },
              textStyle,
            ]}
            value={this.props.value}
            {...this.props.inputProps}
          />
          {this.state.isOnFocus && (
            <TouchableOpacity onPress={this.onClear}>
              {iconCloseComponent ? (
                iconCloseComponent
              ) : (
                <Icon
                  style={{ paddingRight: iconPadding }}
                  name={iconCloseName!}
                  size={iconSize}
                  color={iconColor}
                />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: '#b6b6b6',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  searchBarInput: {
    flex: 1,
    fontWeight: 'normal',
    color: '#212121',
    backgroundColor: 'transparent',
  },
})
