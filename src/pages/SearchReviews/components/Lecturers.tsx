import React from 'react'
import { ActivityIndicator, View } from 'react-native'

interface Props {
  loading: boolean
}

const Lecturers: React.SFC<Props> = ({ loading }) => (
  <View style={{ flex: 1 }}>
    {loading && <ActivityIndicator style={{ marginVertical: 15 }} />}

    {!loading && <View style={{ flex: 1, backgroundColor: 'red' }} />}
  </View>
)

export default Lecturers
