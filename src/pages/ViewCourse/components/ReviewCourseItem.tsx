import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { Review } from '@types'
import { Theme } from '@config'

interface Props {
  review: Review
}

const ReviewCourseItem: React.SFC<Props> = ({ review }) => (
  <View style={styles.container}>
    <View style={styles.header}>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  courseName: {
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: 16,
    color: 'rgba(0,0,0,.87)',
  },
  courseComment: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 14,
    color: 'rgba(0,0,0,.87)',
    marginTop: 18,
  },
  ratingContainer: {
    backgroundColor: Theme.accent,
    borderRadius: 2,
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  reviewText: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 10,
    color: '#fff',
  },
  reviewCount: {
    marginLeft: 5,
    color: '#fff',
    fontFamily: 'NunitoSans-Bold',
    fontSize: 14,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  semester: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 12,
    color: 'rgba(0,0,0,.54)',
  },
  user: {
    fontFamily: 'NunitoSans-SemiBold',
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

export default ReviewCourseItem
