import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'

import { CommonTemplate } from '~/ui'


export const UserPage = ({ match }) => (
  <CommonTemplate>
    <Helmet title={`@${match.params.username}`} />
    User: {match.params.username} <br />
    <Link to="/@sergeysova/i/1">#1</Link>
  </CommonTemplate>
)

UserPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ username: PropTypes.string }),
  }).isRequired,
}
