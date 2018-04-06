import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { FlatList, Keyboard, Platform, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import AndroidSearchBar from 'react-native-material-design-searchbar'
import debounce from 'lodash.debounce'
import { ListItem } from 'react-native-elements'

import { Course } from '@types'
import { SearchEmpty } from '@components'
import { API, Theme } from '@config'

interface State {
  text: string
  loading: boolean
  courses: Course[]
}

type Props = NavigationScreenProps<{
  selectCourse(course: Course): void
}>

class SearchPosts extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      text: '',
      loading: false,
      courses: [],
    }

    this.getResults = debounce(this.getResults, 500)
  }

  updateSearch = (text: string) => {
    const search = text.toLowerCase().trim()

    if (search.length === 0) {
      this.setState({ text, courses: [] })
    } else {
      this.setState({ text, loading: true }, () => this.getResults(search))
    }
  }

  getResults = (search: string) => {
    fetch(`${API}/courses?search=${search}`)
      .then(res => res.json())
      .then(courses => {
        this.setState({
          loading: false,
          courses,
        })
      })
      .catch(console.error)
  }

  renderSearch = () => {
    const Bar = (
      <AndroidSearchBar
        onSearchChange={this.updateSearch}
        height={50}
        padding={0}
        placeholder="Search Course ID or Course Name"
        autoCorrect={false}
        returnKeyType={'search'}
        alwaysShowBackButton
        onBackPress={this.props.navigation.goBack}
        inputProps={{ autoFocus: true }}
        inputStyle={{
          backgroundColor: '#fff',
          borderWidth: 0,
          elevation: 2,
        }}
        textStyle={{
          fontSize: 16,
          fontFamily: 'NunitoSans-Regular',
        }}
      />
    )

    return Platform.OS === 'ios' ? (
      <View
        style={{
          shadowColor: '#D2D2D2',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
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

  isEmpty = () => {
    return (
      this.state.text.length > 0 &&
      this.state.courses.length === 0 &&
      !this.state.loading
    )
  }

  selectCourse = (course: Course) => {
    Keyboard.dismiss()
    this.props.navigation.state.params.selectCourse(course)
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#EEEEEE',
        }}
      >
        {this.renderSearch()}

        {this.isEmpty() ? (
          <SearchEmpty search={this.state.text} />
        ) : (
          <FlatList
            keyboardShouldPersistTaps="always"
            data={this.state.courses}
            renderItem={({ item }) => (
              <ListItem
                title={`${item.code} - ${item.name}`}
                onPress={() => this.selectCourse(item)}
                titleStyle={{ fontFamily: 'NunitoSans-Regular' }}
              />
            )}
            keyExtractor={(course: Course) => course.id.toString()}
          />
        )}
      </View>
    )
  }
}

export default SearchPosts
