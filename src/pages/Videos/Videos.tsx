import React from 'react'
import { ActivityIndicator, FlatList, Linking, View } from 'react-native'
import { stringify } from 'query-string'
import Axios from 'axios'

import { Video } from '@types'
import VideoPreview from './components/VideoPreview'

interface State {
  loading: boolean
  fetchingMore: boolean
  initialLoad: boolean
  videos: Video[]
  pageInfo: {
    resultsPerPage: number
    totalResults: number
    pageToken: string
  } | null
}

export default class Videos extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = {
      loading: false,
      initialLoad: true,
      videos: [],
      pageInfo: null,
      fetchingMore: false,
    }
  }

  componentDidMount() {
    this.setState({ loading: true }, this.fetchVideos)
  }

  fetchVideos = async (pageToken: string | null = null) => {
    const params = stringify({
      key: 'AIzaSyCsAkzDu1OvSBfPfoCRfrBHSHhrwa1HGEU',
      channelId: 'UCg-Nbp6C4lH05Enb2OIxT0A',
      part: 'snippet',
      order: 'date',
      maxResults: '5',
      pageToken,
    })

    const { data } = await Axios.get(
      `https://www.googleapis.com/youtube/v3/search?${params}`
    )

    this.setState({
      initialLoad: false,
      fetchingMore: pageToken ? false : this.state.fetchingMore,
      loading: pageToken ? this.state.loading : false,
      pageInfo: {
        ...data.pageInfo,
        pageToken: data.nextPageToken,
      },
      videos: [
        ...this.state.videos,
        ...data.items
          .filter((a: any) => a.id.kind === 'youtube#video')
          .map((a: any) => ({
            videoId: a.id.videoId,
            publishedAt: a.snippet.publishedAt,
            title: a.snippet.title,
            thumbnail: a.snippet.thumbnails.medium.url,
          })),
      ],
    })
  }

  fetchMoreVideos = () => {
    if (
      this.state.pageInfo!.pageToken &&
      !this.state.fetchingMore &&
      !this.state.initialLoad
    ) {
      this.setState({ fetchingMore: true }, () => {
        this.fetchVideos(this.state.pageInfo!.pageToken)
      })
    }
  }

  viewVideo = (video: Video) => {
    Linking.openURL(`https://www.youtube.com/watch?v=${video.videoId}`)
  }

  render() {
    return (
      <View style={{ flexGrow: 1 }}>
        {this.state.loading ? (
          <ActivityIndicator style={{ paddingVertical: 15 }} />
        ) : (
          <FlatList
            data={this.state.videos}
            keyExtractor={(a: Video) => a.videoId}
            onEndReachedThreshold={1}
            contentContainerStyle={{ paddingBottom: 30 }}
            renderItem={({ item }) => (
              <VideoPreview video={item} onPress={this.viewVideo} />
            )}
            onEndReached={this.fetchMoreVideos}
            ListFooterComponent={() =>
              this.state.fetchingMore ? (
                <ActivityIndicator style={{ paddingVertical: 16 }} />
              ) : (
                <View style={{ paddingVertical: 30 }} />
              )
            }
          />
        )}
      </View>
    )
  }
}
