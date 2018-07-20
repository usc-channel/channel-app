import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  ListRenderItemInfo,
  Platform,
  View,
} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import debounce from 'lodash.debounce'

import { SearchBar, SearchEmpty } from '@components'
import { Theme } from '@config'

interface ScreenParams {
  placeholder: string
  keyExtractor(item: any): string
  renderItem(item: any, onSelect: () => void): React.ReactElement<any> | null
  getResults(search: string): Promise<any[]>
  onSelect(item: any): void
}

interface State {
  text: string
  loading: boolean
  data: any[]
}

type Props = NavigationScreenProps<ScreenParams>

class SearchPosts extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      text: '',
      loading: false,
      data: [],
    }

    this.getResults = debounce(this.getResults, 500)
  }

  updateSearch = (text: string) => {
    const search = text.toLowerCase().trim()

    if (search.length === 0) {
      this.setState({ text, data: [] })
    } else {
      this.setState({ text, loading: true }, () => this.getResults(search))
    }
  }

  getResults = async (search: string) => {
    const data = await this.props.navigation.getParam('getResults')(search)
    this.setState({ loading: false, data })
  }

  renderSearch = () => {
    const placeholder = this.props.navigation.getParam('placeholder')

    const Bar = (
      <SearchBar
        onSearchChange={this.updateSearch}
        height={50}
        padding={0}
        placeholder={placeholder}
        autoCorrect={false}
        returnKeyType={'search'}
        alwaysShowBackButton
        onBackPress={this.props.navigation.goBack}
        inputProps={{ autoFocus: true }}
        inputStyle={{
          backgroundColor: '#fff',
          borderWidth: 0,
          elevation: 2,
        }}
        textStyle={{
          fontSize: 16,
          fontFamily: 'NunitoSans-Regular',
        }}
        value={this.state.text}
      />
    )

    return Platform.OS === 'ios' ? (
      <View
        style={{
          shadowColor: '#D2D2D2',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          paddingTop: getStatusBarHeight(),
          backgroundColor: Theme.primary,
          zIndex: 2,
        }}
      >
        {Bar}
      </View>
    ) : (
      Bar
    )
  }

  isEmpty = () => {
    return (
      this.state.text.length > 0 &&
      this.state.data.length === 0 &&
      !this.state.loading
    )
  }

  onSelect = () => {
    Keyboard.dismiss()
    this.props.navigation.goBack()
  }

  renderItem = ({ item }: ListRenderItemInfo<any>) => {
    const renderItem = this.props.navigation.getParam('renderItem')
    return renderItem(item, this.onSelect)
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#EEEEEE',
        }}
      >
        {this.renderSearch()}

        {this.state.loading && (
          <ActivityIndicator style={{ marginVertical: 15 }} />
        )}

        {this.isEmpty() ? (
          <SearchEmpty search={this.state.text} />
        ) : (
          <FlatList
            keyboardShouldPersistTaps="always"
            data={this.state.data}
            keyExtractor={this.props.navigation.getParam('keyExtractor')}
            renderItem={this.renderItem}
          />
        )}
      </View>
    )
  }
}

export default SearchPosts
