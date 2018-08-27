import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Theme } from '@config'
import { ImageSource } from 'react-native-vector-icons/Icon'

interface Props {
  title: string
  message: string
  image: ImageSource
}

const Empty: React.SFC<Props> = ({ title, message, image }) => (
  <View style={styles.container}>
    <Image source={image} style={styles.image} resizeMode="contain" />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.sub}>{message}</Text>
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
    fontFamily: Theme.fonts.bold,
    color: Theme.primary,
    fontSize: 20,
  },
  sub: {
    fontFamily: Theme.fonts.regular,
    fontSize: 16,
    maxWidth: 300,
    marginTop: 5,
    lineHeight: 20,
    textAlign: 'center',
    color: 'rgba(0,0,0,.54)',
  },
})

export default Empty
