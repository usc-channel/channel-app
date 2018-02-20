import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { graphqlClient, Theme } from '@config'
import { NavigationScreenProps } from 'react-navigation'
import Collapsible from 'react-native-collapsible'
import { NavIcon } from '@components'
import React from 'react'
import {
  filteredPostsQuery,
  postsCategoriesQuery,
  postsQuery,
  postsTransform,
} from '../../graphql'
import { ChildProps, graphql } from 'react-apollo'
import { Category, GraphPost, PageInfo, Post } from '@types'
import PostPage from './components/Posts.page'
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
}

type OwnProps = NavigationScreenProps<ScreenProps>
type Props = ChildProps<OwnProps, GraphProps>

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

  constructor(props: Props) {
    super(props)

    this.state = {
      filterStatus: 'NO FILTERS ACTIVE',
      selectedCategories: [],
      filterToggled: false,
      initialLoad: false,
      pageInfo: null,
      fetchingMore: false,
      featured: [],
      other: [],
      categories: [],
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

  onSearch = () => {
    this.props.navigation.navigate('searchPosts')
  }

  onFilter = () => {
    this.setState({ filterToggled: !this.state.filterToggled })
  }

  viewPost = (post: Post) => {
    this.props.navigation.navigate('viewPost', { post })
  }

  loadMore = () => {
    if (this.state.pageInfo!.hasNextPage && !this.state.fetchingMore) {
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
            })
          })
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

  render() {
    if (this.props.data!.error) {
      return <Text>Error</Text>
    }

    if (this.props.data!.loading) {
      return (
        <View style={{ paddingTop: 16, flex: 1, backgroundColor: '#fff' }}>
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

        <PostPage
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
      data: { ...returnData, error: data!.error, loading: data!.loading },
    }
  },
})

export default withPosts(Posts)
