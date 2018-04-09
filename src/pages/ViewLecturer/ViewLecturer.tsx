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
import { TabBar, TabViewAnimated } from 'react-native-tab-view'

import { Course, Lecturer, Review } from '@types'
import { API, Theme } from '@config'
import Reviews from './components/Reviews'
import Courses from './components/Courses'

interface ScreenParams {
  lecturer: Lecturer
}

type Props = NavigationScreenProps<ScreenParams>

interface Route {
  key: string
  title: string
}

interface State {
  index: number
  routes: Route[]
  courses: Course[]
  reviews: Review[]
}

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
}

export default class ViewLecturer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Reviews' },
        { key: 'second', title: 'Courses' },
      ],
      courses: [],
      reviews: [],
    }
  }

  componentDidMount() {
    this.getCourses()
    this.getReviews()
  }

  renderScene = ({ route }: { route: Route }) => {
    switch (route.key) {
      case 'first':
        return <Reviews reviews={this.state.reviews} />
      case 'second':
        return (
          <Courses courses={this.state.courses} viewCourse={this.viewCourse} />
        )
      default:
        return null
    }
  }

  getCourses = async () => {
    const { id } = this.props.navigation.state.params.lecturer
    const request = await fetch(`${API}/lecturers/${id}/courses`)
    const courses = await request.json()

    this.setState({
      courses: courses.rows,
    })
  }

  getReviews = async () => {
    const { id } = this.props.navigation.state.params.lecturer
    const request = await fetch(`${API}/lecturers/${id}/reviews`)
    const reviews = await request.json()

    this.setState({
      reviews: reviews.rows,
    })
  }

  viewReview = (review: Review) => {
    this.props.navigation.navigate('viewReview', { review })
  }

  viewCourse = (course: Course) => {
    this.props.navigation.navigate('viewCourse', {
      lecturer: this.props.navigation.state.params.lecturer,
      course,
    })
  }

  makeReview = () => {
    this.props.navigation.navigate('newReview', {
      mode: 'single',
      lecturer: this.props.navigation.state.params.lecturer,
    })
  }

  handleIndexChange = (index: number) => this.setState({ index })

  renderHeader = (props: any) => (
    <TabBar
      {...props}
      style={{ backgroundColor: Theme.primary }}
      indicatorStyle={{ backgroundColor: '#fff' }}
      renderLabel={this.renderLabel}
    />
  )

  renderLabel = ({ route, index }: { route: Route; index: number }) => (
    <View>
      <Text style={styles.tabCount}>
        {index === 0 ? this.state.reviews.length : this.state.courses.length}
      </Text>
      <Text style={styles.tabTitle}>{route.title}</Text>
    </View>
  )

  render() {
    const { lecturer } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{lecturer.name}</Text>
            <Text style={styles.school}>{lecturer.School.name}</Text>
          </View>

          <Icon
            component={TouchableOpacity}
            name="star"
            color="#fff"
            size={24}
            raised
            iconStyle={{ fontSize: 20 }}
            containerStyle={{
              backgroundColor: Theme.accent,
              margin: 0,
              marginLeft: 7,
              marginBottom: 7,
            }}
            onPress={this.makeReview}
          />
        </View>

        <TabViewAnimated
          navigationState={this.state}
          renderScene={this.renderScene}
          renderHeader={this.renderHeader}
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
    fontFamily: 'NunitoSans-Bold',
  },
  school: {
    color: 'rgba(255,255,255,.7)',
    fontSize: 16,
    fontFamily: 'NunitoSans-Regular',
  },
  tabCount: {
    color: '#fff',
    fontFamily: 'NunitoSans-Regular',
    fontSize: 20,
    textAlign: 'center',
  },
  tabTitle: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 14,
    color: 'rgba(255,255,255,.7)',
    textAlign: 'center',
  },
})
