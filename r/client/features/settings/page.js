import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'

import { CommonTemplate } from '~/ui'


export const SettingsPage = () => (
  <CommonTemplate>
    <Helmet title="Settings" />
    Settings | <Link to="/">Feed</Link>
  </CommonTemplate>
)
