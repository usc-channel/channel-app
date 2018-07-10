import React from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import ReleaseThumbnail from './components/ReleaseThumbnail'
import { Release } from '@types'
import { API } from '@config'

type Props = NavigationScreenProps<{}>

interface State {
  loading: boolean
  releases: Release[]
}

class Releases extends React.Component<Props, State> {
  state = {
    loading: false,
    releases: [],
  }

  componentDidMount() {
    this.setState({ loading: true }, this.getReleases)
  }

  getReleases = async () => {
    try {
      const request = await fetch(`${API}/releases`)
      const releases = await request.json()

      this.setState({ releases, loading: false })
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e)
      // TODO: Show error message
    }
  }

  viewRelease = (release: Release) => {
    this.props.navigation.navigate('ViewRelease', { release })
  }

  render() {
    const { loading, releases } = this.state

    return loading ? (
      <ActivityIndicator style={{ paddingVertical: 15 }} />
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
