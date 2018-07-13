import React from 'react'
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'

import { API, Theme } from '@config'
import { Lecturer as LecturerModel, Store } from '@types'
import { NavIcon } from '@components'
import Lecturer from './components/Lecturer'
import NoReviews from './components/NoReviews'

interface ScreenProps {
  onSearch(): VoidFunction
}

type OwnProps = NavigationScreenProps<{}>

interface ConnectedProps {
  loggedIn: boolean
}

type Props = ConnectedProps & OwnProps

interface State {
  loading: boolean
  refreshing: boolean
  search: string
  lecturers: LecturerModel[]
}

class Lecturers extends React.Component<Props, State> {
  static navigationOptions = ({
    navigation,
  }: NavigationScreenProps<ScreenProps>) => {
    const onSearch = navigation.getParam('onSearch')

    return {
      title: 'Reviews',
      headerRight: (
        <NavIcon
          iconName={Platform.OS === 'android' ? 'search' : 'ios-search-outline'}
          onPress={onSearch}
        />
      ),
    }
  }

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
    this.props.navigation.setParams({
      onSearch: this.onSearch,
    })

    this.setState({ loading: true }, this.getLecturers)
  }

  onSearch = () => {
    // TODO: Navigate to search screen
  }

  getLecturers = async () => {
    try {
      const request = await fetch(`${API}/lecturers_reviews`)
      const lecturers = await request.json()

      this.setState({ lecturers, loading: false })
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e)
      // TODO: Show error message
    }
  }

  addReview = () => {
    if (this.props.loggedIn) {
      this.props.navigation.navigate('newReview', { mode: 'all' })
    } else {
      this.props.navigation.navigate('signIn')
    }
  }

  viewLecturer = (lecturer: LecturerModel) => {
    this.props.navigation.navigate('viewLecturer', { lecturer })
  }

  onRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.getLecturers()
    })
  }

  render() {
    const { loading, refreshing, lecturers } = this.state

    return (
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator style={{ margin: 16 }} />
        ) : (
          <View style={{ flex: 1 }}>
            {lecturers.length === 0 ? (
              <NoReviews />
            ) : (
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
            )}

            <Icon
              component={TouchableOpacity}
              name="star"
              color={Theme.accent}
              size={24}
              raised
              iconStyle={{ fontSize: 20 }}
              containerStyle={{
                marginRight: 0,
                position: 'absolute',
                bottom: 20,
                right: 16,
              }}
              reverse
              onPress={this.addReview}
            />
          </View>
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
