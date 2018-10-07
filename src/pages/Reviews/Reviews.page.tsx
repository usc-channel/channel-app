import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Keyboard,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Scene, TabBar, TabView } from 'react-native-tab-view'
import { Icon, SearchBar } from 'react-native-elements'
import debounce from 'lodash.debounce'

import { Empty, SearchError } from '@components'
import { API, Theme } from '@config'
import { getStatusBarHeight } from '@util'
import { Course, Lecturer, PaginationInfo, Store } from '@types'

import Courses from './components/Courses'
import Lecturers from './components/Lecturers'
import { connect } from 'react-redux'

interface Route {
  key: string
  title: string
}

interface State {
  text: string
  loading: boolean
  lecturers: {
    results: Lecturer[]
    pageInfo: PaginationInfo
  } | null
  lecturersFetching: boolean
  courses: Course[]
  errored: boolean
  index: number
  routes: Route[]
  firstSearch: boolean
  fabScale: Animated.Value
}

interface ConntectedProps {
  loggedIn: boolean
}

type Props = NavigationScreenProps<{}> & ConntectedProps

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
}

class Reviews extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      index: 0,
      routes: [
        { key: 'second', title: 'Courses' },
        { key: 'first', title: 'Lecturers' },
      ],
      text: '',
      loading: false,
      courses: [],
      lecturers: null,
      errored: false,
      firstSearch: true,
      lecturersFetching: false,
      fabScale: new Animated.Value(1),
    }
  }

  componentDidMount() {
    this.getResults = debounce(this.getResults, 500)
  }

  componentDidUpdate() {
    if (this.state.lecturersFetching) {
      Animated.spring(this.state.fabScale, {
        toValue: 0,
        tension: 40,
      }).start()
    } else {
      Animated.spring(this.state.fabScale, {
        toValue: 1,
        tension: 40,
      }).start()
    }
  }

  updateSearch = (text: string) => {
    const search = text.toLowerCase().trim()

    if (search.length === 0) {
      this.setState({ text, courses: [], lecturers: null, errored: false })
    } else {
      this.setState({ text, loading: true, errored: false }, () =>
        this.getResults(search)
      )
    }
  }

  getResults = async (search: string) => {
    try {
      const [{ data: courses }, { data: lecturers }] = await Promise.all([
        API().get(`/courses?search=${search}`),
        this.fetchLecturers(),
      ])

      this.setState({
        courses: courses.results,
        lecturers: {
          pageInfo: lecturers.pageInfo,
          results: lecturers.results,
        },
        loading: false,
        firstSearch: false,
      })
    } catch {
      this.setState({ loading: false, errored: true })
    }
  }

  fetchLecturers = (skip: number = 0) => {
    const { text } = this.state
    return API().get(`/lecturers?search=${text}&skip=${skip}`)
  }

  fetchMoreLecturers = () => {
    const { loading, lecturersFetching, lecturers } = this.state

    if (
      !loading &&
      !lecturersFetching &&
      lecturers!.pageInfo &&
      !!lecturers!.pageInfo!.nextSkip!
    ) {
      this.setState(
        {
          lecturersFetching: true,
        },
        async () => {
          const {
            data: { results, pageInfo },
          } = await this.fetchLecturers(lecturers!.pageInfo.nextSkip!)

          this.setState({
            lecturers: {
              pageInfo,
              results: [...this.state.lecturers!.results, ...results],
            },
            lecturersFetching: false,
          })
        }
      )
    }
  }

  renderSearch = () => {
    const Bar = (
      <SearchBar
        platform={Platform.OS === 'ios' ? 'ios' : 'android'}
        onChangeText={this.updateSearch}
        placeholder="Search for lecturers or courses"
        returnKeyType={'search'}
        value={this.state.text}
        containerStyle={Platform.select({
          ios: {
            backgroundColor: Theme.primary,
            paddingTop: 5,
            paddingBottom: 8,
          },
          android: {
            elevation: this.state.text.length > 0 ? 0 : 3,
          },
        })}
        inputStyle={{ fontFamily: Theme.fonts.regular, fontSize: 16 }}
        inputContainerStyle={{ backgroundColor: '#fff' }}
        cancelButtonProps={{ color: 'hsl(207, 19%, 98%)' }}
        clearIcon
      />
    )

    return Platform.OS === 'ios' ? (
      <View
        style={{
          paddingTop: getStatusBarHeight(),
          backgroundColor: Theme.primary,
          zIndex: 2,
        }}
      >
        {Bar}
      </View>
    ) : (
      Bar
    )
  }

  viewCourse = (course: Course) => {
    Keyboard.dismiss()
    this.props.navigation.push('viewCourseLecturers', { course })
  }

  viewLecturer = (lecturer: Lecturer) => {
    Keyboard.dismiss()
    this.props.navigation.push('viewLecturer', { lecturer })
  }

  onSelect = () => {
    Keyboard.dismiss()
    this.props.navigation.goBack()
  }

  addReview = () => {
    if (this.props.loggedIn) {
      this.props.navigation.navigate('newReview', { mode: 'all' })
    } else {
      this.props.navigation.navigate('signIn')
    }
  }

  renderScene = ({ route }: { route: Route }) => {
    const { courses, loading, lecturers, text, lecturersFetching } = this.state
    switch (route.key) {
      case 'first':
        return (
          <Lecturers
            loading={loading}
            lecturers={lecturers!}
            search={text}
            fetchingMore={lecturersFetching}
            viewLecturer={this.viewLecturer}
            fetchMore={this.fetchMoreLecturers}
          />
        )
      case 'second':
        return (
          <Courses
            courses={courses}
            loading={loading}
            search={text}
            viewCourse={this.viewCourse}
          />
        )
    }
  }

  renderTabBar = (props: any) => (
    <TabBar
      {...props}
      style={{
        backgroundColor: '#fff',
        paddingLeft: 5,
      }}
      tabStyle={{ flex: 0 }}
      indicatorStyle={{ backgroundColor: '#fff' }}
      renderLabel={({ route }: Scene<Route>) => {
        const focused = this.state.routes.indexOf(route) === this.state.index

        return (
          <View
            style={{
              backgroundColor: focused ? Theme.accent : 'transparent',
            }}
          >
            <Text
              style={{
                fontFamily: Theme.fonts.semiBold,
                fontSize: 13,
                padding: 5,
                color: focused ? 'hsl(0, 0%, 100%)' : 'hsl(0, 0%, 0%)',
              }}
            >
              {route.title.toUpperCase()}
            </Text>
          </View>
        )
      }}
    />
  )

  handleIndexChange = (index: number) => this.setState({ index })

  render() {
    const text = this.state.text.trim()

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Theme.background,
        }}
      >
        {this.renderSearch()}

        {!this.state.errored &&
          !this.state.loading &&
          text.length === 0 && (
            <View
              style={{
                marginTop: -100,
                flex: 1,
              }}
            >
              <Empty
                image={require('../../assets/chat.png')}
                title="Lecturer Reviews"
                message="Search for a course or lecturer to see popular reviews or add one yourself!"
              />
            </View>
          )}

        {this.state.firstSearch &&
          this.state.loading &&
          !this.state.errored && (
            <ActivityIndicator style={{ marginVertical: 15 }} />
          )}

        {this.state.errored && (
          <SearchError message="Couldn't make your search right now. " />
        )}

        {!this.state.firstSearch &&
          !this.state.errored &&
          text.length > 0 &&
          this.state.lecturers && (
            <TabView
              navigationState={this.state}
              renderScene={this.renderScene}
              renderTabBar={this.renderTabBar}
              onIndexChange={this.handleIndexChange}
              initialLayout={initialLayout}
            />
          )}

        <Animated.View
          style={{
            position: 'absolute',
            bottom: Platform.OS === 'ios' ? 20 : 16,
            left: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
            transform: [{ scale: this.state.fabScale }],
          }}
          pointerEvents="box-none"
        >
          <Icon
            component={TouchableOpacity}
            name="star"
            color={Theme.accent}
            size={24}
            raised
            iconStyle={{ fontSize: 20 }}
            containerStyle={{
              marginRight: 0,
            }}
            reverse
            onPress={this.addReview}
          />
        </Animated.View>
      </View>
    )
  }
}

const mapStateToProps = ({ userState }: Store) => ({
  loggedIn: !!userState.user,
})

export default connect(mapStateToProps)(Reviews)
