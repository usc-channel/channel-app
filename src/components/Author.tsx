import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Theme } from '@config'

const Author = () => (
  <View style={styles.container}>
    <Image
      style={styles.avatar}
      source={{
        uri:
          'http://0.gravatar.com/avatar/328a8689584cbd6912954b1a5444f0ad?s=96&d=mm&r=g',
      }}
    />

    <View>
      <Text style={styles.metaField}>Rafael Boyce</Text>
      <View style={styles.meta}>
        <Text style={styles.metaField}>7 Feb</Text>
        <Image style={styles.arrow} source={require('../assets/arrow.png')} />
        <Text style={[styles.metaField, styles.category]}>Technology</Text>
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
