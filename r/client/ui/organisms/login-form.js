/* eslint-disable react/no-unused-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, withState } from 'recompose'

import { Button, Card, Layout, Logo } from '../atoms'
import { Field } from '../molecules'


const enhance = compose(
  withState('valueUsername', 'updateUsername', ''),
  withState('valuePassword', 'updatePassword', ''),
  withHandlers({
    clickLogin: (props) => (event) => {
      event.preventDefault()

      props.onSubmit({
        username: props.valueUsername,
        password: props.valuePassword,
      })
    },
  }),
)

export const LoginForm = enhance(({
  valueUsername, updateUsername, valuePassword, updatePassword, clickLogin,
}) => (
  <Card>
    <form onSubmit={clickLogin}>
      <Layout flow="column" width={35} gap={1.6} padding={2}>
        <Layout flow="row" justify="center">
          <Logo width="17.5rem" height="5rem" />
        </Layout>
        <Layout flow="column" padding={1} gap={1.6}>
          <Layout flow="column" gap={0.6}>
            <Field
              name="username"
              label="Username or email"
              value={valueUsername}
              onChange={(event) => updateUsername(event.target.value)}
            />
            <Field
              name="password"
              label="Password"
              type="password"
              value={valuePassword}
              onChange={(event) => updatePassword(event.target.value)}
            />
          </Layout>
          <Button wide onClick={clickLogin}>Log in</Button>
        </Layout>
      </Layout>
    </form>
  </Card>
))

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
}

LoginForm.defaultProps = {
  onSubmit: null,
}
