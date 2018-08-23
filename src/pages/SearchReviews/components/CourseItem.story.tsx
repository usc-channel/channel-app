import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { Story, StoryScreen, UseCase } from '../../../../storybook/views'
import CourseItem from './CourseItem'

storiesOf('CourseItem', module)
  .addDecorator((fn: any) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Behaviour', () => (
    <Story>
      <UseCase
        noPad
        text="Course Item"
        usage="Displays Course information in a list"
      >
        <CourseItem
          course={{
            id: 1,
            code: 'RGB-123',
            name: 'My Course',
            totalReviews: 30,
          }}
          viewCourse={() => null}
        />
      </UseCase>
    </Story>
  ))
