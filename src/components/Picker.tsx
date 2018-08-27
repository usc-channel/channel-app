import React from 'react'
import {
  FlatList,
  Keyboard,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { Icon, ListItem } from 'react-native-elements'
import Modal from 'react-native-modal'

import { Theme } from '@config'
import Touchable from './Touchable'

interface Props<T> {
  label: string
  message: string
  values: T[]
  value: T | null
  displayKey: keyof T
  displayValue: keyof T
  error?: string
  containerStyle?: StyleProp<ViewStyle>
  buttonStyle?: StyleProp<ViewStyle>
  valueStyle?: StyleProp<TextStyle>
  showDropdown?: boolean
  onPress(item: T): void
}

interface State {
  isVisible: boolean
}

class Picker<T> extends React.Component<Props<T>, State> {
  state = {
    isVisible: false,
  }

  togglePicker = () => {
    Keyboard.dismiss()
    this.setState(({ isVisible }) => ({ isVisible: !isVisible }))
  }

  makeSelection = (item: T) => {
    this.props.onPress(item)
    this.togglePicker()
  }

  render() {
    const {
      label,
      message,
      value,
      values,
      error,
      displayKey,
      displayValue,
      containerStyle,
      buttonStyle,
      showDropdown = true,
      valueStyle,
    } = this.props
    const { isVisible } = this.state

    const hasValue = !!value

    return (
      <>
        <View style={[styles.container, containerStyle]}>
          <Touchable
            style={[{ flex: 1 }, buttonStyle]}
            onPress={this.togglePicker}
          >
            <View style={{ height: 54 }}>
              <Text
                style={[
                  styles.titleStyle,
                  !!error && { color: Theme.error },
                  {
                    transform: [{ translateY: hasValue ? 8 : 16 }],
                    fontSize: hasValue ? 12 : 16,
                  },
                ]}
              >
                {error || label}
              </Text>

              {showDropdown && (
                <Icon
                  containerStyle={{ position: 'absolute', right: 15, top: 16 }}
                  type="ionicon"
                  name="md-arrow-dropdown"
                />
              )}

              {value && (
                <Text
                  style={[
                    styles.valueStyle,
                    valueStyle,
                    showDropdown && { paddingRight: 36 },
                  ]}
                >
                  {value[displayValue]}
                </Text>
              )}
            </View>
          </Touchable>
        </View>

        <Modal
          isVisible={isVisible}
          onBackButtonPress={this.togglePicker}
          onBackdropPress={this.togglePicker}
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}
        >
          <View style={{ backgroundColor: '#fff' }}>
            <Text style={styles.message}>{message}</Text>

            <FlatList
              data={values}
              keyExtractor={a => String(a[displayKey])}
              renderItem={({ item }) => {
                const isSelected =
                  value && item[displayKey] === value[displayKey]
                return (
                  <ListItem
                    title={String(item[displayValue])}
                    titleStyle={[
                      styles.itemStyle,
                      isSelected && styles.itemStyleSelectedText,
                    ]}
                    containerStyle={[isSelected && styles.itemStyleSelected]}
                    onPress={() => this.makeSelection(item)}
                  />
                )
              }}
            />

            <ListItem
              title="Cancel"
              titleStyle={styles.itemStyle}
              onPress={this.togglePicker}
              topDivider
              leftIcon={{ name: 'close', color: Theme.primary }}
            />
          </View>
        </Modal>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 54,
    backgroundColor: 'rgba(0,0,0,.05)',
    borderRadius: 4,
    marginBottom: 15,
  },
  message: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    fontSize: 15,
    fontFamily: Theme.fonts.semiBold,
    color: Theme.primary,
  },
  titleStyle: {
    fontFamily: Theme.fonts.semiBold,
    marginLeft: 15,
    color: 'rgba(0,0,0,.54)',
    position: 'absolute',
    fontSize: 16,
  },
  valueStyle: {
    fontSize: 16,
    color: 'rgba(0,0,0,.87)',
    marginTop: 24,
    fontFamily: Theme.fonts.semiBold,
    marginLeft: 15,
  },
  itemStyle: {
    fontFamily:
      Platform.OS === 'ios' ? Theme.fonts.regular : Theme.fonts.semiBold,
    color: 'rgba(0,0,0,.87)',
    fontSize: 16,
  },
  itemStyleSelected: {
    backgroundColor: Theme.accent,
  },
  itemStyleSelectedText: {
    color: '#fff',
  },
})

export default Picker
