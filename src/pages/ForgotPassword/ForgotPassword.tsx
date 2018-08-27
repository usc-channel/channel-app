import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import {
  LayoutAnimation,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import validator from 'validator'
import firebase from 'react-native-firebase'

import { Theme } from '@config'
import { Loading, TextField } from '@components'

type Props = NavigationScreenProps<{}>

interface State {
  email: string
  emailError: string
  loading: boolean
  message: {
    text: string
    error: boolean
  }
}

export default class ForgotPassword extends React.Component<Props, State> {
  email: TextField | null

  constructor(props: Props) {
    super(props)

    this.state = {
      email: '',
      emailError: '',
      loading: false,
      message: {
        text: '',
        error: false,
      },
    }
  }

  recoverPassword = () => {
    this.email!.blur()
    LayoutAnimation.easeInEaseOut()

    this.setState({ message: { text: '', error: false }, emailError: '' })

    this.validate()
      .then(() => {
        this.setState({ loading: true }, this.sendPasswordForgot)
      })
      .catch(e => {
        this.setState(e)
      })
  }

  sendPasswordForgot = async () => {
    try {
      const { email } = this.state

      await firebase.auth().sendPasswordResetEmail(email)

      this.setState({ loading: false }, () =>
        setTimeout(() => {
          LayoutAnimation.easeInEaseOut()

          this.setState({
            message: {
              text: 'Password reset email sent.',
              error: false,
            },
          })

          setTimeout(() => {
            StatusBar.setBarStyle('light-content', true)
            this.props.navigation.dismiss()
          }, 3000)
        }, Theme.loadingTimeout)
      )
    } catch (e) {
      let text = `Couldn't sign in right now, try again later.`

      switch (e.code) {
        case 'auth/user-not-found':
          text = 'Email not found. Maybe you want to Sign Up instead?'
          break
      }

      this.setState({ loading: false }, () =>
        setTimeout(() => {
          LayoutAnimation.easeInEaseOut()
          this.setState({
            message: {
              text,
              error: true,
            },
          })
        }, Theme.loadingTimeout)
      )
    }
  }

  validate = () => {
    return new Promise((resolve, reject) => {
      const { email } = this.state

      if (validator.isEmpty(email)) {
        reject({
          emailError: 'Enter your email',
        })
      }

      resolve()
    })
  }

  render() {
    const { loading, message } = this.state
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && (
          <StatusBar barStyle="dark-content" animated />
        )}

        <Loading visible={loading} />

        <KeyboardAwareScrollView
          contentContainerStyle={styles.content}
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>
              Forgot <Text style={{ color: Theme.primary }}>Password</Text>
            </Text>

            <Text style={styles.infoText}>
              Enter your email address below and we’ll send instructions to
              reset your password.
            </Text>
          </View>

          <View style={styles.submitContainer}>
            <TextField
              label="Email"
              ref={ref => (this.email = ref)}
              keyboardType="email-address"
              autoCapitalize="none"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              error={this.state.emailError}
              returnKeyType="next"
              onSubmitEditing={this.recoverPassword}
            />

            <Text
              style={[
                styles.message,
                message.error ? styles.error : styles.success,
                !!this.state.message.text && {
                  marginVertical: 15,
                },
              ]}
            >
              {message.text}
            </Text>

            <Button
              title="Recover My Password"
              titleStyle={[styles.titleStyle, styles.main]}
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
              onPress={this.recoverPassword}
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
  },
  content: {
    flex: 1,
  },
  infoContainer: {
    marginBottom: 30,
    paddingHorizontal: 15,
  },
  infoTitle: {
    fontFamily: Theme.fonts.semiBold,
    color: 'rgba(0,0,0,0.87)',
    fontSize: 24,
    marginBottom: 15,
  },
  infoText: {
    fontFamily: Theme.fonts.regular,
    color: 'rgba(0,0,0,0.87)',
    fontSize: 16,
  },
  submitContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 24,
    paddingHorizontal: 15,
  },
  titleStyle: {
    fontFamily: Theme.fonts.bold,
  },
  main: {
    fontSize: 16,
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Theme.fonts.semiBold,
  },
  error: {
    color: Theme.error,
  },
  success: {
    color: Theme.success,
  },
})
