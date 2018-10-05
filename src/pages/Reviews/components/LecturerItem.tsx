import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
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

      <View style={styles.reviewsContainer}>
        <Text
          style={StyleSheet.flatten([
            styles.reviewsText,
            styles.reviewsText__Amount,
          ])}
        >
          {lecturer.totalReviews}
        </Text>
        <Text style={styles.reviewsText}>
          {plur('Review', lecturer.totalReviews)}
        </Text>
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
  reviewsContainer: {
    backgroundColor: Theme.accent,
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 6,
    flexDirection: 'column',
    alignItems: 'center',
  },
  reviews: {
    fontFamily: Theme.fonts.regular,
    fontSize: 14,
    color: 'rgba(0,0,0,.54)',
  },
  reviewsText: {
    color: '#fff',
    fontFamily: Theme.fonts.regular,
    fontSize: 15,
  },
  reviewsText__Amount: {
    fontFamily: Theme.fonts.bold,
    fontSize: 24,
    marginBottom: -4,
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
})

export default LecturerItem
