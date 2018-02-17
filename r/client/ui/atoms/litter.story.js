import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Litter } from './litter'


storiesOf('atoms/Litter', module)
  .add('Default', () => (
    <Litter onClick={action('litter')} />
  ))
