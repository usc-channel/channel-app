import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  Platform,
  Text,
  View,
} from 'react-native'
import { TabBar, TabView } from 'react-native-tab-view'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import debounce from 'lodash.debounce'
import Axios from 'axios'

import { SearchBar, SearchError } from '@components'
import { API, Theme } from '@config'
import { Course, Lecturer } from '@types'

import Courses from './components/Courses'
import Lecturers from './components/Lecturers'

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

type Props = NavigationScreenProps<{}>

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
}

class SearchPosts extends React.Component<Props, State> {
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
      const response = await Promise.all([
        Axios.get(`${API}/courses?search=${search}`),
        Axios.get(`${API}/lecturers?search=${search}`),
      ])

      this.setState({
        courses: response[0].data,
        lecturers: response[1].data,
      })
      this.setState({ loading: false, firstSearch: false })
    } catch {
      this.setState({ loading: false, errored: true })
    }
  }

  renderSearch = () => {
    const Bar = (
      <SearchBar
        onSearchChange={this.updateSearch}
        height={50}
        padding={0}
        placeholder="Search for lecturers or courses"
        autoCorrect={false}
        returnKeyType={'search'}
        alwaysShowBackButton
        onBackPress={this.props.navigation.goBack}
        inputStyle={{
          backgroundColor: '#fff',
          borderWidth: 0,
          borderBottomColor: 'rgba(0,0,0,.12)',
          borderBottomWidth:
            Platform.Version < 21 && Platform.OS === 'android' ? 1 : 0,
          elevation: 2,
        }}
        inputProps={{ autoCorrect: true, autoFocus: true }}
        textStyle={{
          fontSize: 16,
          fontFamily: 'NunitoSans-Regular',
        }}
        value={this.state.text}
      />
    )

    return Platform.OS === 'ios' ? (
      <View
        style={{
          paddingTop: getStatusBarHeight(),
          backgroundColor: Theme.primary,
          zIndex: 2,
          ...(this.state.text.length === 0
            ? {
                shadowColor: '#D2D2D2',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
              }
            : {}),
        }}
      >
        {Bar}
      </View>
    ) : (
      Bar
    )
  }

  viewCourse = (course: Course) => {
    //
  }

  onSelect = () => {
    Keyboard.dismiss()
    this.props.navigation.goBack()
  }

  renderScene = ({ route }: { route: Route }) => {
    switch (route.key) {
      case 'first':
        return <Lecturers loading={this.state.loading} />
      case 'second':
        return (
          <Courses
            courses={this.state.courses}
            loading={this.state.loading}
            search={this.state.text}
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
        borderTopColor: 'rgba(0,0,0,.06)',
        borderTopWidth: 1,
        paddingLeft: 5,
      }}
      tabStyle={{ flex: 0 }}
      indicatorStyle={{ backgroundColor: '#fff' }}
      renderLabel={({ route }: { route: Route }) => (
        <Text
          style={{
            fontFamily: 'NunitoSans-Regular',
            paddingVertical: 5,
            fontSize: 15,
          }}
        >
          {route.title}
        </Text>
      )}
    />
  )

  handleIndexChange = (index: number) => this.setState({ index })

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#EEEEEE',
        }}
      >
        {this.renderSearch()}

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
      </View>
    )
  }
}

export default SearchPosts
