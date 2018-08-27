import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { Review } from '@types'
import { Theme } from '@config'

interface Props {
  review: Review
}

const ReviewItem: React.SFC<Props> = ({ review }) => (
  <View style={styles.container}>
    <View style={styles.userContainer}>
      <View style={styles.avatarContainer}>
        {review.User.avatar && <Image source={{ uri: review.User.avatar }} />}
      </View>

      <View>
        <Text style={styles.user}>{review.User.name}</Text>
        <Text style={styles.semester}>{`${review.semester} ${
          review.year
        }`}</Text>
      </View>
    </View>

    <View style={styles.courseHeader}>
      <Text style={styles.courseName}>
        {review.Course.code} - {review.Course.name}
      </Text>

      <View style={styles.ratingContainer}>
        <Text style={styles.reviewText}>RATED</Text>
        <Text style={styles.reviewCount}>{review.rating}</Text>
      </View>
    </View>

    {!!review.comment && (
      <Text style={styles.courseComment}>{review.comment}</Text>
    )}
  </View>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,.12)',
    marginBottom: 16,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  courseName: {
    fontFamily: Theme.fonts.semiBold,
    fontSize: 16,
    color: 'rgba(0,0,0,.87)',
  },
  courseComment: {
    marginTop: 16,
    fontFamily: Theme.fonts.regular,
    fontSize: 14,
    color: 'rgba(0,0,0,.87)',
  },
  ratingContainer: {
    backgroundColor: Theme.accent,
    borderRadius: 2,
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  reviewText: {
    fontFamily: Theme.fonts.regular,
    fontSize: 10,
    color: '#fff',
  },
  reviewCount: {
    marginLeft: 5,
    color: '#fff',
    fontFamily: Theme.fonts.bold,
    fontSize: 14,
  },
  userContainer: {
    flexDirection: 'row',
    marginBottom: 18,
    alignItems: 'center',
  },
  semester: {
    fontFamily: Theme.fonts.regular,
    fontSize: 12,
    color: 'rgba(0,0,0,.54)',
  },
  user: {
    fontFamily: Theme.fonts.semiBold,
    fontSize: 14,
    color: 'rgba(0,0,0,.87)',
  },
  avatarContainer: {
    marginRight: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'grey',
  },
})

export default ReviewItem
