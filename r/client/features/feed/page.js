import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'

import { CommonTemplate } from '~/ui'

/* eslint-disable react/prop-types */


export const FeedPage = () => (
  <CommonTemplate>
    <Helmet title="Instaclone" titleTemplate="%s" />
    Home page | <Link to="/settings">Settings</Link><br />
    <Link to="/@sergeysova">@sergeysova</Link>
  </CommonTemplate>
)
