import React from 'react'
import { FlatList } from 'react-native'

import { Theme } from '@config'
import { Review } from '@types'
import mocks from '../../../mocks.json'
import ReviewItem from './ReviewItem'

interface Props {
  viewReview(review: Review): void
}

const Reviews: React.SFC<Props> = ({ viewReview }) => (
  <FlatList
    data={mocks.reviews}
    keyExtractor={(review: Review) => review.id.toString()}
    contentContainerStyle={{ flex: 1, backgroundColor: Theme.background }}
    renderItem={({ item }) => (
      <ReviewItem review={item} viewReview={viewReview} />
    )}
  />
)

export default Reviews
