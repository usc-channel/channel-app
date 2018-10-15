import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { decode } from 'he'
import moment from 'moment'

import { Theme } from '@config'
import { Author as AuthorModel, Category } from '@types'
import { printArray } from '@util'

interface Props {
  author: AuthorModel
  date: string
  categories: Category[]
}

const PostMeta: React.SFC<Props> = ({ author, date, categories }) => {
  const hasCategories = categories.length > 0

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <FastImage
          style={styles.avatar}
          source={{
            uri: author.avatar.url,
          }}
        />
      </View>

      <View>
        <Text style={styles.metaField}>{author.name}</Text>
        <View style={styles.meta}>
          <Text style={styles.metaField}>
            {moment(date).isBefore(
              moment(`${new Date().getFullYear()}-01-01`, 'YYYY-MM-DD')
            )
              ? moment(date).format('MMM D, YYYY')
              : moment(date).format('MMM D')}
          </Text>

          {hasCategories && (
            <FastImage
              style={styles.arrow}
              source={require('../assets/arrow.png')}
            />
          )}

          {hasCategories && (
            <Text style={[styles.metaField, styles.category]}>
              {printArray(categories.map(a => decode(a.name)))}
            </Text>
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatarContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    overflow: 'hidden',
    borderColor: Theme.accent,
    borderWidth: 1,
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    height: 30,
    width: 30,
  },
  metaField: {
    fontFamily: Theme.fonts.semiBold,
    fontSize: 12,
    color: 'rgba(0,0,0,.54)',
  },
  category: {
    color: Theme.accent,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    height: 10,
    width: 3,
    marginHorizontal: 6,
  },
})

export default PostMeta
