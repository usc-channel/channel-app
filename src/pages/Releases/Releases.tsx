import React from 'react'
import { FlatList } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import ReleaseThumbnail from './components/ReleaseThumbnail'
import { PaginationInfo, Release } from '@types'
import { API, Theme } from '@config'
import { Error, Spinner } from '@components'

type Props = NavigationScreenProps<{}>

interface State {
  error: boolean
  loading: boolean // Fetching for the first time
  retrying: boolean // Retrying after encountered error
  fetchingMore: boolean // Reached bottom of list and getting more results
  refreshing: boolean // User pulled to refresh
  releases: Release[]
  pageInfo: PaginationInfo | null
}

class Releases extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      error: false,
      loading: true,
      retrying: false,
      refreshing: false,
      releases: [],
      pageInfo: null,
      fetchingMore: false,
    }
  }

  componentDidMount() {
    this.getReleases()
  }

  getReleases = async () => {
    try {
      const {
        data: { pageInfo, results: releases },
      } = await this.fetchReleases()

      this.setState({
        releases,
        pageInfo,
        loading: false,
        retrying: false,
        refreshing: false,
        error: false,
      })
    } catch {
      this.setState({
        loading: false,
        error: true,
        retrying: false,
        refreshing: false,
      })
    }
  }

  fetchReleases = (skip: number = 0) => {
    return API().get(`/releases/?skip=${skip}`)
  }

  viewRelease = (release: Release) => {
    this.props.navigation.navigate('ViewRelease', { release })
  }

  retry = () => {
    this.setState({ retrying: true }, () => {
      setTimeout(this.getReleases, Theme.refreshTimeout)
    })
  }

  refresh = () => {
    this.setState({ refreshing: true }, () => {
      setTimeout(this.getReleases, Theme.refreshTimeout)
    })
  }

  fetchMore = () => {
    const { loading, retrying, pageInfo } = this.state

    if (!loading && !retrying && !!pageInfo!.nextSkip) {
      const nextSkip = pageInfo!.nextSkip!

      this.setState({ fetchingMore: true }, async () => {
        const {
          data: { pageInfo, results },
        } = await this.fetchReleases(nextSkip)

        this.setState(({ releases }) => ({
          fetchingMore: false,
          pageInfo,
          releases: [...releases, ...results],
        }))
      })
    }
  }

  render() {
    const {
      loading,
      releases,
      error,
      retrying,
      fetchingMore,
      refreshing,
    } = this.state

    return loading ? (
      <Spinner />
    ) : error ? (
      <Error
        message="There's been a problem getting the magazine releases."
        action={{ message: 'Try again?', callback: this.retry }}
        loading={retrying}
      />
    ) : (
      <FlatList
        data={releases}
        keyExtractor={(a: Release) => a.title}
        numColumns={2}
        renderItem={({ item }) => (
          <ReleaseThumbnail release={item} viewRelease={this.viewRelease} />
        )}
        onEndReached={this.fetchMore}
        refreshing={refreshing}
        onRefresh={this.refresh}
        ListFooterComponent={fetchingMore ? <Spinner /> : null}
      />
    )
  }
}

export default Releases
