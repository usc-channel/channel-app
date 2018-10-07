import React from 'react'
import { FlatList } from 'react-native'
import { Empty, Error, Spinner } from '@components'

import { Course } from '@types'
import CourseItem from './CourseItem'

interface Props {
  courses: Course[]
  loading: boolean
  error: boolean
  refreshing: boolean
  viewCourse(course: Course): void
  getCourses(): void
}

const Courses: React.SFC<Props> = ({
  refreshing,
  error,
  loading,
  courses,
  viewCourse,
  getCourses,
}) => (
  <React.Fragment>
    {loading && <Spinner />}

    {!loading &&
      error && (
        <Error
          message="There's been a problem getting the courses rated for this Lecturer."
          loading={refreshing}
          action={{ message: 'Try again', callback: getCourses }}
        />
      )}

    {!loading &&
      !error &&
      courses.length === 0 && (
        <Empty
          title="No Courses"
          image={require('../../../assets/course.png')}
          message="As reviews are added for this lecturer the courses will appear here."
        />
      )}

    {!loading &&
      !error &&
      courses.length > 0 && (
        <FlatList
          keyExtractor={(course: Course) => course.id.toString()}
          data={courses}
          renderItem={({ item }) => (
            <CourseItem course={item} viewCourse={viewCourse} />
          )}
        />
      )}
  </React.Fragment>
)

export default Courses
