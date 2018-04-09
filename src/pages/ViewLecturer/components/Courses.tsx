import React from 'react'
import { FlatList } from 'react-native'

import { Course } from '@types'
import CourseItem from './CourseItem'

interface Props {
  courses: Course[]
  viewCourse(course: Course): void
}

const Courses: React.SFC<Props> = ({ courses, viewCourse }) => (
  <FlatList
    keyExtractor={(course: Course) => course.id.toString()}
    data={courses}
    renderItem={({ item }) => (
      <CourseItem course={item} viewCourse={viewCourse} />
    )}
  />
)

export default Courses
