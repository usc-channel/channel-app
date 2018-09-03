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
import { Error } from '@components'
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
  error: boolean
  refreshing: boolean
}

class ViewLecturerCourse extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      loading: false,
      reviews: [],
      refreshing: false,
      error: false,
    }
  }

  componentDidMount() {
    this.getReviews()
  }

  getReviews = () => {
    this.setState({ loading: true, error: false }, () => {
      this.fetchReviews()
    })
  }

  fetchReviews = async () => {
    try {
      const lecturer = this.props.navigation.getParam('lecturer')
      const course = this.props.navigation.getParam('course')

      const { data: reviews } = await API(
        `/reviews?lecturerId=${lecturer.id}&courseId=${course.id}`
      )

      this.setState({
        reviews,
        loading: false,
        refreshing: false,
        error: false,
      })
    } catch {
      this.setState({
        error: true,
        refreshing: false,
        loading: false,
      })
    }
  }

  refreshReviews = () => {
    this.setState({ refreshing: true }, this.fetchReviews)
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

        {this.state.loading && <ActivityIndicator style={{ margin: 16 }} />}

        {this.state.error ? (
          <Error
            message="There's been a problem getting the reviews for this Lecturer and Course."
            loading={this.state.refreshing}
            action={{ message: 'Try again', callback: this.refreshReviews }}
          />
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
    fontFamily: Theme.fonts.bold,
  },
  course: {
    color: 'rgba(255,255,255,.7)',
    fontSize: 16,
    fontFamily: Theme.fonts.regular,
  },
})

export default ViewLecturerCourse
