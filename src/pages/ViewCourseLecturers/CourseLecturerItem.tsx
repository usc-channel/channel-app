import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import StarRating from 'react-native-star-rating'
import plur from 'plur'

import { Lecturer } from '@types'
import { Touchable } from '@components'
import { Theme } from '@config'

interface Props {
  lecturer: Lecturer
  viewLecturer(lecturer: Lecturer): void
}

const LecturerItem: React.SFC<Props> = ({ lecturer, viewLecturer }) => (
  <Touchable onPress={() => viewLecturer(lecturer)}>
    <View style={styles.container}>
      <View style={styles.metaContainer}>
        <Text style={styles.name}>{lecturer.name}</Text>
        <Text style={styles.school}>{lecturer.School.name}</Text>
      </View>

      <View>
        <StarRating
          disabled
          rating={lecturer.averageRating!}
          fullStarColor={Theme.star}
          containerStyle={{
            marginTop: 8,
            marginBottom: 0,
            justifyContent: 'flex-start',
          }}
          starStyle={{ marginRight: 8 }}
          starSize={22}
        />

        <Text style={styles.reviews}>{`${lecturer.totalReviews} ${plur(
          'review',
          lecturer.totalReviews
        )}`}</Text>
      </View>
    </View>
  </Touchable>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: Theme.fonts.semiBold,
    fontSize: 16,
    color: 'rgba(0,0,0,.87)',
  },
  metaContainer: {
    flex: 1,
    marginRight: 15,
  },
  name: {
    fontFamily: Theme.fonts.semiBold,
    fontSize: 20,
    color: 'rgba(0,0,0,.87)',
  },
  school: {
    fontFamily: Theme.fonts.regular,
    fontSize: 14,
    color: 'rgba(0,0,0,.54)',
  },
  reviews: {
    fontFamily: Theme.fonts.semiBold,
    fontSize: 14,
    color: 'rgba(0,0,0,.54)',
    marginTop: 5,
    textAlign: 'center',
  },
})

export default LecturerItem
