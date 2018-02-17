/* eslint-disable react/prop-types */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

import { Footer } from './footer'


storiesOf('ui/molecules/Footer', module)
  .add('Default', () => (
    <MemoryRouter>
      <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
        <Footer />
      </div>
    </MemoryRouter>
  ))
