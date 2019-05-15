import React from 'react'
import { FlatList, Linking, View } from 'react-native'
import { stringify } from 'query-string'
import Axios from 'axios'

import { Video } from '@types'
import VideoPreview from './components/VideoPreview'
import { Spinner } from '@components'
import { YOUTUBE_KEY, Theme } from '@config'

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
      loading: true,
      initialLoad: true,
      videos: [],
      pageInfo: null,
      fetchingMore: false,
    }
  }

  componentDidMount() {
    this.fetchVideos()
  }

  fetchVideos = async (pageToken: string | null = null) => {
    const params = stringify({
      key: YOUTUBE_KEY,
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
            thumbnail: a.snippet.thumbnails.high.url,
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
      <View style={{ flex: 1, backgroundColor: Theme.background }}>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <FlatList
            data={this.state.videos}
            keyExtractor={(a: Video) => a.videoId}
            onEndReachedThreshold={1}
            renderItem={({ item }) => (
              <VideoPreview video={item} onPress={this.viewVideo} />
            )}
            onEndReached={this.fetchMoreVideos}
            ListFooterComponent={() => this.state.fetchingMore && <Spinner />}
          />
        )}
      </View>
    )
  }
}
