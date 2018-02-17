import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Button } from './button'


storiesOf('atoms/Button', module)
  .add('Default', () => (
    <Button onClick={action('default')}>Default button</Button>
  ))
  .add('Default wide', () => (
    <Button onClick={action('wide')} wide>Wide button</Button>
  ))
