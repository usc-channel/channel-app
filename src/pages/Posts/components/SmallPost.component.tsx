import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Author, Touchable } from '@components'
import { Post } from '@types'
import { decode } from 'he'

interface Props {
  post: Post
  onPress(): void
}

const LargePost: React.SFC<Props> = ({ post, onPress }) => (
  <Touchable onPress={onPress}>
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{decode(post.title)}</Text>

        {!!post.excerpt && (
          <Text style={styles.excerpt} numberOfLines={1}>
            {post.excerpt}
          </Text>
        )}

        <View style={styles.authorContainer}>
          <Author
            author={post.author}
            date={post.date}
            categories={post.categories}
          />
        </View>
      </View>

      <Image
        source={{
          uri: post.featuredImage.guid,
        }}
        style={styles.image}
      />
    </View>
  </Touchable>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,.12)',
  },
  image: {
    height: 80,
    width: 80,
    maxWidth: 80,
    minWidth: 80,
    borderRadius: 4,
    marginLeft: 18,
  },
  title: {
    fontSize: 16,
    fontFamily: 'NunitoSans-Bold',
  },
  excerpt: {
    color: 'rgba(0,0,0,.54)',
    fontFamily: 'NunitoSans-Regular',
  },
  authorContainer: {
    marginTop: 14,
  },
})

export default LargePost
