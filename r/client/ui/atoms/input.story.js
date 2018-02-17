/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'

import { Input } from './input'


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

storiesOf('atoms/Input', module)
  .add('Default', () => (
    <WithState default="Example">
      {(props) => (
        <Input {...props} />
      )}
    </WithState>
  ))
  .add('Bordered', () => (
    <WithState default="Example">
      {(props) => (
        <Input bordered {...props} />
      )}
    </WithState>
  ))
