import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { Theme } from '@config'
import Image from 'react-native-fast-image'

interface Action {
  message: string
  callback(): void
}

interface ErrorProps {
  message: string
  action?: Action
  loading?: boolean
}

const Error: React.SFC<ErrorProps> = ({ message, action, loading }) => (
  <View style={styles.container}>
    <Image
      source={require('../assets/tv-empty.png')}
      style={styles.image}
      resizeMode="contain"
    />
    <Text style={styles.title}>Oops!</Text>
    <Text style={styles.sub}>{message}</Text>

    {action && (
      <Button
        containerStyle={{ marginTop: 15 }}
        type="clear"
        titleStyle={{
          fontFamily: Theme.fonts.regular,
          color: Theme.primary,
          fontSize: 16,
        }}
        title={action.message}
        onPress={action.callback}
        loading={loading}
        loadingProps={{ color: Theme.primary }}
        loadingStyle={{ paddingVertical: 9 }}
      />
    )}
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.background,
  },
  image: {
    width: 150,
    height: 120,
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

export default Error
