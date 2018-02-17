import React from 'react'
import { storiesOf } from '@storybook/react'

import { Logo } from './logo'


storiesOf('atoms/Logo', module)
  .add('Default', () => (
    <Logo />
  ))
  .add('Small', () => (
    <Logo height="30px" width="135px" />
  ))
  .add('Colored', () => (
    <Logo fill="red" />
  ))
