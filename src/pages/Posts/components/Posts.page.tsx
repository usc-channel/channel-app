import React from 'react'
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  ListRenderItemInfo,
  View,
} from 'react-native'
import SmallPost from './SmallPost.component'
import { Post } from '@types'
import LargePost from './LargePost.component'

interface Props {
  displayFeatured?: boolean
  featuredPosts?: Post[]
  otherPosts: Post[]
  fetching: boolean
  onEndReached(): void
  viewPost(post: Post): void
}

class PostPage extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return (
      this.props.otherPosts.length !== nextProps.otherPosts.length ||
      this.props.fetching !== nextProps.fetching ||
      this.props.displayFeatured !== nextProps.displayFeatured
    )
  }

  renderItem = ({ item }: ListRenderItemInfo<Post>) => (
    <SmallPost post={item} onPress={() => this.props.viewPost(item)} />
  )

  render() {
    return (
      <FlatList
        data={
          this.props.displayFeatured
            ? this.props.otherPosts.filter(
                a => a.postId !== this.props.featuredPosts![0].postId
              )
            : this.props.otherPosts
        }
        initialNumToRender={4}
        renderItem={this.renderItem}
        keyExtractor={(a: Post) => a.id}
        onEndReached={this.props.onEndReached}
        contentContainerStyle={{ marginBottom: 30 }}
        onEndReachedThreshold={1}
        keyboardShouldPersistTaps="always"
        onScroll={() => Keyboard.dismiss()}
        ListHeaderComponent={() =>
          this.props.displayFeatured && this.props.featuredPosts!.length > 0 ? (
            <LargePost
              post={this.props.featuredPosts![0]}
              onPress={() => this.props.viewPost(this.props.featuredPosts![0])}
            />
          ) : (
            <View />
          )
        }
        ListFooterComponent={() =>
          this.props.fetching ? (
            <ActivityIndicator style={{ paddingVertical: 16 }} />
          ) : (
            <View />
          )
        }
      />
    )
  }
}

export default PostPage
