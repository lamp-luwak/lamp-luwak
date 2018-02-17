import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


export const Litter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 120;
`

Litter.propTypes = {
  onClick: PropTypes.func,
}
