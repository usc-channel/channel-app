import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Author, Touchable } from '@components'
import { Post } from '@types'
import FastImage from 'react-native-fast-image'

interface Props {
  post: Post
  onPress(): void
}

const LargePost: React.SFC<Props> = ({ post, onPress }) => (
  <Touchable onPress={onPress}>
    <View style={styles.container}>
      <FastImage
        source={{
          uri: post.featuredImage.guid,
        }}
        style={styles.image}
      />

      <Text style={styles.title}>{post.title}</Text>

      {!!post.excerpt && (
        <Text style={styles.excerpt} numberOfLines={1}>
          {post.excerpt}
        </Text>
      )}

      <Author
        author={post.author}
        date={post.date}
        categories={post.categories}
      />
    </View>
  </Touchable>
)

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,.12)',
  },
  image: {
    height: 184,
    marginBottom: 14,
    borderRadius: 4,
  },
  title: {
    fontSize: 20,
    fontFamily: 'NunitoSans-Bold',
  },
  excerpt: {
    color: 'rgba(0,0,0,.54)',
    marginBottom: 13,
    fontFamily: 'NunitoSans-Regular',
  },
})

export default LargePost
