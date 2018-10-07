import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import plur from 'plur'

import { API, Theme } from '@config'
import { Error, Spinner } from '@components'
import { Course, Lecturer, PaginationInfo } from '@types'
import CourseLecturerItem from './components/CourseLecturerItem'

interface ScreenParams {
  course: Course
}

type Props = NavigationScreenProps<ScreenParams>

interface State {
  loading: boolean
  lecturers: Lecturer[]
  pageInfo: PaginationInfo | null
  error: boolean
  retrying: boolean
  fetchingMore: boolean
  refreshing: boolean
}

class ViewCourseLecturers extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      loading: true,
      lecturers: [],
      pageInfo: null,
      retrying: false,
      error: false,
      fetchingMore: false,
      refreshing: false,
    }
  }

  componentDidMount() {
    this.getLecturers()
  }

  getLecturers = async () => {
    try {
      const {
        data: { pageInfo, results: lecturers },
      } = await this.fetchLecturers()

      this.setState({
        lecturers,
        pageInfo,
        loading: false,
        error: false,
        refreshing: false,
      })
    } catch (error) {
      this.setState({
        refreshing: false,
        retrying: false,
        error: true,
        loading: false,
      })
    }
  }

  fetchLecturers = (skip: number = 0) => {
    const course = this.props.navigation.getParam('course')
    return API().get(`/courses/${course.id}/lecturers/?skip=${skip}`)
  }

  viewLecturer = (lecturer: Lecturer) => {
    this.props.navigation.push('viewLecturer', { lecturer })
  }

  retry = () => {
    this.setState({ retrying: true }, () => {
      setTimeout(this.getLecturers, Theme.refreshTimeout)
    })
  }

  refresh = () => {
    this.setState({ refreshing: true }, () => {
      setTimeout(this.getLecturers, Theme.refreshTimeout)
    })
  }

  fetchMore = () => {
    const { pageInfo, fetchingMore } = this.state

    if (!!pageInfo!.nextSkip && !fetchingMore) {
      const nextSkip = pageInfo!.nextSkip!

      this.setState({ fetchingMore: true }, async () => {
        const {
          data: { pageInfo, results },
        } = await this.fetchLecturers(nextSkip)

        this.setState({
          pageInfo,
          fetchingMore: false,
          lecturers: [...this.state.lecturers, ...results],
        })
      })
    }
  }

  render() {
    const course = this.props.navigation.getParam('course')

    const {
      loading,
      lecturers,
      error,
      retrying,
      fetchingMore,
      refreshing,
    } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{course.code}</Text>
            <Text style={styles.course}>{course.name}</Text>
          </View>

          <View style={styles.totalBox}>
            <Text style={styles.totalAmount}>{course.totalReviews}</Text>
            <Text style={styles.totalMeta}>
              {plur('Review', course.totalReviews!)}
            </Text>
          </View>
        </View>

        <Text style={styles.listHeader}>Reviewed Lecturers</Text>

        {loading ? (
          <Spinner />
        ) : error ? (
          <Error
            message="There's been a problem getting the lecturers for this course."
            loading={retrying}
            action={{ message: 'Try again', callback: this.retry }}
          />
        ) : (
          <FlatList
            data={lecturers}
            keyExtractor={(lecturer: Lecturer) => lecturer.id.toString()}
            contentContainerStyle={{
              backgroundColor: Theme.background,
            }}
            renderItem={({ item }) => (
              <CourseLecturerItem
                lecturer={item}
                viewLecturer={() => this.viewLecturer(item)}
              />
            )}
            onEndReached={this.fetchMore}
            refreshing={refreshing}
            onRefresh={this.refresh}
            ListFooterComponent={fetchingMore ? <Spinner /> : null}
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
    color: 'hsl(0, 0%, 100%)',
    fontSize: 20,
    fontFamily: Theme.fonts.bold,
  },
  course: {
    color: 'rgba(255,255,255,.7)',
    fontSize: 16,
    fontFamily: Theme.fonts.regular,
  },
  listHeader: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: Theme.accent,
    color: 'hsl(0, 0%, 100%)',
    fontFamily: Theme.fonts.regular,
  },
  totalBox: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,.7)',
    backgroundColor: '#fff',
  },
  totalAmount: {
    textAlign: 'center',
    fontFamily: Theme.fonts.bold,
    color: Theme.primary,
    fontSize: 18,
  },
  totalMeta: {
    textAlign: 'center',
    fontFamily: Theme.fonts.semiBold,
    color: 'rgba(0,0,0,.5)',
    fontSize: 14,
  },
})

export default ViewCourseLecturers
