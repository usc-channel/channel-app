import React from 'react'
import { ActivityIndicator, FlatList, Keyboard, View } from 'react-native'

import LecturerItem from './LecturerItem'
import { Lecturer, PaginationInfo } from '@types'
import { SearchEmpty, Spinner } from '@components'

interface Props {
  search: string
  loading: boolean
  lecturers: {
    results: Lecturer[]
    pageInfo: PaginationInfo
  }
  fetchingMore: boolean
  fetchMore(): void
  viewLecturer(lecturer: Lecturer): void
}

const Lecturers: React.SFC<Props> = ({
  loading,
  lecturers,
  search,
  viewLecturer,
  fetchingMore,
  fetchMore,
}) => (
  <View style={{ flex: 1 }}>
    {loading && <ActivityIndicator style={{ marginVertical: 15 }} />}

    {!loading && (
      <FlatList
        data={lecturers.results}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <LecturerItem
            lecturer={item}
            viewLecturer={() => viewLecturer(item)}
          />
        )}
        onScroll={() => Keyboard.dismiss()}
        onEndReached={fetchMore}
        keyExtractor={a => a.id.toString()}
        contentContainerStyle={lecturers.results.length === 0 && { flex: 1 }}
        ListFooterComponent={fetchingMore ? <Spinner /> : null}
        ListEmptyComponent={
          <SearchEmpty search={search} message="No lecturers found for" />
        }
      />
    )}
  </View>
)

export default Lecturers
