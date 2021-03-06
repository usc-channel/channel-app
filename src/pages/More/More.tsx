import React from 'react'
import { Platform, ScrollView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'

import { Theme } from '@config'
import { getStatusBarHeight } from '@util'
import { Dispatch, Store, User } from '@types'
import { signOut } from '@actions'

import MoreListItem from './components/MoreListItem'
import MoreIcon from './components/MoreIcon'
import SignedInUser from './components/SignedInUser'
import SignedOutUser from './components/SignedOutUser'
import { Loading } from '@components'

interface ConnectedProps {
  loggedIn: boolean
  user: User
}

interface ConnectedDispatch {
  logout(): void
}

type OwnProps = NavigationScreenProps

type Props = ConnectedProps & ConnectedDispatch & OwnProps

interface State {
  modalShowing: boolean
}

class More extends React.Component<Props, State> {
  state = {
    modalShowing: false,
  }

  signIn = () => {
    this.props.navigation.navigate('signIn')
  }

  signOut = () => {
    this.setState({ modalShowing: true }, () => {
      setTimeout(() => {
        this.setState({ modalShowing: false })
        this.props.logout()
      }, 500)
    })
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
          {loggedIn && user ? <SignedInUser user={user} /> : <SignedOutUser />}

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

        <Loading visible={this.state.modalShowing} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(More)
