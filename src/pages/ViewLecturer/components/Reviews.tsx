import React from 'react'
import { FlatList } from 'react-native'

import { Theme } from '@config'
import { Review } from '@types'
import { Empty, Error, Spinner } from '@components'
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
    {loading && <Spinner />}

    {!loading &&
      error && (
        <Error
          message="There's been a problem getting the reviews for this Lecturer."
          loading={refreshing}
          action={{ message: 'Try again', callback: getReviews }}
        />
      )}

    {!loading &&
      !error &&
      reviews.length === 0 && (
        <Empty
          title="No Reviews"
          image={require('../../../assets/chat.png')}
          message="As reviews are added for this lecturer they'll appear here."
        />
      )}

    {!loading &&
      !error &&
      reviews.length > 0 && (
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
