import React from 'react'
import { FlatList } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import releases from '../../releases.json'
import ReleaseThumbnail from './components/ReleaseThumbnail'
import { Release } from '@types'

type Props = NavigationScreenProps<{}>

const Releases: React.SFC<Props> = props => {
  const viewRelease = (release: Release) => {
    props.navigation.navigate('ViewRelease', { release })
  }

  return (
    <FlatList
      data={releases}
      keyExtractor={(a: Release) => a.title}
      renderItem={({ item }) => (
        <ReleaseThumbnail release={item} viewRelease={viewRelease} />
      )}
    />
  )
}

export default Releases
