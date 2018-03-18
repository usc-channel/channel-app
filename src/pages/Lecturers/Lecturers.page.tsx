import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import SearchBar from 'react-native-material-design-searchbar'
import { NavigationScreenProps } from 'react-navigation'

import { Theme } from '@config'
import { Lecturer as LecturerModel } from '@types'
import Lecturer from './components/Lecturer'
import mocks from '../../mocks.json'

type Props = NavigationScreenProps<{}>

interface State {
  search: string
  lecturers: LecturerModel[]
}

class Lecturers extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      search: '',
      lecturers: [],
    }
  }

  componentDidMount() {
    this.setState({ lecturers: mocks.lecturers })
  }

  updateSearch = (search: string) => {
    this.setState({ search })
  }

  viewLecturer = (lecturer: LecturerModel) => {
    //
  }

  filterLecturers = () => {
    if (this.state.search === '') {
      return this.state.lecturers
    }

    return this.state.lecturers.filter(a =>
      a.name.toLowerCase().includes(this.state.search.toLowerCase())
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            paddingTop: getStatusBarHeight(),
            backgroundColor: Theme.primary,
          }}
        />

        <SearchBar
          onSearchChange={this.updateSearch}
          onBlur={() => this.updateSearch('')}
          height={50}
          padding={0}
          placeholder="Search lecturer or course number"
          autoCorrect={false}
          returnKeyType={'search'}
          inputProps={{ value: this.state.search }}
          inputStyle={{
            backgroundColor: '#fff',
            borderWidth: 0,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(0,0,0,.12)',
            elevation: 2,
          }}
          textStyle={{
            fontSize: 16,
            fontFamily: 'NunitoSans-Regular',
          }}
        />

        <FlatList
          data={this.filterLecturers()}
          keyExtractor={(a: LecturerModel) => a.id.toString()}
          contentContainerStyle={styles.content}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={{ flex: 1, maxWidth: '50%' }}>
              <Lecturer onPress={this.viewLecturer} lecturer={item} />
            </View>
          )}
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
  content: {
    padding: 8,
  },
})

export default Lecturers
