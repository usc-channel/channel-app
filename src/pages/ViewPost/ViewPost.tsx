import React from 'react'
import { Platform, ScrollView, StyleSheet, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { Author, NavIcon } from '@components'
import { Post } from '@types'
import FastImage from 'react-native-fast-image'

interface ScreenProps {
  post: Post
  onShare(): void
}

type Props = NavigationScreenProps<ScreenProps>

class ViewPost extends React.Component<Props> {
  static navigationOptions = ({
    navigation,
  }: NavigationScreenProps<ScreenProps>) => ({
    headerRight: (
      <NavIcon
        iconName={Platform.OS === 'ios' ? 'ios-share-outline' : 'share'}
        onPress={navigation.state.params.onShare}
      />
    ),
  })

  componentWillMount() {
    this.props.navigation.setParams({
      onShare: this.onShare,
    })
  }

  onShare = () => {
    //
  }

  render() {
    const { post } = this.props.navigation.state.params
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.authorContainer}>
          <Author
            author={post.author}
            date={post.date}
            categories={post.categories}
          />
        </View>

        {post.featuredImage && (
          <FastImage
            source={{ uri: post.featuredImage.guid }}
            style={styles.featuredImage}
          />
        )}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  authorContainer: {
    padding: 16,
  },
  featuredImage: {
    height: 250,
  },
})

export default ViewPost
