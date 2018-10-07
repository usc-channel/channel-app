import React from 'react'
import { FlatList, Keyboard, View } from 'react-native'

import { Course, PaginationInfo } from '@types'
import CourseItem from './CourseItem'
import { SearchEmpty, Spinner } from '@components'

interface Props {
  search: string
  loading: boolean
  courses: {
    results: Course[]
    pageInfo: PaginationInfo
  }
  fetchingMore: boolean
  fetchMore(): void
  viewCourse(course: Course): void
}

const Courses: React.SFC<Props> = ({
  loading,
  courses,
  search,
  viewCourse,
  fetchingMore,
  fetchMore,
}) => (
  <View style={{ flex: 1 }}>
    {loading && <Spinner />}

    {!loading && (
      <FlatList
        data={courses.results}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <CourseItem course={item} viewCourse={() => viewCourse(item)} />
        )}
        onMomentumScrollBegin={() => Keyboard.dismiss()}
        onEndReached={fetchMore}
        keyExtractor={course => course.id.toString()}
        contentContainerStyle={courses.results.length === 0 && { flex: 1 }}
        ListFooterComponent={fetchingMore ? <Spinner /> : null}
        ListEmptyComponent={
          <SearchEmpty search={search} message="No courses found for" />
        }
      />
    )}
  </View>
)

export default Courses
