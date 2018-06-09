import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Image from 'react-native-fast-image'
import { Button } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import validator from 'validator'

import { Theme } from '@config'
import { Touchable } from '@components'
import LoginTextField from './components/LoginTextField'

type Props = NavigationScreenProps<{}>

interface State {
  email: string
  emailError: string
  password: string
  passwordError: string
  loading: boolean
  error: string
}

export default class Login extends React.Component<Props, State> {
  password: LoginTextField | null
  email: LoginTextField | null

  constructor(props: Props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      loading: false,
      error: '',
    }
  }

  login = () => {
    this.password!.blur()
    this.email!.blur()
    this.setState({ emailError: '', passwordError: '' })

    this.validate()
      .then(a => {
        //
      })
      .catch(e => {
        this.setState(e)
      })
  }

  validate = () => {
    return new Promise((resolve, reject) => {
      const { email, password } = this.state

      if (validator.isEmpty(email) && validator.isEmpty(password)) {
        reject({
          emailError: 'Enter your email',
          passwordError: 'Enter your password',
        })
      }

      if (validator.isEmpty(email)) {
        reject({ emailError: 'Enter your email' })
      }

      if (!validator.isEmail(email)) {
        reject({ emailError: 'Enter a valid email' })
      }

      if (validator.isEmpty(password)) {
        reject({ passwordError: 'Enter your password' })
      }

      resolve()
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}

        <KeyboardAwareScrollView
          contentContainerStyle={styles.content}
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.brandContainer}>
            <Image
              style={styles.brandImage}
              source={require('../../assets/logo.png')}
            />

            <Text style={styles.brandText}>Welcome to The Channel</Text>
            <Text style={styles.infoText}>
              With an account you can write reviews
            </Text>
          </View>

          <View style={styles.submitContainer}>
            <LoginTextField
              label="Email"
              ref={ref => (this.email = ref)}
              keyboardType="email-address"
              autoCapitalize="none"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              error={this.state.emailError}
              returnKeyType="next"
              onSubmitEditing={() => this.password!.focus()}
            />

            <LoginTextField
              label="Password"
              ref={ref => (this.password = ref)}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              error={this.state.passwordError}
              password
              returnKeyType="go"
              onSubmitEditing={this.login}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Button
                title="Forgot Password?"
                clear
                titleStyle={{
                  color: 'rgba(0,0,0,.87)',
                  fontSize: 16,
                  fontFamily: 'NunitoSans-SemiBold',
                  padding: 0,
                }}
              />
            </View>

            <Text style={styles.error}>{this.state.error}</Text>

            <Button
              title="Sign In"
              titleStyle={[styles.titleStyle, styles.signin]}
              buttonStyle={{
                height: 54,
              }}
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: ['#4E9CD0', Theme.primary],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}
              containerStyle={{
                marginBottom: 20,
              }}
              onPress={this.login}
            />
          </View>

          <View style={styles.signupContainer}>
            <Touchable>
              <View
                style={{
                  width: Dimensions.get('window').width,
                  height: 53,
                  justifyContent: 'center',
                }}
              >
                <Text style={styles.signup}>
                  Don't have an account?{' '}
                  <Text style={{ fontFamily: 'NunitoSans-Bold' }}>Sign Up</Text>
                </Text>
              </View>
            </Touchable>
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  brandContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  brandImage: {
    width: 60,
    height: 60,
  },
  brandText: {
    color: Theme.accent,
    fontFamily: 'NunitoSans-Bold',
    fontSize: 24,
    marginTop: 16,
    textAlign: 'center',
  },
  infoText: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 16,
    marginTop: 4,
    textAlign: 'center',
    color: 'rgba(0,0,0,.54)',
  },
  submitContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 24,
    paddingHorizontal: 15,
  },
  titleStyle: {
    fontFamily: 'NunitoSans-Bold',
  },
  signin: {
    fontSize: 16,
  },
  signupContainer: {
    minHeight: 53,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,.12)',
  },
  signup: {
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(0,0,0,.87)',
    fontFamily: 'NunitoSans-Regular',
  },
  error: {
    color: Theme.error,
    textAlign: 'center',
    marginVertical: 15,
    fontSize: 16,
    fontFamily: 'NunitoSans-SemiBold',
  },
})
