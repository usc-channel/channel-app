import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { Platform, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import AndroidSearchBar from 'react-native-material-design-searchbar'
import debounce from 'lodash.debounce'

import { PageInfo, Post } from '@types'
import { SearchEmpty } from '@components'
import { graphqlClient, Theme } from '@config'
import { postsTransform, searchQuery } from '../../graphql'
import PostList from '../Posts/components/PostList'

interface State {
  text: string
  loading: boolean
  posts: Post[]
  pageInfo: PageInfo | null
}

type Props = NavigationScreenProps<{}>

class SearchPosts extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      text: '',
      loading: false,
      posts: [],
      pageInfo: null,
    }

    this.getResults = debounce(this.getResults, 500)
  }

  updateSearch = (text: string) => {
    const search = text.toLowerCase().trim()

    if (search.length === 0) {
      this.setState({ text, posts: [] })
    } else {
      this.setState({ text, loading: true }, () => this.getResults(search))
    }
  }

  getResults = (search: string) => {
    graphqlClient
      .query({
        query: searchQuery,
        variables: {
          after: '',
          search,
        },
      })
      .then(({ data }: any) => {
        const posts = postsTransform(data!.posts)

        this.setState({
          loading: false,
          posts: search.length === 0 ? [] : posts,
          pageInfo: data.posts.pageInfo,
        })
      })
  }

  renderSearch = () => {
    const Bar = (
      <AndroidSearchBar
        onSearchChange={this.updateSearch}
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
          elevation: 2,
        }}
        textStyle={{
          fontSize: 16,
          fontFamily: 'NunitoSans-Regular',
        }}
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

  viewPost = (post: Post) => {
    this.props.navigation.navigate('viewPost', { post })
  }

  fetchMore = () => {
    if (
      this.state.pageInfo &&
      this.state.pageInfo!.hasNextPage &&
      !this.state.loading
    ) {
      this.setState({ loading: true }, () => {
        graphqlClient
          .query({
            query: searchQuery,
            variables: {
              after: this.state.pageInfo!.endCursor,
              search: this.state.text,
            },
          })
          .then(({ data }: any) => {
            const posts = postsTransform(data!.posts)

            if (!this.state.loading) {
              this.setState({
                pageInfo: data.posts.pageInfo,
                loading: false,
                posts: [...this.state.posts, ...posts],
              })
            }
          })
      })
    }
  }

  isEmpty = () => {
    return (
      this.state.text.length > 0 &&
      this.state.posts.length === 0 &&
      !this.state.loading
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

        {this.isEmpty() ? (
          <SearchEmpty search={this.state.text} />
        ) : (
          <PostList
            otherPosts={this.state.posts}
            viewPost={this.viewPost}
            fetching={this.state.loading}
            onEndReached={this.fetchMore}
          />
        )}
      </View>
    )
  }
}

export default SearchPosts
