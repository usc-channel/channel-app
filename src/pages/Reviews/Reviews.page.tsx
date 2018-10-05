import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import {
  ActivityIndicator,
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
import { Course, Lecturer, Store } from '@types'

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
  lecturers: Lecturer[]
  courses: Course[]
  errored: boolean
  index: number
  routes: Route[]
  firstSearch: boolean
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
        { key: 'first', title: 'Lecturers' },
        { key: 'second', title: 'Courses' },
      ],
      text: '',
      loading: false,
      courses: [],
      lecturers: [],
      errored: false,
      firstSearch: true,
    }
  }

  componentDidMount() {
    this.getResults = debounce(this.getResults, 500)
  }

  updateSearch = (text: string) => {
    const search = text.toLowerCase().trim()

    if (search.length === 0) {
      this.setState({ text, courses: [], lecturers: [], errored: false })
    } else {
      this.setState({ text, loading: true, errored: false }, () =>
        this.getResults(search)
      )
    }
  }

  getResults = async (search: string) => {
    try {
      const [
        {
          data: { results: courses },
        },
        {
          data: { results: lecturers },
        },
      ] = await Promise.all([
        API().get(`/courses?search=${search}`),
        API().get(`/lecturers?search=${search}`),
      ])

      this.setState({
        courses,
        lecturers,
        loading: false,
        firstSearch: false,
      })
    } catch {
      this.setState({ loading: false, errored: true })
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
    const { courses, loading, lecturers, text } = this.state
    switch (route.key) {
      case 'first':
        return (
          <Lecturers
            loading={loading}
            lecturers={lecturers}
            search={text}
            viewLecturer={this.viewLecturer}
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
          this.state.text.length === 0 && (
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
          this.state.text.length > 0 && (
            <TabView
              navigationState={this.state}
              renderScene={this.renderScene}
              renderTabBar={this.renderTabBar}
              onIndexChange={this.handleIndexChange}
              initialLayout={initialLayout}
            />
          )}

        <View
          style={{
            position: 'absolute',
            bottom: Platform.OS === 'ios' ? 20 : 16,
            left: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
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
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({ userState }: Store) => ({
  loggedIn: !!userState.user,
})

export default connect(mapStateToProps)(Reviews)
