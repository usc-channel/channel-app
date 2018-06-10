import React from 'react'
import {
  Animated,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native'
import { Icon } from 'react-native-elements'
import { Touchable } from '@components'
import { Theme } from '@config'

interface Props extends TextInputProps {
  label: string
  password?: boolean
  error?: string
}

interface State {
  showPassword: boolean
  toggleVisibility: Animated.Value
  labelFontSize: Animated.Value
  labelTransform: Animated.Value
}

const labelFontSizes = {
  inactive: 16,
  active: 12,
}

const labelTransforms = {
  inactive: 16,
  active: 8,
}

const AnimationSpeed = 300

export default class LoginTextField extends React.Component<Props, State> {
  state = {
    showPassword: false,
    toggleVisibility: new Animated.Value(0),
    labelFontSize: new Animated.Value(labelFontSizes.inactive),
    labelTransform: new Animated.Value(labelTransforms.inactive),
  }

  input: TextInput | null

  componentDidUpdate(prevProps: Props) {
    if (
      this.props.password &&
      prevProps.value === '' &&
      this.props.value !== ''
    ) {
      Animated.timing(this.state.toggleVisibility, {
        duration: 100,
        toValue: 1,
      }).start()
    }

    if (
      this.props.password &&
      prevProps.value !== '' &&
      this.props.value === ''
    ) {
      Animated.timing(this.state.toggleVisibility, {
        duration: 100,
        toValue: 0,
      }).start()
    }
  }

  blur() {
    this.input!.blur()
  }

  focus() {
    this.input!.focus()
  }

  onFocus = () => {
    Animated.parallel([
      Animated.timing(this.state.labelFontSize, {
        toValue: labelFontSizes.active,
        duration: AnimationSpeed,
      }),
      Animated.timing(this.state.labelTransform, {
        toValue: labelTransforms.active,
        duration: AnimationSpeed,
      }),
    ]).start()
  }

  onBlur = () => {
    if (this.props.value === '') {
      Animated.parallel([
        Animated.timing(this.state.labelFontSize, {
          toValue: labelFontSizes.inactive,
          duration: AnimationSpeed - 100,
        }),
        Animated.timing(this.state.labelTransform, {
          toValue: labelTransforms.inactive,
          duration: AnimationSpeed - 100,
        }),
      ]).start()
    }
  }

  render() {
    let { label } = this.props
    const { error, password, ...rest } = this.props

    if (error) {
      label = error
    }

    return (
      <View style={styles.container}>
        <Animated.Text
          style={[
            styles.labelStyle,
            error && styles.labelErrorStyle,
            {
              fontSize: this.state.labelFontSize,
              transform: [{ translateY: this.state.labelTransform }],
            },
          ]}
        >
          {label}
        </Animated.Text>

        <TextInput
          ref={ref => (this.input = ref)}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          style={[styles.inputStyle, password && styles.inputStylePassword]}
          secureTextEntry={this.props.password && !this.state.showPassword}
          underlineColorAndroid="transparent"
          {...rest}
        />

        {password && (
          <Animated.View
            style={{
              height: 54,
              position: 'absolute',
              right: 0,
              top: 0,
              opacity: this.state.toggleVisibility,
            }}
          >
            <Touchable
              onPress={() =>
                this.setState(({ showPassword }) => ({
                  showPassword: !showPassword,
                }))
              }
            >
              <View
                style={{
                  height: 54,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <Icon
                  name="md-eye"
                  type="ionicon"
                  color={
                    this.state.showPassword
                      ? 'rgba(0,0,0,.87)'
                      : 'rgba(0,0,0,0.38)'
                  }
                  iconStyle={{
                    paddingHorizontal: 10,
                    marginTop: 20,
                  }}
                />
              </View>
            </Touchable>
          </Animated.View>
        )}
      </View>
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
  labelStyle: {
    fontFamily: 'NunitoSans-SemiBold',
    marginLeft: 15,
    color: 'rgba(0,0,0,.54)',
    position: 'absolute',
  },
  labelErrorStyle: {
    color: Theme.error,
  },
  inputStyle: {
    height: 54,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'NunitoSans-SemiBold',
    paddingTop: 24,
    paddingBottom: 8,
  },
  inputStylePassword: {
    paddingRight: 40,
  },
})
