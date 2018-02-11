import React from 'react'
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  View,
} from 'react-native'
import SmallPost from './SmallPost.component'
import { Post } from '@types'
import LargePost from './LargePost.component'

interface Props {
  featuredPosts: Post[]
  otherPosts: Post[]
  fetching: boolean
  onEndReached(): void
}

class PostPage extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return (
      this.props.otherPosts.length !== nextProps.otherPosts.length ||
      this.props.fetching !== nextProps.fetching
    )
  }

  renderItem = ({ item }: ListRenderItemInfo<Post>) => (
    <SmallPost post={item} onPress={() => alert('ue')} />
  )

  render() {
    return (
      <View>
        <FlatList
          data={this.props.otherPosts.filter(
            a => a.postId !== this.props.featuredPosts[0].postId
          )}
          initialNumToRender={4}
          renderItem={this.renderItem}
          keyExtractor={(a: Post) => a.id}
          onEndReached={this.props.onEndReached}
          onEndReachedThreshold={1}
          ListHeaderComponent={() =>
            this.props.featuredPosts.length > 0 ? (
              <LargePost
                post={this.props.featuredPosts[0]}
                onPress={() => alert('ue')}
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
      </View>
    )
  }
}

export default PostPage
