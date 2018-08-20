import React from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'

import { Course } from '@types'
import CourseItem from './CourseItem'
import { Empty } from '@components'

interface Props {
  loading: boolean
  courses: Course[]
  viewCourse(course: Course): void
}

const Courses: React.SFC<Props> = ({ loading, courses, viewCourse }) => (
  <View style={{ flex: 1 }}>
    {loading && <ActivityIndicator style={{ marginVertical: 15 }} />}

    {!loading && (
      <FlatList
        data={courses}
        renderItem={({ item }) => (
          <CourseItem course={item} viewCourse={() => viewCourse(item)} />
        )}
        keyExtractor={course => course.id.toString()}
        contentContainerStyle={{ flex: 1 }}
        ListEmptyComponent={
          <Empty
            title="No Courses Found"
            image={require('../../../assets/course.png')}
            message="Try searching for something else?"
          />
        }
      />
    )}
  </View>
)

export default Courses
