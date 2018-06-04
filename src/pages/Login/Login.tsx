import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Image from 'react-native-fast-image'
import { Button } from 'react-native-elements'
import { TextField, TextFieldProps } from 'react-native-material-textfield'
import LinearGradient from 'react-native-linear-gradient'

import { Theme } from '@config'

type Props = NavigationScreenProps<{}>

interface State {
  email: string
  password: string
}

const LoginTextField: React.SFC<TextFieldProps> = props => (
  <TextField
    labelTextStyle={{ fontFamily: 'NunitoSans-SemiBold' }}
    fontSize={18}
    style={{ fontFamily: 'NunitoSans-Regular' }}
    labelFontSize={14}
    containerStyle={{ marginTop: 8 }}
    {...props}
  />
)

export default class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
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
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />

            <LoginTextField
              label="Password"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              secureTextEntry
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
                marginTop: 70,
                marginBottom: 20,
              }}
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
    flex: 1,
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
    flex: 1,
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
