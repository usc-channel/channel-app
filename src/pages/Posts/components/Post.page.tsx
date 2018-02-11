import React from 'react'
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  View,
} from 'react-native'
import SmallPost from './SmallPost.component'
import { Post } from '@types'
import { Theme } from '@config'

interface Props {
  posts: Post[]
  fetching: boolean
  onEndReached(): void
}

class PostPage extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return (
      this.props.posts.length !== nextProps.posts.length ||
      this.props.fetching !== nextProps.fetching
    )
  }

  renderItem = ({ item }: ListRenderItemInfo<Post>) => (
    <SmallPost post={item} onPress={() => alert('ue')} />
  )

  render() {
    return (
      <FlatList
        data={this.props.posts}
        initialNumToRender={4}
        renderItem={this.renderItem}
        keyExtractor={(a: Post) => a.id}
        onEndReached={this.props.onEndReached}
        onEndReachedThreshold={1}
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
