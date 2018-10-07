import React from 'react'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'

import { Theme } from '@config'
import {
  DataOperation,
  Dispatch,
  LecturerReviewsState,
  Review,
  Store,
} from '@types'
import { Empty, Error, Spinner } from '@components'
import { getLecturerReviews } from '@actions'

import ReviewItem from './ReviewItem'

interface ConnectedProps {
  reviews: LecturerReviewsState
}

interface ConnectedDispatch {
  getLecturerReviews(lecturerId: number, operation?: DataOperation): void
}

interface OwnProps {
  lecturerId: number
}

type Props = ConnectedProps & OwnProps & ConnectedDispatch

class Reviews extends React.Component<Props> {
  componentDidMount() {
    this.props.getLecturerReviews(this.props.lecturerId)
  }

  retry = () => {
    this.props.getLecturerReviews(this.props.lecturerId, 'retry')
  }

  refresh = () => {
    this.props.getLecturerReviews(this.props.lecturerId, 'refresh')
  }

  render() {
    const { loading, error, results } = this.props.reviews

    if (loading === 'fetch') {
      return <Spinner />
    }

    if (error) {
      return (
        <Error
          message="There's been a problem getting the reviews for this Lecturer."
          loading={loading === 'retry'}
          action={{ message: 'Try again', callback: this.retry }}
        />
      )
    }

    if (results.length === 0) {
      return (
        <Empty
          title="No Reviews"
          image={require('../../../assets/chat.png')}
          message="As reviews are added for this lecturer they'll appear here."
        />
      )
    }

    return (
      <FlatList
        data={results}
        refreshing={loading === 'refresh'}
        onRefresh={this.refresh}
        keyExtractor={(review: Review) => review.id.toString()}
        contentContainerStyle={{ backgroundColor: Theme.background }}
        renderItem={({ item }) => <ReviewItem review={item} />}
      />
    )
  }
}

const mapStateToProps = (state: Store) => ({
  reviews: state.lecturerReviews,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getLecturerReviews: (lecturerId: number, operation?: DataOperation) =>
    dispatch(getLecturerReviews(lecturerId, operation)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reviews)
