import React from 'react'
import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'

import { Theme } from '@config'

interface Props {
  message?: string
  retrying: boolean
  action(): void
}

const Offline: React.SFC<Props> = ({ message, retrying, action }) => (
  <View style={styles.container}>
    <Image style={styles.image} source={require('../assets/tv-empty.png')} />

    <Text style={styles.text}>
      This might be easier with an internet connection.
    </Text>

    <Button
      titleStyle={{ color: Theme.primary }}
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
  text: {
    color: 'rgba(0,0,0,0.87)',
    fontSize: 18,
    fontFamily: 'NunitoSans-SemiBold',
    textAlign: 'center',
  },
  image: {
    marginBottom: 16,
    width: 196,
    height: 162,
    marginTop: Platform.OS === 'ios' ? -50 : -30,
  },
})

export default Offline
