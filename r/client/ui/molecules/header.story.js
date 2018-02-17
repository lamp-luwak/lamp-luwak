/* eslint-disable react/prop-types */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

import { Header } from './header'


storiesOf('molecules/Header', module)
  .add('Default', () => (
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ))
  .add('Content', () => (
    <MemoryRouter>
      <Header>
        <div style={{ fontSize: '1.4rem' }}>Example content</div>
      </Header>
    </MemoryRouter>
  ))
