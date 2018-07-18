import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'

import { Theme } from '@config'

interface Props {
  message?: string
  retrying: boolean
  action(): void
}

const Offline: React.SFC<Props> = ({ message, retrying, action }) => (
  <View style={styles.container}>
    <Image
      source={require('../assets/tv-empty.png')}
      style={styles.image}
      resizeMode="contain"
    />
    <Text style={styles.title}>Oops!</Text>
    <Text style={styles.sub}>
      This might be easier with an internet connection.
    </Text>

    <Button
      titleStyle={{ color: Theme.primary, fontFamily: 'NunitoSans-Regular' }}
      containerStyle={{ marginTop: 15 }}
      clear
      loading={retrying}
      title={message}
      loadingProps={{ size: 'small' }}
      loadingStyle={{ marginVertical: 9 }}
      onPress={action}
    />
  </View>
)

Offline.defaultProps = {
  message: 'Try again',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    width: 150,
    height: 120,
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

export default Offline
