/* eslint-disable react/prop-types */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { LoginForm } from './login-form'


storiesOf('organisms/LoginForm', module)
  .add('Default', () => (
    <LoginForm onSubmit={action('login clicked')} />
  ))
