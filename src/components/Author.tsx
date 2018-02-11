import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Theme } from '@config'
import { Author as AuthorModel, Category } from '@types'
import { printArray } from '@util'
import { decode } from 'he'
import momemt from 'moment'
import FastImage from 'react-native-fast-image'

interface Props {
  author: AuthorModel
  date: string
  categories: Category[]
}

const Author: React.SFC<Props> = ({ author, date, categories }) => (
  <View style={styles.container}>
    <FastImage
      style={styles.avatar}
      source={{
        uri: author.avatar.url,
      }}
    />

    <View>
      <Text style={styles.metaField}>{author.name}</Text>
      <View style={styles.meta}>
        <Text style={styles.metaField}>{momemt(date).format('MMM D')}</Text>
        <FastImage
          style={styles.arrow}
          source={require('../assets/arrow.png')}
        />
        <Text style={[styles.metaField, styles.category]}>
          {printArray(categories.map(a => decode(a.name)))}
        </Text>
      </View>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderColor: Theme.accent,
    borderWidth: 1,
    marginRight: 6,
  },
  metaField: {
    fontFamily: 'NunitoSans-SemiBold',
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

export default Author
