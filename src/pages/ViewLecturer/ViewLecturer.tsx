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
import { SceneMap, TabBar, TabViewAnimated } from 'react-native-tab-view'

import { Course, Lecturer, Review } from '@types'
import { Theme } from '@config'
import Reviews from './components/Reviews'
import Courses from './components/Courses'

interface ScreenParams {
  lecturer: Lecturer
}

type Props = NavigationScreenProps<ScreenParams>

interface Route {
  key: string
  title: string
  count: number
}

interface State {
  index: number
  routes: Route[]
}

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
}

export default class ViewLecturer extends React.Component<Props, State> {
  renderScene = SceneMap({
    first: () => <Reviews />,
    second: () => <Courses viewCourse={this.viewCourse} />,
  })

  constructor(props: Props) {
    super(props)

    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Reviews', count: 300 },
        { key: 'second', title: 'Courses', count: 12 },
      ],
    }
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
    this.props.navigation.navigate('newReview')
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

  renderLabel = ({ route }: { route: Route }) => (
    <View>
      <Text style={styles.tabCount}>{route.count}</Text>
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
            containerStyle={{ backgroundColor: Theme.accent }}
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
