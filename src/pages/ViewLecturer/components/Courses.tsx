import React from 'react'
import { FlatList } from 'react-native'

import { Empty, Error, Spinner } from '@components'
import { Course, PaginationInfo } from '@types'
import { API, Theme } from '@config'

import CourseItem from './CourseItem'

interface Props {
  lecturerId: number
  viewCourse(course: Course): void
}

interface State {
  courses: Course[]
  pageInfo: PaginationInfo | null
  loading: boolean
  error: boolean
  retrying: boolean
  refreshing: boolean
}

class Courses extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      courses: [],
      pageInfo: null,
      loading: true,
      error: false,
      retrying: false,
      refreshing: false,
    }
  }

  componentDidMount() {
    this.fetchCourses()
  }

  fetchCourses = async () => {
    try {
      const { data } = await API().get(
        `/lecturers/${this.props.lecturerId}/courses`
      )

      this.setState({
        courses: data.results,
        pageInfo: data.pageInfo,
        loading: false,
        error: false,
        retrying: false,
        refreshing: false,
      })
    } catch {
      this.setState({
        error: true,
        loading: false,
        refreshing: false,
        retrying: false,
      })
    }
  }

  retry = () => {
    this.setState({ retrying: true }, () => {
      setTimeout(this.fetchCourses, Theme.refreshTimeout)
    })
  }

  refresh = () => {
    this.setState({ refreshing: true }, () => {
      setTimeout(this.fetchCourses, Theme.refreshTimeout)
    })
  }

  render() {
    const { retrying, refreshing, error, loading, courses } = this.state
    const { viewCourse } = this.props

    if (loading) {
      return <Spinner />
    }

    if (error) {
      return (
        <Error
          message="There's been a problem getting the courses rated for this Lecturer."
          loading={retrying}
          action={{ message: 'Try again', callback: this.retry }}
        />
      )
    }

    if (courses.length === 0) {
      return (
        <Empty
          title="No Courses"
          image={require('../../../assets/course.png')}
          message="As reviews are added for this lecturer the courses will appear here."
        />
      )
    }

    return (
      <FlatList<Course>
        keyExtractor={course => course.id.toString()}
        data={courses}
        renderItem={({ item }) => (
          <CourseItem course={item} viewCourse={viewCourse} />
        )}
        onRefresh={this.refresh}
        refreshing={refreshing}
      />
    )
  }
}

export default Courses
