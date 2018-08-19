import React from 'react'
import { ActivityIndicator, FlatList } from 'react-native'

import { Theme } from '@config'
import { Review } from '@types'
import { Error } from '@components'
import ReviewItem from './ReviewItem'

interface Props {
  reviews: Review[]
  loading: boolean
  error: boolean
  refreshing: boolean
  getReviews(): void
}

const Reviews: React.SFC<Props> = ({
  reviews,
  loading,
  error,
  getReviews,
  refreshing,
}) => (
  <React.Fragment>
    {loading && <ActivityIndicator style={{ marginVertical: 15 }} />}

    {error ? (
      <Error
        message="There's been a problem getting the reviews for this Lecturer."
        loading={refreshing}
        action={{ message: 'Try again', callback: getReviews }}
      />
    ) : (
      <FlatList
        data={reviews}
        keyExtractor={(review: Review) => review.id.toString()}
        contentContainerStyle={{ backgroundColor: Theme.background }}
        renderItem={({ item }) => <ReviewItem review={item} />}
      />
    )}
  </React.Fragment>
)

export default Reviews
