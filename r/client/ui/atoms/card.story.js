/* eslint-disable react/prop-types */
import React from 'react'
import { storiesOf } from '@storybook/react'

import { Card } from './card'


storiesOf('atoms/Card', module)
  .add('Default', () => (
    <Card>Simple content of card</Card>
  ))
