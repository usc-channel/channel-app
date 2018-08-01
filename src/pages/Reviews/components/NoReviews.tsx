import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Theme } from '@config'

const NoReviews = () => (
  <View style={styles.container}>
    <Image
      source={require('../../../assets/chat.png')}
      style={styles.image}
      resizeMode="contain"
    />
    <Text style={styles.title}>No Reviews</Text>
    <Text style={styles.sub}>
      As reviews are added for courses they’ll appear here.
    </Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 75,
    height: 73,
    marginBottom: 20,
    marginTop: -60,
  },
  title: {
    fontFamily: 'NunitoSans-Bold',
    color: Theme.primary,
    fontSize: 20,
  },
  sub: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 16,
    maxWidth: 300,
    marginTop: 5,
    lineHeight: 20,
    textAlign: 'center',
    color: 'rgba(0,0,0,.54)',
  },
})

export default NoReviews
