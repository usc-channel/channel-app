import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import plur from 'plur'

import { Course } from '@types'
import { Theme } from '@config'
import { Touchable } from '@components'

interface Props {
  course: Course
  viewCourse(course: Course): void
}

const CourseItem: React.SFC<Props> = ({ course, viewCourse }) => (
  <Touchable onPress={() => viewCourse(course)}>
    <View style={styles.container}>
      <Text style={styles.title}>{`${course.code} - ${course.name}`}</Text>
      <Text style={styles.reviews}>{`${course.totalReviews!} ${plur(
        'review',
        course.totalReviews!
      )}`}</Text>
    </View>
  </Touchable>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontFamily: Theme.fonts.semiBold,
    fontSize: 16,
    color: 'rgba(0,0,0,.87)',
  },
  reviews: {
    fontFamily: Theme.fonts.regular,
    fontSize: 14,
    color: 'rgba(0,0,0,.54)',
  },
})

export default CourseItem
