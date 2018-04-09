import React from 'react'
import { FlatList } from 'react-native'

import { Theme } from '@config'
import { Review } from '@types'
import ReviewItem from './ReviewItem'

interface Props {
  reviews: Review[]
}

const Reviews: React.SFC<Props> = ({ reviews }) => (
  <FlatList
    data={reviews}
    keyExtractor={(review: Review) => review.id.toString()}
    contentContainerStyle={{ backgroundColor: Theme.background }}
    renderItem={({ item }) => <ReviewItem review={item} />}
  />
)

export default Reviews
