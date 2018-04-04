import React from 'react'
import { FlatList } from 'react-native'

import { Course } from '@types'
import mocks from '../../../mocks.json'
import CourseItem from './CourseItem'

interface Props {
  viewCourse(course: Course): void
}

const Courses: React.SFC<Props> = ({ viewCourse }) => (
  <FlatList
    keyExtractor={(course: Course) => course.id.toString()}
    data={mocks.courses}
    renderItem={({ item }) => (
      <CourseItem course={item} viewCourse={viewCourse} />
    )}
  />
)

export default Courses
