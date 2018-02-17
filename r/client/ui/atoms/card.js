import React from 'react'
import styled from 'styled-components'

import { color, font } from '../theme'


export const Card = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: stretch;
  vertical-align: baseline;
  position: relative;

  padding: 1rem 0;
  margin: 0 0 1rem;

  border: 1px solid ${color.borderDark};
  background-color: ${color.backgroundWhite};
  border-radius: 1px;

  font-size: 1.4rem;
  font-family: ${font.formElement};
`
