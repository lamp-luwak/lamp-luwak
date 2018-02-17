import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { Input } from '../atoms'
import { color, font } from '../theme'


const fieldHeight = '3.6rem'

const FieldWrapper = styled.div`
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  align-items: stretch;
  position: relative;

  height: ${fieldHeight};

  border: 0 solid black;
  margin: 0;
  padding: 0;
`

const FieldLabel = styled.label`
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;

  white-space: nowrap;
  user-select: none;
  transition: transform ease-out .1s;
  transform-origin: left;
  text-overflow: ellipsis;
  right: 0;
  position: absolute;
  pointer-events: none;
  overflow: hidden;
  line-height: ${fieldHeight};
  left: 0.8rem;
  height: ${fieldHeight};
  font-size: 1.2rem;
  color: ${color.textLight};
`

const FieldContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  align-items: center;
  vertical-align: baseline;

  border-radius: 3px;
  position: relative;
  width: 100%;

  font-family: ${font.formElement};
  font-size: 1.4rem;
  background-color: ${color.backgroundLight};
  border: 1px solid ${color.border};
  color: ${color.text};

  -webkit-appearance: none;

  ${(p) => p.active && css`
    ${FieldLabel} {
      transform: scale(0.83333) translateY(-1rem);
    }

    ${Input} {
      font-size: 1.2rem;
      padding-top: 1.8rem;
      padding-bottom: 0.2rem;
    }
  `}
`

FieldContainer.propTypes = {
  active: PropTypes.bool,
}

export const Field = ({ onChange, value, label, type, required, maxLength, name }) => (
  <FieldContainer active={value.trim().length !== 0}>
    <FieldWrapper>
      <FieldLabel>{label}</FieldLabel>
      <Input
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        required={required}
        aria-describedby={label}
        aria-label={label}
        aria-required={required}
        maxLength={maxLength}
        autoCapitalize="false"
        autoCorrect="false"
      />
    </FieldWrapper>
  </FieldContainer>
)

Field.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password']),
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  name: PropTypes.string,
}

Field.defaultProps = {
  onChange: null,
  value: '',
  label: '',
  type: 'text',
  required: false,
  maxLength: 30,
  name: undefined,
}

