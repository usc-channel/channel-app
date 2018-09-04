import React from 'react'
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import { API, Theme } from '@config'
import { Error } from '@components'
import { Course, Lecturer } from '@types'
import LecturerItem from '../SearchReviews/components/LecturerItem'

interface ScreenParams {
  course: Course
}

type Props = NavigationScreenProps<ScreenParams>

interface State {
  loading: boolean
  lecturers: Lecturer[]
  error: boolean
  refreshing: boolean
}

class ViewCourseLecturers extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      loading: false,
      lecturers: [],
      refreshing: false,
      error: false,
    }
  }

  componentDidMount() {
    this.getLecturers()
  }

  getLecturers = () => {
    this.setState({ loading: true, error: false }, () => {
      this.fetchLecturers()
    })
  }

  fetchLecturers = async () => {
    try {
      const course = this.props.navigation.getParam('course')

      const { data: lecturers } = await API()(`/courses/${course.id}/lecturers`)

      this.setState({
        lecturers,
        loading: false,
        refreshing: false,
        error: false,
      })
    } catch {
      this.setState({
        error: true,
        refreshing: false,
        loading: false,
      })
    }
  }

  refreshReviews = () => {
    this.setState({ refreshing: true }, this.fetchLecturers)
  }

  viewLecturer = (lecturer: Lecturer) => {
    this.props.navigation.push('viewLecturer', { lecturer })
  }

  render() {
    const course = this.props.navigation.getParam('course')

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{course.code}</Text>
            <Text style={styles.course}>{course.name}</Text>
          </View>
        </View>

        <Text style={styles.listHeader}>Reviewed Lecturers</Text>

        {this.state.loading && <ActivityIndicator style={{ margin: 16 }} />}

        {this.state.error ? (
          <Error
            message="There's been a problem getting the reviews for this Lecturer and Course."
            loading={this.state.refreshing}
            action={{ message: 'Try again', callback: this.refreshReviews }}
          />
        ) : (
          <FlatList
            data={this.state.lecturers}
            keyExtractor={(lecturer: Lecturer) => lecturer.id.toString()}
            contentContainerStyle={{
              backgroundColor: Theme.background,
            }}
            renderItem={({ item }) => (
              <LecturerItem
                lecturer={item}
                viewLecturer={() => this.viewLecturer(item)}
              />
            )}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: 'hsl(0, 0%, 100%)',
    fontSize: 20,
    fontFamily: Theme.fonts.bold,
  },
  course: {
    color: 'rgba(255,255,255,.7)',
    fontSize: 16,
    fontFamily: Theme.fonts.regular,
  },
  listHeader: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: Theme.accent,
    color: 'hsl(0, 0%, 100%)',
    fontFamily: Theme.fonts.regular,
  },
})

export default ViewCourseLecturers
