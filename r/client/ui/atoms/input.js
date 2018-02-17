import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { color } from '../theme'


export const Input = styled.input`
  display: flex;
  flex: 1 0 0px;
  margin: 0;
  padding: 1rem 0.7rem;

  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.8rem;

  background-color: ${color.backgroundLight};
  color: ${color.text};

  border: 0;
  overflow: hidden;
  outline: none;
  text-overflow: ellipsis;

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  -webkit-appearance: none;

  ${(p) => p.bordered && css`
    border: 1px solid ${color.border};
    border-radius: 3px;
  `}
`

Input.propTypes = {
  bordered: PropTypes.bool,
}

Input.defaultProps = {
  bordered: false,
}
