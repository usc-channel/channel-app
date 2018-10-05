import React from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'

import LecturerItem from './LecturerItem'
import { Lecturer } from '@types'
import { SearchEmpty } from '@components'

interface Props {
  search: string
  loading: boolean
  lecturers: Lecturer[]
  viewLecturer(lecturer: Lecturer): void
}

const Lecturers: React.SFC<Props> = ({
  loading,
  lecturers,
  search,
  viewLecturer,
}) => (
  <View style={{ flex: 1 }}>
    {loading && <ActivityIndicator style={{ marginVertical: 15 }} />}

    {!loading && (
      <FlatList
        data={lecturers}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <LecturerItem
            lecturer={item}
            viewLecturer={() => viewLecturer(item)}
          />
        )}
        keyExtractor={a => a.id.toString()}
        contentContainerStyle={lecturers.length === 0 && { flex: 1 }}
        ListEmptyComponent={
          <SearchEmpty search={search} message="No lecturers found for" />
        }
      />
    )}
  </View>
)

export default Lecturers
