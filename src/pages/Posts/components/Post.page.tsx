import React from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'
import SmallPost from './SmallPost.component'
import { Post } from '@types'

interface Props {
  posts: Post[]
}

class PostPage extends React.PureComponent<Props> {
  renderItem = ({ item }: ListRenderItemInfo<Post>) => (
    <SmallPost post={item} onPress={() => alert('ue')} />
  )

  render() {
    return (
      <FlatList
        data={this.props.posts}
        renderItem={this.renderItem}
        keyExtractor={(a: Post) => a.id}
      />
    )
  }
}

export default PostPage
