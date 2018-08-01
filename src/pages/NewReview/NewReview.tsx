import React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { ButtonGroup, Icon, ListItem } from 'react-native-elements'
import StarRating from 'react-native-star-rating'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'

import { Input, InputPicker, NavIcon } from '@components'
import { API, Theme } from '@config'
import { Course, CourseState, Lecturer, LecturerState, Store } from '@types'

interface ScreenParams {
  lecturer: Lecturer
  mode: 'all' | 'single'
  addReview(): void
}

interface ConnectedProps {
  course: CourseState
  lecturer: LecturerState
}

type Props = NavigationScreenProps<ScreenParams> & ConnectedProps

interface State {
  semester: number
  year: string | null
  course: Course | null
  courseLookup: string
  rating: number | null
  review: string
  lecturer: Lecturer | null
}

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
                onPress={() => navigation.goBack()}
              />
            ),
          }
        : {}),
      headerRight:
        mode === 'all' ? (
          <NavIcon
            iconName={Platform.OS === 'ios' ? 'md-checkmark' : 'check'}
            onPress={() =>
              navigation.state.params && navigation.state.params.addReview()
            }
          />
        ) : null,
    }
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      semester: 0,
      year: (new Date().getFullYear() - 1).toString(),
      course: null,
      rating: null,
      lecturer: null,
      review: '',
      courseLookup: '',
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      addReview: this.addReview,
    })
  }

  addReview = () => {
    this.props.navigation.goBack()
  }

  selectCourse = (course: Course) => {
    this.setState({ course })
  }

  selectLecturer = (lecturer: Lecturer) => {
    this.setState({ lecturer })
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
          titleStyle={{ fontFamily: 'NunitoSans-Regular' }}
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
          titleStyle={{ fontFamily: 'NunitoSans-Regular' }}
        />
      ),
    })
  }

  render() {
    const mode = this.props.navigation.getParam('mode')
    const lecturer =
      this.props.navigation.getParam('lecturer') ||
      this.props.lecturer ||
      this.state.lecturer

    const course = this.props.course || this.state.course

    return (
      <KeyboardAwareScrollView
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
          <Input
            label="Year"
            value={this.state.year || ''}
            inputProps={{ keyboardType: 'numeric', maxLength: 4 }}
            onChangeText={year => this.setState({ year })}
            style={{
              width: 80,
            }}
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
            buttons={['September', 'January', 'Summer']}
            selectedIndex={this.state.semester}
            onPress={semester => this.setState({ semester })}
            buttonStyle={{ borderRadius: 0 }}
            textStyle={{ fontFamily: 'NunitoSans-Regular', fontSize: 16 }}
          />
        </View>

        <InputPicker
          label="Course"
          value={course ? `${course.code} - ${course.name}` : 'Select course'}
          onPress={this.lookupCourse}
        />

        {mode === 'all' && (
          <InputPicker
            label="Lecturer"
            value={lecturer ? lecturer.name : 'Select lecturer'}
            onPress={this.lookupLectures}
          />
        )}

        <View style={styles.ratingBox}>
          <Text style={styles.subheader}>Rating</Text>

          <StarRating
            rating={this.state.rating ? this.state.rating : 0}
            fullStarColor={Theme.accent}
            containerStyle={{
              marginVertical: 8,
              justifyContent: 'center',
            }}
            starStyle={{ marginRight: 8 }}
            selectedStar={rating => this.setState({ rating })}
            starSize={36}
          />
        </View>

        <View style={styles.review}>
          <Text style={styles.subheader}>Review</Text>

          <TextInput
            multiline
            placeholder="Be Honest..."
            style={styles.reviewText}
            value={this.state.review}
            onChangeText={review => this.setState({ review })}
          />
        </View>
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
    color: 'rgba(0,0,0,.38)',
    fontSize: 14,
    fontFamily: 'NunitoSans-SemiBold',
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
})

export default connect(mapStateToProps)(NewReview)
