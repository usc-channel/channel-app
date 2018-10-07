import React from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { Icon } from 'react-native-elements'
import { TabBar, TabView } from 'react-native-tab-view'
import { connect, Dispatch } from 'react-redux'

import { Course, Lecturer, LecturerReviewsState, Review, Store } from '@types'
import { Theme } from '@config'
import Reviews from './components/Reviews'
import Courses from './components/Courses'
import { getLecturerReviews, setLecturer } from '@actions'

interface ScreenParams {
  lecturer: Lecturer
}

type OwnProps = NavigationScreenProps<ScreenParams>

interface StateProps {
  isLoggedIn: boolean
  lecturerReviews: LecturerReviewsState
}

interface ConnectedDispatch {
  getLecturerReviews(lecturerId: number, refresh?: boolean): void
  setLecturer(lecturer: Lecturer): void
}

type Props = OwnProps & StateProps & ConnectedDispatch

interface Route {
  key: string
  title: string
}

interface State {
  index: number
  routes: Route[]
}

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
}

class ViewLecturer extends React.Component<Props, State> {
  lecturerId: number

  constructor(props: Props) {
    super(props)

    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Reviews' },
        { key: 'second', title: 'Courses' },
      ],
    }

    this.lecturerId = this.props.navigation.getParam('lecturer')!.id
  }

  componentDidMount() {
    this.props.getLecturerReviews(this.lecturerId)
  }

  refreshReviews = () => {
    this.props.getLecturerReviews(this.lecturerId, true)
  }

  renderScene = ({ route }: { route: Route }) => {
    const { data: reviews, loading, error } = this.props.lecturerReviews

    switch (route.key) {
      case 'first':
        return (
          <Reviews
            reviews={reviews}
            loading={loading === 'fetch'}
            refreshing={loading === 'refresh'}
            error={error}
            getReviews={this.refreshReviews}
          />
        )
      case 'second':
        return (
          <Courses lecturerId={this.lecturerId} viewCourse={this.viewCourse} />
        )
    }
  }

  viewReview = (review: Review) => {
    this.props.navigation.navigate('viewReview', { review })
  }

  viewCourse = (course: Course) => {
    const lecturer = this.props.navigation.getParam('lecturer')

    this.props.navigation.navigate('viewLecturerCourse', {
      lecturer,
      course,
    })
  }

  makeReview = () => {
    if (this.props.isLoggedIn) {
      const lecturer = this.props.navigation.getParam('lecturer')
      this.props.setLecturer(lecturer)

      this.props.navigation.navigate('newReview', {
        mode: 'single',
      })
    } else {
      this.props.navigation.navigate('signIn')
    }
  }

  handleIndexChange = (index: number) => this.setState({ index })

  renderTabBar = (props: any) => (
    <TabBar
      {...props}
      style={{ backgroundColor: Theme.primary }}
      indicatorStyle={{ backgroundColor: '#fff' }}
    />
  )

  render() {
    const lecturer = this.props.navigation.getParam('lecturer')

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{lecturer.name}</Text>
            <Text style={styles.school}>{lecturer.School.name}</Text>
          </View>

          <Icon
            component={TouchableOpacity}
            name="star"
            color={Theme.accent}
            size={24}
            raised
            reverse
            iconStyle={{ fontSize: 20 }}
            containerStyle={{
              margin: 0,
              marginLeft: 7,
              marginBottom: 7,
            }}
            onPress={this.makeReview}
          />
        </View>

        <TabView
          navigationState={this.state}
          renderScene={this.renderScene}
          renderTabBar={this.renderTabBar}
          onIndexChange={this.handleIndexChange}
          initialLayout={initialLayout}
        />
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
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontFamily: Theme.fonts.bold,
  },
  school: {
    color: 'rgba(255,255,255,.7)',
    fontSize: 16,
    fontFamily: Theme.fonts.regular,
  },
  tabCount: {
    color: '#fff',
    fontFamily: Theme.fonts.regular,
    fontSize: 20,
    textAlign: 'center',
  },
  tabTitle: {
    fontFamily: Theme.fonts.regular,
    fontSize: 14,
    color: 'rgba(255,255,255,.7)',
    textAlign: 'center',
  },
})

const mapStateToProps = ({ userState, lecturerReviews }: Store) => ({
  isLoggedIn: !!userState.user,
  lecturerReviews,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getLecturerReviews: (lecturerId: number, refresh?: boolean) =>
    dispatch(getLecturerReviews(lecturerId, refresh)),
  setLecturer: (lecturer: Lecturer) => dispatch(setLecturer(lecturer)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewLecturer)
