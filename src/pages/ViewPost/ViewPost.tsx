import React from 'react'
import {
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { Author, NavIcon } from '@components'
import { Post } from '@types'
import FastImage from 'react-native-fast-image'
import { decode } from 'he'
import { ChildProps, graphql } from 'react-apollo'
import { postQuery } from '../../graphql'

interface GraphProps {
  content: string
  url: string
}

interface ScreenProps {
  post: Post
  onShare(): void
}

type OwnProps = NavigationScreenProps<ScreenProps>
type Props = ChildProps<OwnProps, GraphProps>

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
    Share.share({
      title: this.props.navigation.state.params.post.title,
      url: this.props.data!.url!,
    })
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

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{decode(post.title)}</Text>
        </View>
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
  titleContainer: {
    marginTop: 16,
  },
  title: {
    fontFamily: 'Alegreya-Bold',
    marginHorizontal: 16,
    fontSize: 28,
  },
})

interface Response {
  post: {
    content: string
    guid: string
  }
}

const withPost = graphql<Response, any, OwnProps>(postQuery, {
  props: ({ data }) => {
    let returnData = {}

    if (data!.post) {
      returnData = {
        ...returnData,
        content: data!.post.content,
        url: data!.post.guid,
      }
    }

    return {
      data: { ...returnData, error: data!.error, loading: data!.loading },
    }
  },
  options: ({ navigation }: OwnProps) => ({
    variables: { id: navigation.state.params.post.id },
  }),
})

export default withPost(ViewPost)
