import React from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import { Error } from '@components'

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
    {loading && <ActivityIndicator style={{ marginVertical: 15 }} />}

    {error ? (
      <Error
        message="There's been a problem getting the courses rated for this Lecturer."
        loading={refreshing}
        action={{ message: 'Try again', callback: getCourses }}
      />
    ) : (
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
