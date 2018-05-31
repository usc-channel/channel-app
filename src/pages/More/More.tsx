import React from 'react'
import { Platform, ScrollView, StyleSheet, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { connect } from 'react-redux'

import { Theme } from '@config'
import { Store, User } from '@types'

import MoreListItem from './components/MoreListItem'
import MoreIcon from './components/MoreIcon'
import LoggedInUser from './components/LoggedInUser'
import LoggedOutUser from './components/LoggedOutUser'

interface ConnectedProps {
  loggedIn: boolean
  user: User
}

type Props = ConnectedProps

class More extends React.Component<Props> {
  viewProfile = () => {
    //
  }

  login = () => {
    //
  }

  logout = () => {
    //
  }

  render() {
    const { loggedIn, user } = this.props

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

        <ScrollView contentContainerStyle={styles.content}>
          {loggedIn ? (
            <LoggedInUser user={user} onPress={this.viewProfile} />
          ) : (
            <LoggedOutUser onPress={this.login} />
          )}

          {loggedIn ? (
            <MoreListItem
              title="Logout"
              rightIcon={<MoreIcon name="ios-exit-outline" />}
              onPress={this.logout}
            />
          ) : (
            <MoreListItem
              title="Login"
              rightIcon={<MoreIcon name="ios-lock-outline" />}
              onPress={this.login}
            />
          )}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
})

const mapStateToProps = ({ userState }: Store) => ({
  loggedIn: !!userState.user,
  user: userState.user,
})

export default connect(mapStateToProps)(More)
