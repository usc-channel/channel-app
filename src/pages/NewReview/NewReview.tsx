import React from 'react'
import {
  findNodeHandle,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  NavigationEventSubscription,
  NavigationScreenProps,
} from 'react-navigation'
import { ButtonGroup, Icon, ListItem } from 'react-native-elements'
import StarRating from 'react-native-star-rating'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import validator from 'validator'

import { InputPicker, Loading, NavIcon, Picker } from '@components'
import { API, Theme } from '@config'
import {
  Course,
  CourseState,
  Dispatch,
  Lecturer,
  LecturerState,
  Store,
  User,
} from '@types'
import { semesters } from '@data'
import { setCourse, setLecturer } from '@actions'

interface ScreenParams {
  mode: 'all' | 'single'
  submit(): void
}

interface ConnectedProps {
  user: User
  course: CourseState
  lecturer: LecturerState
}

interface ConnectedDispatch {
  setCourse(course: CourseState): void
  setLecturer(lecturer: LecturerState): void
}

type Props = NavigationScreenProps<ScreenParams> &
  ConnectedProps &
  ConnectedDispatch

interface State {
  semester: number
  year: Year
  courseError: string | null
  rating: number
  ratingError: string | null
  review: string
  reviewError: string | null
  lecturerError: string | null
  loading: boolean
}

interface Year {
  value: string
  label: string
}

const YearPicker = Picker as new () => Picker<Year>
const Year = new Date().getFullYear()

const Years = Array.from(Array(5)).map((_, i) => ({
  value: (Year - i).toString(),
  label: (Year - i).toString(),
}))

class NewReview extends React.Component<Props, State> {
  static navigationOptions = ({
    navigation,
  }: NavigationScreenProps<ScreenParams>) => {
    const mode = navigation.getParam('mode')

    return {
      title: mode === 'all' ? 'New Lecturer Review' : '',
      ...(Platform.OS === 'ios'
        ? {
            headerLeft: (
              <NavIcon
                iconName="ios-arrow-down"
                onPress={() => {
                  navigation.goBack()
                }}
              />
            ),
          }
        : {}),
      headerRight:
        mode === 'all' ? (
          <NavIcon
            iconName={Platform.OS === 'ios' ? 'md-checkmark' : 'check'}
            onPress={() => navigation.getParam('submit')()}
          />
        ) : null,
    }
  }

  scrollView: KeyboardAwareScrollView | null
  navListener: NavigationEventSubscription

  constructor(props: Props) {
    super(props)

    this.state = {
      semester: 0,
      year: { label: Year.toString(), value: Year.toString() },
      courseError: null,
      lecturerError: null,
      rating: 0,
      ratingError: null,
      review: '',
      reviewError: null,
      loading: false,
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      submit: this.submit,
    })

    this.navListener = this.props.navigation.addListener(
      'didBlur',
      navState => {
        if (
          (this.props.navigation.getParam('mode') === 'single' &&
            typeof navState.state === 'undefined') ||
          (this.props.navigation.getParam('mode') === 'all' &&
            typeof navState.state === 'undefined')
        ) {
          this.unsetValues()
          this.navListener.remove()
        }
      }
    )
  }

  // * Clear Any Errors that were there before redux store update
  componentDidUpdate() {
    if (this.state.lecturerError && this.props.lecturer) {
      this.setState({ lecturerError: null })
    }

    if (this.state.courseError && this.props.course) {
      this.setState({ courseError: null })
    }
  }

  // * Clear Redux State after closing modal
  unsetValues = () => {
    this.props.setCourse(null)
    this.props.setLecturer(null)
  }

  submit = () => {
    Keyboard.dismiss()

    this.setState(
      {
        courseError: null,
        lecturerError: null,
        ratingError: null,
        reviewError: null,
      },
      () => {
        this.validate()
          .then(() => {
            this.setState({ loading: true }, this.addReview)
          })
          .catch(e => {
            this.setState(e)
          })
      }
    )
  }

  validate = () => {
    return new Promise((resolve, reject) => {
      const { course, lecturer } = this.props
      const { rating, review } = this.state

      const errors: Partial<State> = {}

      if (!course) {
        errors.courseError = 'Missing me!'
      }

      if (!lecturer) {
        errors.lecturerError = 'Missing me!'
      }

      if (rating === 0) {
        errors.ratingError = 'A rating would be nice'
      }

      if (!validator.isEmpty(review) && review.length < 15) {
        errors.reviewError = 'Optional Review must at least 15 characters'
      }

      if (Object.keys(errors).length > 0) {
        reject(errors)
      }

      resolve()
    })
  }

  addReview = async () => {
    const review = {
      semester: semesters[this.state.semester],
      year: this.state.year.value,
      course_id: this.props.course!.id,
      lecturer_id: this.props.lecturer!.id,
      rating: this.state.rating,
      user_id: this.props.user.id,
    } as any

    if (this.state.review.length > 0) {
      review.comment = this.state.review
    }

    // tslint:disable-next-line:no-console
    console.log(review)

    // * Make Request

    // this.props.navigation.goBack()
  }

  selectCourse = (course: Course) => {
    this.props.setCourse(course)
  }

  selectLecturer = (lecturer: Lecturer) => {
    this.props.setLecturer(lecturer)
  }

  getLecturers = (search: string) => {
    return new Promise(async resolve => {
      const request = await fetch(`${API}/lecturers?search=${search}`)
      const lecturers = await request.json()
      resolve(lecturers)
    })
  }

  getCourses = (search: string) => {
    return new Promise(async resolve => {
      const request = await fetch(`${API}/courses?search=${search}`)
      const courses = await request.json()
      resolve(courses)
    })
  }

  lookupCourse = () => {
    this.props.navigation.navigate('search', {
      placeholder: 'Search Course Code or Course Name',
      getResults: this.getCourses,
      newItem: {
        message: 'Add new course',
        subtitle: 'Enter information for a new course',
        action: () => this.props.navigation.navigate('newCourse'),
      },
      keyExtractor: (item: Course) => item.id.toString(),
      emptyMessage: `Couldn't find any Courses with the name or code`,
      renderItem: (item: Course, onSelect: () => void) => (
        <ListItem
          title={`${item.code} - ${item.name}`}
          onPress={() => {
            this.selectCourse(item)
            onSelect()
          }}
          titleStyle={{
            fontFamily: 'NunitoSans-Regular',
            color: 'rgba(0,0,0,0.87)',
          }}
        />
      ),
    })
  }

  lookupLectures = () => {
    this.props.navigation.navigate('search', {
      placeholder: 'Search Lecturers',
      getResults: this.getLecturers,
      newItem: {
        message: 'Add new lecturer',
        subtitle: 'Enter information for a new lecturer',
        action: () => this.props.navigation.navigate('newLecturer'),
      },
      keyExtractor: (item: Lecturer) => item.id.toString(),
      emptyMessage: `Couldn't find any Lecturers with the name`,
      renderItem: (item: Lecturer, onSelect: () => void) => (
        <ListItem
          title={item.name}
          onPress={() => {
            this.selectLecturer(item)
            onSelect()
          }}
          titleStyle={{
            fontFamily: 'NunitoSans-Regular',
            color: 'rgba(0,0,0,0.87)',
          }}
        />
      ),
    })
  }

  scrollToInput = (reactNode: number | null) => {
    this.scrollView!.scrollToFocusedInput(reactNode!)
  }

  render() {
    const mode = this.props.navigation.getParam('mode')
    const { lecturer, course } = this.props

    return (
      <KeyboardAwareScrollView
        ref={scrollView => (this.scrollView = scrollView)}
        bounces={false}
        enableOnAndroid
        extraScrollHeight={Platform.OS === 'android' ? 80 : 0}
        style={{ flex: 1, backgroundColor: Theme.background }}
      >
        {mode === 'single' && (
          <View style={styles.header}>
            <View>
              <Text style={styles.subtitle}>NEW LECTURER REVIEW</Text>
              <Text style={styles.name}>
                {lecturer ? lecturer.name : 'Select Lecturer'}
              </Text>
            </View>

            <Icon
              component={TouchableOpacity}
              name="check"
              color={Theme.accent}
              reverse
              size={24}
              raised
              iconStyle={{ fontSize: 20 }}
              containerStyle={{ marginRight: 0 }}
              onPress={this.addReview}
            />
          </View>
        )}

        <View style={{ flexDirection: 'row' }}>
          <YearPicker
            label="Year"
            message="What year did you do this course?"
            values={Years}
            value={this.state.year}
            displayKey="label"
            displayValue="value"
            onPress={year => this.setState({ year })}
            containerStyle={{
              backgroundColor: '#fff',
              height: '100%',
              width: 80,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: 'rgba(0,0,0,.12)',
            }}
            buttonStyle={{ justifyContent: 'center' }}
            showDropdown={false}
            valueStyle={{ fontFamily: 'NunitoSans-Regular' }}
          />

          <ButtonGroup
            containerStyle={{
              flex: 1,
              height: '100%',
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              marginBottom: 0,
              borderRadius: 0,
              borderTopWidth: 0,
              borderRightWidth: 0,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderLeftWidth: StyleSheet.hairlineWidth,
            }}
            innerBorderStyle={{ width: StyleSheet.hairlineWidth }}
            selectedButtonStyle={{ backgroundColor: Theme.accent }}
            buttons={semesters}
            selectedIndex={this.state.semester}
            onPress={semester => this.setState({ semester })}
            buttonStyle={{ borderRadius: 0 }}
            textStyle={{ fontFamily: 'NunitoSans-Regular', fontSize: 16 }}
          />
        </View>

        <InputPicker
          label="Course"
          placeholder="Select course"
          value={course ? `${course.code} - ${course.name}` : ''}
          error={this.state.courseError}
          onPress={this.lookupCourse}
        />

        {mode === 'all' && (
          <InputPicker
            label="Lecturer"
            placeholder="Select lecturer"
            value={lecturer ? lecturer.name : ''}
            error={this.state.lecturerError}
            onPress={this.lookupLectures}
          />
        )}

        <View style={styles.ratingBox}>
          <Text
            style={[
              styles.subheader,
              this.state.ratingError ? styles.error : {},
            ]}
          >
            {this.state.ratingError || 'Rating'}
          </Text>

          <StarRating
            rating={this.state.rating}
            fullStarColor={Theme.accent}
            containerStyle={{
              marginVertical: 8,
              justifyContent: 'center',
            }}
            starStyle={{ marginRight: 8 }}
            selectedStar={rating =>
              this.setState({ rating, ratingError: null })
            }
            starSize={36}
          />
        </View>

        <View style={styles.review}>
          <Text
            style={[
              styles.subheader,
              this.state.reviewError ? styles.error : {},
            ]}
          >
            {this.state.reviewError || 'Review ( Optional )'}
          </Text>

          <TextInput
            multiline
            placeholder="Be Honest..."
            style={styles.reviewText}
            value={this.state.review}
            onChangeText={review => {
              if (review.length > 15) {
                this.setState({ review, reviewError: null })
              } else {
                this.setState({ review })
              }
            }}
            placeholderTextColor="rgba(0,0,0,.26)"
            onFocus={event => {
              this.scrollToInput(findNodeHandle(event.target))
            }}
          />
        </View>

        <Loading visible={this.state.loading} />
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'NunitoSans-Light',
  },
  subtitle: {
    color: 'rgba(255,255,255,.7)',
    fontSize: 12,
    fontFamily: 'NunitoSans-ExtraBold',
  },
  subheader: {
    color: 'rgba(0,0,0,.54)',
    fontSize: 12,
    fontFamily: 'NunitoSans-SemiBold',
  },
  error: {
    color: Theme.error,
  },
  ratingBox: {
    padding: 16,
    backgroundColor: '#fff',
  },
  review: {
    padding: 16,
    minHeight: 200,
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,.12)',
  },
  reviewText: {
    fontSize: 16,
    flex: 1,
    textAlignVertical: 'top',
    fontFamily: 'NunitoSans-Regular',
    color: 'rgba(0,0,0,.87)',
  },
})

const mapStateToProps = (state: Store) => ({
  course: state.course,
  lecturer: state.lecturer,
  user: state.userState.user,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCourse: (course: Course) => dispatch(setCourse(course)),
  setLecturer: (lecturer: Lecturer) => dispatch(setLecturer(lecturer)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewReview)
