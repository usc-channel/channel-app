import React from 'react'
import { View } from 'react-native'
import LargePost from './LargePost.component'
import SmallPost from './SmallPost.component'

const PostPage = () => (
  <View style={{ backgroundColor: '#fff', flex: 1 }}>
    <LargePost onPress={() => alert('ue')} />
    <SmallPost onPress={() => alert('ue')} />
  </View>
)

export default PostPage
