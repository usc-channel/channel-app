import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import {
  Dimensions,
  LayoutAnimation,
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
import firebase from 'react-native-firebase'

import { Theme } from '@config'
import { Loading, TextField, Touchable } from '@components'
import { Dispatch, User } from '@types'
import { signIn } from '@actions'
import { connect } from 'react-redux'

type OwnProps = NavigationScreenProps<{}>

interface ConnectedDispatch {
  signIn(user: User): void
}

type Props = OwnProps & ConnectedDispatch

interface State {
  email: string
  emailError: string
  password: string
  passwordError: string
  loading: boolean
  error: string
}

class SignIn extends React.Component<Props, State> {
  password: TextField | null
  email: TextField | null

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

  signIn = () => {
    this.password!.blur()
    this.email!.blur()
    LayoutAnimation.easeInEaseOut()
    this.setState({ error: '', emailError: '', passwordError: '' })

    this.validate()
      .then(() => {
        this.setState({ loading: true }, this.firebaseLogin)
      })
      .catch(e => {
        this.setState(e)
      })
  }

  firebaseLogin = async () => {
    try {
      const { email, password } = this.state

      const response = await firebase
        .auth()
        .signInAndRetrieveDataWithEmailAndPassword(email, password)

      this.setState({ loading: false })

      const user: User = {
        id: response.user.uid,
        name: response.user.displayName ? response.user.displayName : '',
        avatar: response.user.photoURL ? response.user.photoURL : '',
      }

      this.props.signIn(user)
      this.props.navigation.dismiss()
    } catch (e) {
      let error = `Couldn't sign in right now, try again later.`

      switch (e.code) {
        case 'auth/user-not-found':
          error = 'Email not found. Maybe you want to Sign Up instead?'
          break
        case 'auth/wrong-password':
          error = 'Incorrect password or email address entered.'
          break
      }

      this.setState({ loading: false }, () =>
        setTimeout(() => {
          LayoutAnimation.easeInEaseOut()
          this.setState({ error })
        }, 400)
      )
    }
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

  signUp = () => {
    this.props.navigation.push('signUp')
  }

  forgotPassword = () => {
    this.props.navigation.push('forgotPassword')
  }

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}

        <Loading visible={this.state.loading} />

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
              onSubmitEditing={() => this.password!.focus()}
            />

            <TextField
              label="Password"
              ref={ref => (this.password = ref)}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              error={this.state.passwordError}
              password
              returnKeyType="go"
              onSubmitEditing={this.signIn}
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
                buttonStyle={{ borderRadius: 0, padding: 8 }}
                containerStyle={{ marginTop: -8 }}
                onPress={this.forgotPassword}
              />
            </View>

            <Text
              style={[
                styles.error,
                !!this.state.error && {
                  marginVertical: 15,
                },
              ]}
            >
              {this.state.error}
            </Text>

            <Button
              title="Sign In"
              titleStyle={[styles.titleStyle, styles.signIn]}
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
              onPress={this.signIn}
            />
          </View>

          <View style={styles.signupContainer}>
            <Touchable onPress={this.signUp}>
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signIn: (user: User) => dispatch(signIn(user)),
})

export default connect<{}, ConnectedDispatch, OwnProps>(
  null,
  mapDispatchToProps
)(SignIn)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  brandContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  brandImage: {
    width: 60,
    height: 60,
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
  signIn: {
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
    fontSize: 16,
    fontFamily: 'NunitoSans-SemiBold',
  },
})
