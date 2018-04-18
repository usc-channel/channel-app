import React from 'react'
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import SearchBar from 'react-native-material-design-searchbar'
import { NavigationScreenProps } from 'react-navigation'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'

import { API, Theme } from '@config'
import { Lecturer as LecturerModel, Store } from '@types'
import { SearchEmpty } from '@components'
import Lecturer from './components/Lecturer'

type OwnProps = NavigationScreenProps<{}>

interface StateProps {
  loggedIn: boolean
}

type Props = StateProps & OwnProps

interface State {
  loading: boolean
  refreshing: boolean
  search: string
  lecturers: LecturerModel[]
}

class Lecturers extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      loading: false,
      refreshing: false,
      search: '',
      lecturers: [],
    }
  }

  componentDidMount() {
    this.setState({ loading: true }, this.getLecturers)
  }

  getLecturers = async () => {
    try {
      const request = await fetch(`${API}/lecturers`)
      const lecturers = await request.json()

      this.setState({
        lecturers,
        loading: false,
        refreshing: false,
      })
    } catch (e) {
      // TODO: Display error screen
    }
  }

  updateSearch = (search: string) => {
    this.setState({ search })
  }

  addReview = () => {
    if (this.props.loggedIn) {
      this.props.navigation.navigate('newReview', { mode: 'all' })
    } else {
      alert('You need an account')
    }
  }

  viewLecturer = (lecturer: LecturerModel) => {
    this.props.navigation.navigate('viewLecturer', { lecturer })
  }

  filterLecturers = () => {
    if (this.state.search === '') {
      return this.state.lecturers
    }

    return this.state.lecturers.filter(a =>
      a.name.toLowerCase().includes(this.state.search.toLowerCase())
    )
  }

  onRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.getLecturers()
    })
  }

  render() {
    const lecturers = this.filterLecturers()
    const { loading, refreshing } = this.state

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && (
          <View
            style={{
              paddingTop: getStatusBarHeight(),
              backgroundColor: Theme.primary,
            }}
          />
        )}

        <SearchBar
          onSearchChange={this.updateSearch}
          onBlur={() => this.updateSearch('')}
          height={50}
          padding={0}
          placeholder="Search lecturer"
          autoCorrect={false}
          returnKeyType={'search'}
          inputProps={{ value: this.state.search }}
          inputStyle={{
            backgroundColor: '#fff',
            borderWidth: 0,
            borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
            borderBottomColor: 'rgba(0,0,0,.12)',
            elevation: 2,
          }}
          textStyle={{
            fontSize: 16,
            fontFamily: 'NunitoSans-Regular',
          }}
        />

        {loading ? (
          <ActivityIndicator style={{ margin: 16 }} />
        ) : lecturers.length > 0 ? (
          <View style={{ flex: 1 }}>
            <FlatList
              data={lecturers}
              keyExtractor={(a: LecturerModel) => a.id.toString()}
              contentContainerStyle={styles.content}
              numColumns={2}
              refreshing={refreshing}
              onRefresh={this.getLecturers}
              renderItem={({ item }) => (
                <View style={{ flex: 1, maxWidth: '50%' }}>
                  <Lecturer onPress={this.viewLecturer} lecturer={item} />
                </View>
              )}
            />

            <Icon
              component={TouchableOpacity}
              name="star"
              color="#fff"
              size={24}
              raised
              iconStyle={{ fontSize: 20 }}
              containerStyle={{
                backgroundColor: Theme.accent,
                marginRight: 0,
                position: 'absolute',
                bottom: 20,
                right: 16,
              }}
              onPress={this.addReview}
            />
          </View>
        ) : (
          <SearchEmpty search={this.state.search} />
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
  content: {
    padding: 8,
  },
})

const mapStateToProps = ({ userState }: Store) => ({
  loggedIn: !!userState.user,
})

export default connect(mapStateToProps)(Lecturers)
