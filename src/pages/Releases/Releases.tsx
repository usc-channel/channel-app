import React from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import ReleaseThumbnail from './components/ReleaseThumbnail'
import { Release } from '@types'
import { API } from '@config'
import { Error } from '@components'

type Props = NavigationScreenProps<{}>

interface State {
  error: boolean
  loading: boolean
  releases: Release[]
}

class Releases extends React.Component<Props, State> {
  state = {
    error: false,
    loading: true,
    releases: [],
  }

  componentDidMount() {
    this.getReleases()
  }

  getReleases = async () => {
    try {
      const request = await fetch(`${API}/releases`)
      const releases = await request.json()

      this.setState({ releases, loading: false })
    } catch (e) {
      this.setState({ loading: false, error: true })
    }
  }

  viewRelease = (release: Release) => {
    this.props.navigation.navigate('ViewRelease', { release })
  }

  refresh = () => {
    this.setState({ loading: true }, () => {
      setTimeout(() => {
        this.getReleases()
      }, 1000)
    })
  }

  render() {
    const { loading, releases, error } = this.state

    return loading ? (
      <ActivityIndicator style={{ paddingVertical: 15 }} />
    ) : error ? (
      <Error
        message="There's been a problem getting the magazine releases."
        action={{ message: 'Try again?', callback: this.refresh }}
      />
    ) : (
      <FlatList
        data={releases}
        keyExtractor={(a: Release) => a.title}
        numColumns={2}
        renderItem={({ item }) => (
          <ReleaseThumbnail release={item} viewRelease={this.viewRelease} />
        )}
      />
    )
  }
}

export default Releases
