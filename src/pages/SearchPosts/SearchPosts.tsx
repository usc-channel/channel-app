import React from 'react'
import { HeaderBackButton, NavigationScreenProps } from 'react-navigation'
import { Keyboard, Platform, SafeAreaView, StatusBar, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { SearchBar } from '@components'
import AndroidSearchBar from 'react-native-material-design-searchbar'

interface State {
  text: string
}

type Props = NavigationScreenProps<{}>

class SearchPosts extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      text: '',
    }
  }

  render() {
    const Header = Platform.OS === 'ios' ? SafeAreaView : View

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Platform.OS === 'ios' ? '#fff' : '#EEEEEE',
        }}
      >
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        {Platform.OS === 'ios' ? (
          <Header
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: getStatusBarHeight(),
            }}
          >
            <HeaderBackButton
              onPress={() => {
                Keyboard.dismiss()
                this.props.navigation.goBack()
              }}
              tintColor="#565656"
            />

            <View style={{ flex: 1, marginLeft: -8 }}>
              <SearchBar
                autoFocus
                placeholder="Search the Channel"
                value={this.state.text}
                onChangeText={text => this.setState({ text })}
              />
            </View>
          </Header>
        ) : (
          <View style={{ elevation: 5 }}>
            <AndroidSearchBar
              onSearchChange={text => this.setState({ text })}
              height={50}
              padding={0}
              placeholder="Search the Channel"
              autoCorrect={false}
              returnKeyType={'search'}
              alwaysShowBackButton
              onBackPress={this.props.navigation.goBack}
              inputProps={{ autoFocus: true }}
              inputStyle={{
                backgroundColor: '#fff',
                borderWidth: 0,
              }}
              textStyle={{
                fontSize: 16,
                fontFamily: 'NunitoSans-Regular',
              }}
            />
          </View>
        )}
      </View>
    )
  }
}

export default SearchPosts
