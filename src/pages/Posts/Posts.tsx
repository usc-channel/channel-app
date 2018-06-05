import React from 'react'
import {
  ActivityIndicator,
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import Collapsible from 'react-native-collapsible'
import { ChildProps, graphql, QueryProps } from 'react-apollo'
import DropdownAlert from 'react-native-dropdownalert'
import { connect } from 'react-redux'

import { graphqlClient, Theme } from '@config'
import { NavIcon, Offline } from '@components'
import {
  filteredPostsQuery,
  postsCategoriesQuery,
  postsQuery,
  postsTransform,
} from '../../graphql'
import { Category, GraphPost, PageInfo, Post, Store } from '@types'
import PostList from './components/PostList'
import CategoryFilter from './components/CategoryFilter'

interface GraphProps {
  categories: Category[]
  other: Post[]
  featured: Post[]
  pageInfo: PageInfo
}

interface ScreenProps {
  onSearch(): void
  onFilter(): void
}

interface State {
  filterToggled: boolean
  initialLoad: boolean
  fetchingMore: boolean
  filterStatus: string
  pageInfo: PageInfo | null
  categories: Category[]
  selectedCategories: number[]
  featured: Post[]
  other: Post[]
  retrying: boolean
  retryingMessage: string
  error: {} | undefined | null
  loading: boolean | null
}

interface ConnectedProps {
  isConnected: boolean
}

type OwnProps = NavigationScreenProps<ScreenProps>

type Props = ChildProps<OwnProps, GraphProps> & ConnectedProps

class Posts extends React.Component<Props, State> {
  static navigationOptions = ({
    navigation,
  }: NavigationScreenProps<ScreenProps>) => {
    const params = navigation.state.params || {}

    return {
      headerLeft: (
        <Image
          source={require('../../assets/logo-complete.png')}
          style={{
            height: 36,
            width: 128,
            marginLeft: 16,
          }}
          resizeMode="contain"
        />
      ),
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <NavIcon
            iconName={
              Platform.OS === 'android' ? 'search' : 'ios-search-outline'
            }
            onPress={params.onSearch}
          />
          <NavIcon
            iconName={
              Platform.OS === 'android' ? 'filter-list' : 'ios-options-outline'
            }
            onPress={params.onFilter}
          />
        </View>
      ),
    }
  }

  alert: DropdownAlert

  constructor(props: Props) {
    super(props)

    this.state = {
      filterStatus: 'NO FILTERS ACTIVE',
      selectedCategories: [],
      filterToggled: false,
      initialLoad: false,
      pageInfo: null,
      fetchingMore: false,
      retrying: false,
      featured: [],
      other: [],
      categories: [],
      retryingMessage: 'Try again',
      error: null,
      loading: null,
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({
      onSearch: this.onSearch,
      onFilter: this.onFilter,
    })
  }

  componentDidUpdate() {
    const { pageInfo, featured, other, categories } = this.props.data!

    if (
      pageInfo &&
      featured &&
      other &&
      categories &&
      !this.state.initialLoad
    ) {
      this.setState({
        initialLoad: true,
        featured,
        other,
        pageInfo,
        categories,
      })
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.data!.loading !== this.state.loading) {
      this.setState({ loading: nextProps.data!.loading })
    }

    if (nextProps.data!.error !== this.state.error) {
      this.setState({ error: nextProps.data!.error })
    }
  }

  onSearch = () => {
    if (this.props.isConnected && !this.state.error) {
      this.props.navigation.navigate('searchPosts')
    } else {
      this.alert.alertWithType(
        'error',
        'No Connection',
        'Cannot search while offline.'
      )
    }
  }

  onFilter = () => {
    if (this.props.isConnected && !this.state.error) {
      this.setState({ filterToggled: !this.state.filterToggled })
    } else {
      this.alert.alertWithType(
        'error',
        'No Connection',
        'Cannot filter while offline.'
      )
    }
  }

  viewPost = (post: Post) => {
    this.props.navigation.push('viewPost', { post })
  }

  loadMore = () => {
    if (!this.props.isConnected) {
      this.alert.alertWithType(
        'error',
        'No Connection',
        'Cannot load more posts while offline.'
      )
    } else if (
      this.props.isConnected &&
      this.state.pageInfo!.hasNextPage &&
      !this.state.fetchingMore
    ) {
      this.setState({ fetchingMore: true }, () => {
        graphqlClient
          .query({
            query:
              this.state.selectedCategories.length > 0
                ? filteredPostsQuery
                : postsQuery,
            variables: {
              after: this.state.pageInfo!.endCursor,
              categoryIn: this.state.selectedCategories,
            },
          })
          .then(({ data }: any) => {
            const other = postsTransform(data!.posts)

            this.setState({
              other: [...this.state.other, ...other],
              pageInfo: data.posts.pageInfo,
              fetchingMore: false,
              loading: false,
            })
          })
          .catch(console.error)
      })
    }
  }

  filterPosts = (selectedCategories: number[]) => {
    this.setState(
      {
        selectedCategories,
        filterToggled: false,
        fetchingMore: true,
        filterStatus: 'APPLYING FILTERS...',
      },
      () => {
        graphqlClient
          .query({
            query: filteredPostsQuery,
            variables: {
              after: '',
              categoryIn: selectedCategories,
            },
          })
          .then(({ data }: any) => {
            const other = postsTransform(data!.posts)

            this.setState({
              other,
              pageInfo: data.posts.pageInfo,
              fetchingMore: false,
              filterStatus:
                selectedCategories.length > 0
                  ? 'FILTERS ACTIVE'
                  : 'NO FILTERS ACTIVE',
            })
          })
      }
    )
  }

  retryOffline = () => {
    this.setState({ retrying: true }, () => {
      this.props.data!
        .refetch()
        .then(({ data }) => {
          const response = postCategoriesResolver(data).data

          this.setState({
            retrying: false,
            retryingMessage: 'Try again',
            error: null,
            categories: response!.categories!,
            featured: response!.featured!,
            other: response!.other!,
            pageInfo: response!.pageInfo!,
          })
        })
        .catch(() => {
          this.setState({
            retrying: false,
            retryingMessage: 'Still offline, Try again',
          })
        })
    })
  }

  offlineAlert = () => (
    <DropdownAlert
      ref={(ref: DropdownAlert) => (this.alert = ref)}
      zIndex={3}
      defaultContainer={{ paddingTop: 0, paddingHorizontal: 15 }}
      updateStatusBar={false}
      useNativeDriver
      showCancel
      closeInterval={3000}
      renderCancel={() =>
        this.props.isConnected && (
          <Button title="Retry" color="#fff" onPress={this.retryOffline} />
        )
      }
    />
  )

  render() {
    if (this.state.error || !this.props.isConnected) {
      return (
        <View style={{ flex: 1 }}>
          {this.offlineAlert()}

          <Offline
            action={this.retryOffline}
            retrying={this.state.retrying}
            message={this.state.retryingMessage}
          />
        </View>
      )
    }

    if (this.state.loading) {
      return (
        <View style={{ paddingTop: 15, flex: 1, backgroundColor: '#fff' }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.filterBar}>{this.state.filterStatus}</Text>
        <Collapsible collapsed={!this.state.filterToggled}>
          <CategoryFilter
            categories={this.state.categories}
            selectedCategories={this.state.selectedCategories}
            updateSelectedCategories={this.filterPosts}
          />
        </Collapsible>

        <PostList
          displayFeatured={this.state.selectedCategories.length === 0}
          featuredPosts={this.state.featured}
          otherPosts={this.state.other}
          onEndReached={this.loadMore}
          fetching={this.state.fetchingMore}
          viewPost={this.viewPost}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  filterBar: {
    backgroundColor: Theme.accent,
    color: '#fff',
    paddingVertical: 8,
    fontFamily: 'NunitoSans-SemiBold',
    textAlign: 'center',
  },
})

interface Response {
  categories: {
    edges: Array<{
      node: Category
    }>
  }
  featured: {
    edges: Array<{ node: GraphPost }>
  }
  other: {
    edges: Array<{ node: GraphPost }>
    pageInfo: PageInfo
  }
}

const withPosts = graphql<Response, any, OwnProps>(postsCategoriesQuery, {
  props: ({ data }) => {
    return postCategoriesResolver(data as any)
  },
})

const postCategoriesResolver = (
  data: QueryProps & Response
): ChildProps<{}, GraphProps> => {
  let returnData = {}

  if (data!.categories) {
    returnData = {
      ...returnData,
      categories: data!.categories!.edges.map(a => a.node),
    }
  }

  if (data!.featured && data!.other) {
    returnData = {
      ...returnData,
      other: postsTransform(data!.other),
      featured: postsTransform(data!.featured),
      pageInfo: data!.other.pageInfo,
    }
  }

  return {
    data: {
      ...returnData,
      error: data!.error,
      loading: data!.loading,
      refetch: data!.refetch,
    } as any,
  }
}

const mapStateToProps = (state: Store) => ({
  isConnected: state.network.isConnected,
})

export default withPosts(connect(mapStateToProps)(Posts))
