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

import { Theme } from '@config'
import { Dispatch, Lecturer, LecturersState, Store } from '@types'
import { Empty, Error, NavIcon } from '@components'
import LecturerCard from './components/LecturerCard'
import { getLecturers } from '@actions'

interface ScreenProps {
  onSearch(): VoidFunction
}

type OwnProps = NavigationScreenProps<{}>

interface ConnectedProps {
  lecturers: LecturersState
  loggedIn: boolean
}

interface ConnectedDispatch {
  getLecturers(refresh?: boolean): void
}

type Props = ConnectedProps & ConnectedDispatch & OwnProps

interface State {
  search: string
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
      search: '',
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onSearch: this.onSearch,
    })

    this.props.getLecturers()
  }

  onSearch = () => {
    this.props.navigation.push('searchReviews')
  }

  refresh = () => {
    this.props.getLecturers(true)
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

  render() {
    const { error, loading, data: lecturers } = this.props.lecturers

    return (
      <View style={styles.container}>
        {loading === 'fetch' && <ActivityIndicator style={{ margin: 16 }} />}
        {error && (
          <Error
            message="There's been a problem getting the latest reviews."
            action={{ message: 'Try again?', callback: this.refresh }}
            loading={loading === 'refresh'}
          />
        )}

        {!loading &&
          !error && (
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
                  refreshing={loading === 'refresh'}
                  onRefresh={this.refresh}
                  renderItem={({ item }) => (
                    <View style={{ flex: 1, maxWidth: '50%' }}>
                      <LecturerCard
                        onPress={this.viewLecturer}
                        lecturer={item}
                      />
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

const mapStateToProps = ({ userState, lecturers }: Store) => ({
  loggedIn: !!userState.user,
  lecturers,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getLecturers: (refresh?: boolean) => dispatch(getLecturers(refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reviews)
