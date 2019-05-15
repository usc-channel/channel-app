import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { decode } from 'he'
import FastImage from 'react-native-fast-image'

import { PostMeta, Touchable } from '@components'
import { Post } from '@types'
import { featuredCategoryId, Theme } from '@config'
import { stripHTMLTags } from '@util'

interface Props {
  post: Post
  onPress(): void
}

const SmallPost: React.SFC<Props> = ({ post, onPress }) => (
  <Touchable onPress={onPress}>
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{decode(post.title)}</Text>

        {!!post.excerpt && (
          <Text style={styles.excerpt} numberOfLines={1}>
            {stripHTMLTags(post.excerpt)}
          </Text>
        )}

        <View style={styles.authorContainer}>
          <PostMeta
            author={post.author}
            date={post.date}
            categories={post.categories.filter(
              a => a.categoryId !== featuredCategoryId
            )}
          />
        </View>
      </View>

      {post.featuredImage && (
        <FastImage
          source={{
            uri: post.featuredImage.guid,
          }}
          style={styles.image}
        />
      )}
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
    color: 'rgba(0,0,0, .87)',
    fontSize: 16,
    fontFamily: Theme.fonts.bold,
  },
  excerpt: {
    color: 'rgba(0,0,0,.54)',
    fontFamily: Theme.fonts.regular,
  },
  authorContainer: {
    marginTop: 14,
  },
})

export default SmallPost
