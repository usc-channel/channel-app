import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Avatar, Button, Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import validator from 'validator'
import firebase from 'react-native-firebase'
import ImagePicker, { Image } from 'react-native-image-crop-picker'

import { Theme } from '@config'
import { Loading, TextField, Touchable } from '@components'

type Props = NavigationScreenProps<{}>

interface State {
  name: string
  nameError: string
  email: string
  emailError: string
  password: string
  passwordError: string
  avatar: string
  loading: boolean
  error: string
}

export default class SingUp extends React.Component<Props, State> {
  name: TextField | null
  password: TextField | null
  email: TextField | null

  constructor(props: Props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      avatar:
        // tslint:disable-next-line:max-line-length
        'https://firebasestorage.googleapis.com/v0/b/channel-app-1515208712246.appspot.com/o/generic%2Fprofile_default.png?alt=media&token=520f3ceb-9163-4162-beb7-64d87341aafc',
      password: '',
      nameError: '',
      emailError: '',
      passwordError: '',
      loading: false,
      error: '',
    }
  }

  signUp = () => {
    this.name!.blur()
    this.password!.blur()
    this.email!.blur()

    this.setState({
      error: '',
      nameError: '',
      emailError: '',
      passwordError: '',
    })

    this.validate()
      .then(() => {
        this.setState({ loading: true }, this.firebaseSignup)
      })
      .catch(e => {
        this.setState(e)
      })
  }

  firebaseSignup = async () => {
    try {
      const { email, password } = this.state

      const response = await firebase
        .auth()
        .createUserAndRetrieveDataWithEmailAndPassword(email, password)

      // TODO Upload image to firebase
      // TODO Create User Object
      // TODO Update firebase with information
      // TODO Sign In user

      // const user: User = {
      //   id: response.user.uid,
      //   name: this.state.name,
      // }

      await response.user.updateProfile({
        displayName: this.state.name,
      })

      this.setState({ loading: false })

      // tslint:disable-next-line:no-console
      console.log(response)
    } catch (e) {
      let error = `Couldn't sign in right now, try again later.`

      switch (e.code) {
        case 'auth/email-already-in-use':
          error = 'Email already in use. Maybe you want to Sign In instead?'
          break
      }

      this.setState({ loading: false }, () =>
        setTimeout(() => {
          this.setState({ error })
        }, 400)
      )
    }
  }

  validate = () => {
    return new Promise((resolve, reject) => {
      const { name, email, password } = this.state

      if (
        validator.isEmpty(name) &&
        validator.isEmpty(email) &&
        validator.isEmpty(password)
      ) {
        reject({
          nameError: 'Enter your name',
          emailError: 'Enter your email',
          passwordError: 'Enter your password',
        })
      }

      if (validator.isEmpty(name)) {
        reject({ nameError: 'Enter your name' })
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

  signIn = () => {
    this.props.navigation.pop()
  }

  selectAvatar = async () => {
    try {
      const image = (await ImagePicker.openPicker({
        width: 150,
        height: 150,
        cropping: true,
      })) as Image

      this.setState({ avatar: image.path })
    } catch (e) {
      // Do nothing
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}

        <Loading visible={this.state.loading} />

        <KeyboardAwareScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.submitContainer}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 30,
              }}
            >
              <View>
                <Avatar
                  size="xlarge"
                  rounded
                  source={{
                    uri: this.state.avatar,
                  }}
                  onPress={this.selectAvatar}
                />

                <Icon
                  name="edit"
                  color="#fff"
                  containerStyle={styles.icon}
                  onPress={this.selectAvatar}
                  component={TouchableOpacity}
                />
              </View>
            </View>

            <TextField
              label="Name"
              ref={ref => (this.name = ref)}
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
              error={this.state.nameError}
              returnKeyType="next"
              onSubmitEditing={() => this.email!.focus()}
            />

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
              onSubmitEditing={this.signUp}
            />

            <Text style={styles.error}>{this.state.error}</Text>

            <Button
              title="Sign Up"
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
              onPress={this.signUp}
            />
          </View>

          <View style={styles.signupContainer}>
            <Touchable onPress={this.signIn}>
              <View
                style={{
                  width: Dimensions.get('window').width,
                  height: 53,
                  justifyContent: 'center',
                }}
              >
                <Text style={styles.signup}>
                  Already have an account?{' '}
                  <Text style={{ fontFamily: 'NunitoSans-Bold' }}>Sign In</Text>
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
    // flex: 1,
    flexGrow: 1,
    flexShrink: 0,
  },
  brandContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  icon: {
    backgroundColor: Theme.accent,
    position: 'absolute',
    borderRadius: 50,
    padding: 5,
    right: 0,
    bottom: 0,
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
