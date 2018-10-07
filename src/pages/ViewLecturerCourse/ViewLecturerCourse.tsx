import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import { API, Theme } from '@config'
import { Error, Spinner } from '@components'
import { Course, Lecturer, PaginationInfo, Review } from '@types'
import ReviewCourseItem from './components/ReviewCourseItem'

interface ScreenParams {
  course: Course
  lecturer: Lecturer
}

type Props = NavigationScreenProps<ScreenParams>

interface State {
  loading: boolean
  reviews: Review[]
  pageInfo: PaginationInfo | null
  error: boolean
  refreshing: boolean
  retrying: boolean
}

class ViewLecturerCourse extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      loading: true,
      reviews: [],
      pageInfo: null,
      refreshing: false,
      retrying: false,
      error: false,
    }
  }

  componentDidMount() {
    this.fetchReviews()
  }

  fetchReviews = async () => {
    try {
      const lecturer = this.props.navigation.getParam('lecturer')
      const course = this.props.navigation.getParam('course')

      const { data } = await API()(
        `/reviews?lecturerId=${lecturer.id}&courseId=${course.id}`
      )

      this.setState({
        reviews: data.results,
        pageInfo: data.pageInfo,
        loading: false,
        refreshing: false,
        retrying: false,
        error: false,
      })
    } catch {
      this.setState({
        error: true,
        refreshing: false,
        loading: false,
        retrying: false,
      })
    }
  }

  refresh = () => {
    this.setState({ refreshing: true }, () => {
      setTimeout(() => {
        this.fetchReviews()
      }, Theme.refreshTimeout)
    })
  }

  retry = () => {
    this.setState({ retrying: true }, () => {
      setTimeout(() => {
        this.fetchReviews()
      }, Theme.refreshTimeout)
    })
  }

  render() {
    const lecturer = this.props.navigation.getParam('lecturer')
    const course = this.props.navigation.getParam('course')

    const { loading, error, retrying, reviews, refreshing } = this.state

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

        {loading && <Spinner />}

        {error ? (
          <Error
            message="There's been a problem getting the reviews for this Lecturer and Course."
            loading={retrying}
            action={{ message: 'Try again', callback: this.retry }}
          />
        ) : (
          <FlatList<Review>
            data={reviews}
            keyExtractor={review => review.id.toString()}
            contentContainerStyle={{
              backgroundColor: Theme.background,
            }}
            renderItem={({ item }) => <ReviewCourseItem review={item} />}
            refreshing={refreshing}
            onRefresh={this.refresh}
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
