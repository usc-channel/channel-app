import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Author, Touchable } from '@components'

interface Props {
  onPress(): void
}

const LargePost: React.SFC<Props> = props => (
  <Touchable onPress={props.onPress}>
    <View style={styles.container}>
      <View style={{ flexShrink: 1 }}>
        <Text style={styles.title}>How To Look Up</Text>
        <Text style={styles.excerpt} numberOfLines={1}>
          Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed
          sapien metus, scelerisque nec pharetra id, tempor a tortor.
          Pellentesque non dignissim neque. Ut porta viverra est, ut dignissim
          elit elementum ut. Nunc vel rhoncus nibh, ut tincidunt turpis. Integer
          ac enim pellentesque, adipiscing metus id, pharetra odio. Donec
          bibendum nunc sit amet tortor scelerisque luctus et sit amet mauris.
          Suspendisse felis sem, condimentum ullamcorper est sit amet, molestie
          mollis nulla. Etiam lorem orci, consequat ac magna quis, facilisis
          vehicula neque.
        </Text>

        <Author />
      </View>

      <Image
        source={{
          uri:
            'http://uscchannel.com/wp-content/uploads/2018/01/productivity1.jpg',
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
    borderRadius: 4,
    flexGrow: 1,
    marginLeft: 18,
  },
  title: {
    fontSize: 16,
    fontFamily: 'NunitoSans-Bold',
  },
  excerpt: {
    color: 'rgba(0,0,0,.54)',
    marginBottom: 14,
    fontFamily: 'NunitoSans-Regular',
  },
})

export default LargePost
