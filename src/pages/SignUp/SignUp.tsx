import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import {
  Dimensions,
  LayoutAnimation,
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
import { connect } from 'react-redux'
import axios from 'axios'

import { API, Theme } from '@config'
import { ImagePicker, Loading, TextField, Touchable } from '@components'
import { Dispatch, User } from '@types'
import { signIn } from '@actions'

interface ConnectedDispatch {
  login(user: User): void
}

type OwnProps = NavigationScreenProps<{}>

type Props = ConnectedDispatch & OwnProps

interface State {
  name: string
  nameError: string
  email: string
  emailError: string
  password: string
  passwordError: string
  avatar: {
    path: string
    stock: boolean
  }
  loading: boolean
  error: string
  showPicker: boolean
}

class SignUp extends React.Component<Props, State> {
  name: TextField | null
  password: TextField | null
  email: TextField | null

  constructor(props: Props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      avatar: {
        path:
          // tslint:disable-next-line:max-line-length
          'https://firebasestorage.googleapis.com/v0/b/channel-app-1515208712246.appspot.com/o/generic%2Fprofile_default.png?alt=media&token=520f3ceb-9163-4162-beb7-64d87341aafc',
        stock: true,
      },
      password: '',
      nameError: '',
      emailError: '',
      passwordError: '',
      loading: false,
      error: '',
      showPicker: false,
    }
  }

  signUp = () => {
    this.name!.blur()
    this.password!.blur()
    this.email!.blur()

    LayoutAnimation.easeInEaseOut()
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

  backToSignIn = () => {
    this.props.navigation.pop()
  }

  selectAvatar = () => {
    this.setState({ showPicker: true })
  }

  firebaseSignup = async () => {
    try {
      const { email, password } = this.state

      // Create user
      const response = await firebase
        .auth()
        .createUserAndRetrieveDataWithEmailAndPassword(email, password)

      // Upload image to firebase storage
      const photoURL = await this.uploadImage(response.user.uid)

      // Update user profile firebase with new information
      await response.user.updateProfile({
        displayName: this.state.name,
        photoURL,
      })

      // Sign In user (store user info locally)
      const user: User = {
        id: response.user.uid,
        name: this.state.name,
        avatar: photoURL,
      }

      await this.createUser(user)

      this.props.login(user)
      this.setState({ loading: false }, () => {
        StatusBar.setBarStyle('light-content', true)
        this.props.navigation.dismiss()
      })
    } catch (e) {
      let error = `Couldn't sign up right now, try again later.`

      switch (e.code) {
        case 'auth/email-already-in-use':
          error = 'Email already in use. Maybe you want to Sign In instead?'
          break
      }

      this.setState({ loading: false }, () =>
        setTimeout(() => {
          LayoutAnimation.easeInEaseOut()
          this.setState({ error })
        }, Theme.loadingTimeout)
      )
    }
  }

  createUser = (user: Partial<User>) => {
    return axios.post(`${API}/users`, user)
  }

  uploadImage = (id: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      const { avatar } = this.state

      if (avatar.stock) {
        resolve(avatar.path)
      } else {
        const fileExtension = avatar.path.substring(
          avatar.path.lastIndexOf('.'),
          avatar.path.length
        )

        try {
          const response = await firebase
            .storage()
            .ref(`avatars/${id}${fileExtension}`)
            .putFile(avatar.path)

          resolve(response.downloadURL)
        } catch (e) {
          reject(e)
        }
      }
    })
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
                    uri: this.state.avatar.path,
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
            <Touchable onPress={this.backToSignIn}>
              <View
                style={{
                  width: Dimensions.get('window').width,
                  height: 53,
                  justifyContent: 'center',
                }}
              >
                <Text style={styles.signup}>
                  Already have an account?{' '}
                  <Text style={{ fontFamily: Theme.fonts.bold }}>Sign In</Text>
                </Text>
              </View>
            </Touchable>
          </View>
        </KeyboardAwareScrollView>

        <ImagePicker
          title="Select avatar"
          isVisible={this.state.showPicker}
          onRequestClose={() => this.setState({ showPicker: false })}
          onSelectImage={path =>
            this.setState({ avatar: { stock: false, path } })
          }
        />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: (user: User) => dispatch(signIn(user)),
})

export default connect<null, ConnectedDispatch, OwnProps>(
  null,
  mapDispatchToProps
)(SignUp)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
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
    fontFamily: Theme.fonts.bold,
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
    fontFamily: Theme.fonts.regular,
  },
  error: {
    color: Theme.error,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Theme.fonts.semiBold,
  },
})
