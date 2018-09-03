import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import {
  Keyboard,
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
import { connect } from 'react-redux'

import { API, Theme } from '@config'
import { Loading, NavIcon, Picker, TextField } from '@components'
import { Dispatch, Lecturer, LecturerState, School } from '@types'
import { setLecturer } from '@actions'

interface ConnectedDispatch {
  setLecturer(lecturer: LecturerState): void
}

type Props = ConnectedDispatch & NavigationScreenProps<{}>

interface State {
  name: string
  nameError: string
  loading: boolean
  message: {
    text: string
    error: boolean
  }
  schools: School[]
  school: School | null
  schoolError: string
  disabled: boolean
}

class NewLecturer extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }: NavigationScreenProps<{}>) => ({
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 0,
      elevation: 0,
    },
    headerLeft: (
      <NavIcon
        iconName={Platform.OS === 'ios' ? 'ios-arrow-back' : 'arrow-back'}
        color={Theme.primary}
        onPress={() => {
          StatusBar.setBarStyle('light-content', true)
          Keyboard.dismiss()
          navigation.pop()
        }}
      />
    ),
  })

  name: TextField | null

  constructor(props: Props) {
    super(props)

    this.state = {
      name: '',
      nameError: '',
      loading: false,
      message: {
        text: '',
        error: false,
      },
      schools: [],
      school: null,
      schoolError: '',
      disabled: false,
    }

    this.getSchools()
  }

  getSchools = async () => {
    try {
      const schools = (await API.get(`/schools`)).data
      this.setState({ schools })
    } catch {
      this.setState({
        message: { text: `Couldn't get list of schools`, error: true },
      })
    }
  }

  submit = () => {
    this.name!.blur()
    LayoutAnimation.easeInEaseOut()

    this.setState({
      message: { text: '', error: false },
      nameError: '',
      schoolError: '',
    })

    this.validate()
      .then(() => {
        this.setState({ loading: true, disabled: true }, this.addLecturer)
      })
      .catch(e => {
        this.setState(e)
      })
  }

  validate = () => {
    return new Promise((resolve, reject) => {
      const { name, school } = this.state

      if (validator.isEmpty(name) && !school) {
        reject({
          nameError: 'Enter lecturer name',
          schoolError: 'Select school',
        })
      }

      if (validator.isEmpty(name)) {
        reject({
          nameError: 'Enter lecturer name',
        })
      }

      if (!school) {
        reject({
          schoolError: 'Select school',
        })
      }

      resolve()
    })
  }

  addLecturer = async () => {
    try {
      const { name, school } = this.state

      const { data } = await API.post(`/lecturers`, {
        name,
        school_id: school!.id,
      })

      this.props.setLecturer(data)

      this.setState({ loading: false }, () =>
        setTimeout(() => {
          LayoutAnimation.easeInEaseOut()

          this.setState({
            message: {
              text: 'Lecturer Added',
              error: false,
            },
          })

          setTimeout(() => {
            StatusBar.setBarStyle('light-content')
            this.props.navigation.pop(2)
          }, 3000)
        }, Theme.loadingTimeout)
      )
    } catch (e) {
      const text = `Couldn't create lecturer right now, try again later.`

      this.setState({ loading: false, disabled: false }, () =>
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
              New <Text style={{ color: Theme.primary }}>Lecturer</Text>
            </Text>

            <Text style={styles.infoText}>
              Enter the information below as clearly as possible.
            </Text>
          </View>

          <View style={styles.submitContainer}>
            <TextField
              label="Lecturer Name"
              ref={ref => (this.name = ref)}
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
              error={this.state.nameError}
              returnKeyType="done"
              onSubmitEditing={this.submit}
            />

            <Picker<School>
              label="School"
              message="Select the lecturer's school"
              value={this.state.school}
              values={this.state.schools}
              displayKey="id"
              displayValue="name"
              onPress={school => this.setState({ school })}
              error={this.state.schoolError}
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
              title="Add Lecturer"
              disabled={this.state.disabled}
              titleStyle={[styles.titleStyle, styles.main]}
              buttonStyle={{
                height: 54,
              }}
              ViewComponent={this.state.disabled ? View : LinearGradient}
              containerStyle={{
                marginBottom: 20,
              }}
              onPress={this.submit}
              {...(this.state.disabled
                ? {}
                : {
                    linearGradientProps: {
                      colors: ['#4E9CD0', Theme.primary],
                      start: { x: 0, y: 0.5 },
                      end: { x: 1, y: 0.5 },
                    },
                  })}
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setLecturer: (lecturer: Lecturer) => dispatch(setLecturer(lecturer)),
})

export default connect(
  null,
  mapDispatchToProps
)(NewLecturer)
