import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import {
  FlatList,
  Keyboard,
  ListRenderItemInfo,
  Platform,
  View,
} from 'react-native'
import debounce from 'lodash.debounce'

import { SearchBar, SearchEmpty, SearchError } from '@components'
import { Theme } from '@config'
import { getStatusBarHeight } from '@util'
import Spinner from './Spinner'
import { PaginationInfo } from '@types'

interface ScreenParams {
  placeholder: string
  emptyMessage?: string
  errorMessage?: string
  newItem?: {
    message: string
    subtitle: string
    action(): void
  }
  keyExtractor(item: any): string
  renderItem(item: any, onSelect: () => void): React.ReactElement<any> | null
  getResults(
    search: string,
    skip?: number
  ): Promise<{
    data: {
      results: any[]
      pageInfo: PaginationInfo
    }
  }>
  onSelect(item: any): void
}

interface State {
  text: string
  loading: boolean
  data: any[]
  pageInfo: PaginationInfo | null
  errored: boolean
  fetchingMore: boolean
}

type Props = NavigationScreenProps<ScreenParams>

class SearchPosts extends React.Component<Props, State> {
  mounted: boolean

  constructor(props: Props) {
    super(props)

    this.state = {
      text: '',
      loading: false,
      data: [],
      pageInfo: null,
      errored: false,
      fetchingMore: false,
    }
  }

  componentDidMount() {
    this.mounted = true
    this.getResults = debounce(this.getResults, 500)
  }

  componentWillUnmount() {
    this.mounted = false
  }

  updateSearch = (text: string) => {
    const search = text.toLowerCase().trim()

    if (search.length === 0) {
      this.setState({
        text,
        data: [],
        errored: false,
        loading: false,
        fetchingMore: false,
      })
    } else {
      this.setState({ text, loading: true }, () => this.getResults(search))
    }
  }

  getResults = async (search: string, skip: number = 0) => {
    try {
      const {
        data: { results: data, pageInfo },
      } = await this.props.navigation.getParam('getResults')(search, skip)

      if (this.mounted) {
        this.setState({
          data,
          loading: false,
          errored: false,
          pageInfo,
        })
      }
    } catch {
      if (this.mounted) {
        this.setState({ loading: false, errored: true })
      }
    }
  }

  getMoreResults = async (skip: number = 0) => {
    try {
      const {
        data: { results: data, pageInfo },
      } = await this.props.navigation.getParam('getResults')(
        this.state.text,
        skip
      )

      if (this.mounted) {
        this.setState({
          data: [...this.state.data, ...data],
          fetchingMore: false,
          pageInfo,
        })
      }
    } catch {
      if (this.mounted) {
        this.setState({ errored: true, fetchingMore: false })
      }
    }
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
          borderBottomColor: 'rgba(0,0,0,.12)',
          borderBottomWidth:
            Platform.Version < 21 && Platform.OS === 'android' ? 1 : 0,
          elevation: 2,
        }}
        textStyle={{
          fontSize: 16,
          fontFamily: Theme.fonts.regular,
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
    const text = this.state.text.trim()

    return (
      text.length > 0 && this.state.data.length === 0 && !this.state.loading
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

  fetchMore = () => {
    const { fetchingMore, pageInfo } = this.state

    if (!fetchingMore && pageInfo && pageInfo.nextSkip) {
      this.setState({ fetchingMore: true }, () => {
        setTimeout(() => {
          this.getMoreResults(this.state.pageInfo!.nextSkip)
        }, Theme.refreshTimeout)
      })
    }
  }

  renderContent = () => {
    const errorMessage = this.props.navigation.getParam('errorMessage')
    const newItem = this.props.navigation.getParam('newItem')
    const emptyMessage = this.props.navigation.getParam('emptyMessage')

    const { fetchingMore, loading, errored } = this.state

    if (loading) {
      return <Spinner />
    }

    if (errored && errorMessage) {
      return <SearchError message={errorMessage} />
    }

    if (this.isEmpty()) {
      return (
        <SearchEmpty
          search={this.state.text}
          message={emptyMessage}
          newItem={newItem}
        />
      )
    }

    return (
      <FlatList
        keyboardShouldPersistTaps="always"
        data={this.state.data}
        keyExtractor={this.props.navigation.getParam('keyExtractor')}
        renderItem={this.renderItem}
        onMomentumScrollBegin={() => Keyboard.dismiss()}
        ListFooterComponent={fetchingMore ? <Spinner /> : null}
        onEndReached={this.fetchMore}
      />
    )
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

        {this.renderContent()}
      </View>
    )
  }
}

export default SearchPosts
