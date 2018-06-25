import React from 'react'
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import { API, Theme } from '@config'
import { Course, Lecturer, Review } from '@types'
import ReviewCourseItem from './components/ReviewCourseItem'

interface ScreenParams {
  course: Course
  lecturer: Lecturer
}

type Props = NavigationScreenProps<ScreenParams>

interface State {
  loading: boolean
  reviews: Review[]
}

class ViewCourse extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      loading: false,
      reviews: [],
    }
  }

  componentDidMount() {
    this.getReviews()
  }

  getReviews = () => {
    this.setState({ loading: true }, async () => {
      const lecturer = this.props.navigation.getParam('lecturer')
      const course = this.props.navigation.getParam('course')

      const request = await fetch(
        `${API}/lecturers/${lecturer.id}/reviews/${course.id}`
      )
      const reviews = await request.json()

      this.setState({ reviews, loading: false })
    })
  }

  render() {
    const lecturer = this.props.navigation.getParam('lecturer')
    const course = this.props.navigation.getParam('course')

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{`${lecturer.name}'s Reviews`}</Text>
            <Text style={styles.course}>{`${course.code} - ${
              course.name
            }`}</Text>
          </View>
        </View>

        {this.state.loading ? (
          <ActivityIndicator style={{ margin: 16 }} />
        ) : (
          <FlatList
            data={this.state.reviews}
            keyExtractor={(review: Review) => review.id.toString()}
            contentContainerStyle={{
              backgroundColor: Theme.background,
            }}
            renderItem={({ item }) => <ReviewCourseItem review={item} />}
          />
        )}
      </View>
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
    paddingBottom: 16,
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'NunitoSans-Bold',
  },
  course: {
    color: 'rgba(255,255,255,.7)',
    fontSize: 16,
    fontFamily: 'NunitoSans-Regular',
  },
})

export default ViewCourse
