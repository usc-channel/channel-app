import React from 'react'
import { View } from 'react-native'

interface State {
  mode: 'reviews' | 'courses'
}

export default class ViewLecturer extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = {
      mode: 'reviews',
    }
  }

  render() {
    return <View />
  }
}
