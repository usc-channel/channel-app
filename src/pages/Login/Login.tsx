import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Image from 'react-native-fast-image'
import { Button } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import validator from 'validator'

import { Theme } from '@config'
import LoginTextField from './components/LoginTextField'

type Props = NavigationScreenProps<{}>

interface State {
  email: string
  emailError: string
  password: string
  passwordError: string
  loading: boolean
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
              secureTextEntry
              returnKeyType="go"
              onSubmitEditing={this.login}
            />

            <Button
              title="SIGN IN"
              titleStyle={[styles.titleStyle, styles.signin]}
              buttonStyle={{
                borderRadius: 30,
                paddingVertical: 7,
              }}
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: [Theme.accent, Theme.primary],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}
              containerStyle={{
                marginTop: Platform.OS === 'ios' ? 70 : 30,
                marginBottom: 20,
              }}
              onPress={this.login}
            />

            <Button
              clear
              title="SIGN UP FOR AN ACCOUNT"
              titleStyle={[styles.titleStyle, styles.signup]}
            />
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
    paddingHorizontal: '10%',
  },
  content: {
    flex: 1,
  },
  brandContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.8,
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
    marginTop: 8,
    textAlign: 'center',
    color: '#AFAFAF',
  },
  submitContainer: {
    flex: 1.2,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: 24,
  },
  titleStyle: {
    fontFamily: 'NunitoSans-Bold',
  },
  signin: {
    fontSize: 16,
  },
  signup: {
    fontSize: 12,
    color: '#AFAFAF',
  },
})
