import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Litter } from '~/ui'


const Card = styled.div`
  display: flex;
  background-color: white;
  border-radius: 4px;
  padding: 1rem;
`

export const PhotoPage = ({ match, history }) => (
  <Litter onClick={() => history.push(`/@${match.params.username}`)}>
    <Card>
      Image: {match.params.image} of {match.params.username}
    </Card>
  </Litter>
)

PhotoPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ username: PropTypes.string }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}
