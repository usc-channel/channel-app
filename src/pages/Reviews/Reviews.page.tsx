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
import { Lecturer, Store } from '@types'
import { Empty, Error, NavIcon } from '@components'
import LecturerCard from './components/LecturerCard'

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
  error: boolean
  lecturers: Lecturer[]
}

class Reviews extends React.Component<Props, State> {
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
      loading: true,
      refreshing: false,
      search: '',
      lecturers: [],
      error: false,
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onSearch: this.onSearch,
    })

    this.getLecturers()
  }

  onSearch = () => {
    this.props.navigation.push('searchReviews')
  }

  getLecturers = async () => {
    try {
      const request = await fetch(`${API}/lecturers_reviews`)
      const lecturers = await request.json()

      this.setState({
        lecturers,
        loading: false,
        refreshing: false,
        error: false,
      })
    } catch (e) {
      this.setState({ loading: false, error: true, refreshing: false })
    }
  }

  refresh = () => {
    this.setState({ refreshing: true }, () => {
      setTimeout(() => {
        this.getLecturers()
      }, 1000)
    })
  }

  addReview = () => {
    if (this.props.loggedIn) {
      this.props.navigation.navigate('newReview', { mode: 'all' })
    } else {
      this.props.navigation.navigate('signIn')
    }
  }

  viewLecturer = (lecturer: Lecturer) => {
    this.props.navigation.navigate('viewLecturer', { lecturer })
  }

  onRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.getLecturers()
    })
  }

  render() {
    const { error, loading, refreshing, lecturers } = this.state

    return (
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator style={{ margin: 16 }} />
        ) : error ? (
          <Error
            message="There's been a problem getting the latest reviews."
            action={{ message: 'Try again?', callback: this.refresh }}
            loading={refreshing}
          />
        ) : (
          <View style={{ flex: 1 }}>
            {lecturers.length === 0 ? (
              <Empty
                image={require('../../assets/chat.png')}
                title="No Reviews"
                message="As reviews are added for courses they’ll appear here."
              />
            ) : (
              <FlatList
                data={lecturers}
                keyExtractor={(a: Lecturer) => a.id.toString()}
                contentContainerStyle={styles.content}
                numColumns={2}
                refreshing={refreshing}
                onRefresh={this.getLecturers}
                renderItem={({ item }) => (
                  <View style={{ flex: 1, maxWidth: '50%' }}>
                    <LecturerCard onPress={this.viewLecturer} lecturer={item} />
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

export default connect(mapStateToProps)(Reviews)
