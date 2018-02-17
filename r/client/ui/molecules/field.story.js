/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'

import { Field } from './field'


class WithState extends Component {
  state = { value: this.props.default || '' }

  onChange = (event) => {
    const { value } = event.target

    this.setState(() => ({ value }))
  }

  render() {
    return this.props.children({
      onChange: this.onChange,
      value: this.state.value,
    })
  }
}

storiesOf('molecules/Field', module)
  .add('Default', () => (
    <WithState>
      {(props) => (
        <Field label="Username or email" {...props} />
      )}
    </WithState>
  ))
