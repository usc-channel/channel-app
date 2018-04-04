import React from 'react'
import { View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

type Props = NavigationScreenProps<{}>

interface State {
  semester: 'January' | 'Summer' | 'September'
  year: number
  course: string
  rating: number
  review: string
}

export default class NewReview extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return <View style={{ flex: 1, backgroundColor: 'pink' }} />
  }
}
