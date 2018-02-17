import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { color } from '../theme'


export const Button = styled.button`
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  -webkit-appearance: none;
  cursor: pointer;

  border-radius: 3px;
  border: 1px solid ${color.primary};
  background-color: ${color.primary};
  color: white;

  outline: none !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  font-size: 1.4rem;
  font-weight: 600;
  line-height: 2.6rem;

  padding: 0 0.8rem;
  justify-content: center;

  ${(p) => p.wide && css`
    width: 100%;
  `}
`

Button.propTypes = {
  wide: PropTypes.bool,
}

Button.defaultProps = {
  wide: false,
}
