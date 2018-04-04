import React from 'react'
import { FlatList } from 'react-native'

import { Theme } from '@config'
import { Review } from '@types'
import mocks from '../../../mocks.json'
import ReviewItem from './ReviewItem'

const Reviews = () => (
  <FlatList
    data={mocks.reviews}
    keyExtractor={(review: Review) => review.id.toString()}
    contentContainerStyle={{ flex: 1, backgroundColor: Theme.background }}
    renderItem={({ item }) => <ReviewItem review={item} />}
  />
)

export default Reviews
