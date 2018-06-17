import React from 'react'
import { Platform, ScrollView, StyleSheet, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { connect } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'

import { Theme } from '@config'
import { Dispatch, Store, User } from '@types'
import { signOut } from '@actions'

import MoreListItem from './components/MoreListItem'
import MoreIcon from './components/MoreIcon'
import SignedInUser from './components/SignedInUser'
import SignedOutUser from './components/SignedOutUser'

interface ConnectedProps {
  loggedIn: boolean
  user: User
}

interface ConnectedDispatch {
  logout(): void
}

type OwnProps = NavigationScreenProps

type Props = ConnectedProps & ConnectedDispatch & OwnProps

class More extends React.Component<Props> {
  viewProfile = () => {
    //
  }

  signIn = () => {
    this.props.navigation.navigate('signIn')
  }

  signOut = () => {
    this.props.logout()
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
          {loggedIn && user ? (
            <SignedInUser user={user} onPress={this.viewProfile} />
          ) : (
            <SignedOutUser onPress={this.signIn} />
          )}

          {loggedIn ? (
            <MoreListItem
              title="Sign Out"
              rightIcon={<MoreIcon name="ios-exit-outline" />}
              onPress={this.signOut}
            />
          ) : (
            <MoreListItem
              title="Sign In"
              rightIcon={<MoreIcon name="ios-lock-outline" />}
              onPress={this.signIn}
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => dispatch(signOut()),
})

export default connect(mapStateToProps, mapDispatchToProps)(More)
