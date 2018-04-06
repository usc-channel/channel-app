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
import { ButtonGroup, Icon } from 'react-native-elements'
import StarRating from 'react-native-star-rating'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Input, InputPicker, NavIcon } from '@components'
import { Theme } from '@config'
import { Course, Lecturer } from '@types'

interface ScreenParams {
  lecturer: Lecturer
}

type Props = NavigationScreenProps<ScreenParams>

interface State {
  semester: number
  year: string | null
  course: Course | null
  courseLookup: string
  rating: number | null
  review: string
}

export default class NewReview extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }: NavigationScreenProps<{}>) => ({
    headerLeft: (
      <NavIcon
        iconName={
          Platform.OS === 'ios' ? 'ios-arrow-down' : 'keyboard-arrow-down'
        }
        onPress={() => navigation.goBack()}
      />
    ),
  })

  constructor(props: Props) {
    super(props)

    this.state = {
      semester: 0,
      year: (new Date().getFullYear() - 1).toString(),
      course: null,
      rating: null,
      review: '',
      courseLookup: '',
    }
  }

  addReview = () => {
    this.props.navigation.goBack()
  }

  selectCourse = (course: Course) => {
    this.setState({ course })
  }

  lookupCourse = () => {
    this.props.navigation.navigate('searchCourses', {
      selectCourse: this.selectCourse,
    })
  }

  render() {
    const { lecturer } = this.props.navigation.state.params

    return (
      <KeyboardAwareScrollView
        bounces={false}
        style={{ flex: 1, backgroundColor: Theme.background }}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.subtitle}>NEW LECTURER REVIEW</Text>
            <Text style={styles.name}>{lecturer.name}</Text>
          </View>

          <Icon
            component={TouchableOpacity}
            name="check"
            color="#fff"
            size={24}
            raised
            iconStyle={{ fontSize: 20 }}
            containerStyle={{ backgroundColor: Theme.accent, marginRight: 0 }}
            onPress={this.addReview}
          />
        </View>

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
          value={
            this.state.course
              ? `${this.state.course.code} - ${this.state.course.name}`
              : 'Select course'
          }
          onPress={this.lookupCourse}
        />

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
    fontFamily: 'NunitoSans-Regular',
    color: 'rgba(0,0,0,.87)',
  },
})
