import React from 'react'
import { NavigationScreenProps, HeaderBackButton } from 'react-navigation'
import { View, SafeAreaView, Platform, StatusBar, Keyboard } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { SearchBar } from '@components'

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
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar barStyle="dark-content" />
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
              value={this.state.text}
              onChangeText={text => this.setState({ text })}
            />
          </View>
        </Header>
      </View>
    )
  }
}

export default SearchPosts
