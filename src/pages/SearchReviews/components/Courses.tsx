import React from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'

import { Course } from '@types'
import CourseItem from './CourseItem'
import { SearchEmpty } from '@components'

interface Props {
  search: string
  loading: boolean
  courses: Course[]
  viewCourse(course: Course): void
}

const Courses: React.SFC<Props> = ({
  loading,
  courses,
  search,
  viewCourse,
}) => (
  <View style={{ flex: 1 }}>
    {loading && <ActivityIndicator style={{ marginVertical: 15 }} />}

    {!loading && (
      <FlatList
        data={courses}
        renderItem={({ item }) => (
          <CourseItem course={item} viewCourse={() => viewCourse(item)} />
        )}
        keyExtractor={course => course.id.toString()}
        contentContainerStyle={courses.length === 0 && { flex: 1 }}
        ListEmptyComponent={
          <SearchEmpty search={search} message="No courses found for" />
        }
      />
    )}
  </View>
)

export default Courses
