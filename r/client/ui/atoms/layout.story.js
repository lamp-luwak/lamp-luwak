/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'

import { Layout } from './layout'


const Container = styled.div`
  font-size: 1.4rem;
  border: 2px solid rgba(255, 0, 0, .3);
`
const Element = styled.div`
  background-color: rgba(0, 0, 255, .1);
  border: 2px solid rgba(0, 0, 255, .2);
  padding: 1rem;
`

storiesOf('atoms/Layout', module)
  .add('Row', () => (
    <Container>
      <Layout flow="row">
        <Element>A</Element>
        <Element>B</Element>
        <Element>C</Element>
        <Element>D</Element>
      </Layout>
    </Container>
  ))
  .add('Column', () => (
    <Container>
      <Layout flow="column">
        <Element>A</Element>
        <Element>B</Element>
        <Element>C</Element>
        <Element>D</Element>
      </Layout>
    </Container>
  ))
  .add('Padding', () => (
    <Container>
      <Layout flow="row" padding={2}>
        <Element>A</Element>
        <Element>B</Element>
        <Element>C</Element>
        <Element>D</Element>
      </Layout>
    </Container>
  ))
  .add('Row gap', () => (
    <Container>
      <Layout flow="row" gap={2}>
        <Element>A</Element>
        <Element>B</Element>
        <Element>C</Element>
        <Element>D</Element>
      </Layout>
    </Container>
  ))
  .add('Column gap', () => (
    <Container>
      <Layout flow="column" gap={2}>
        <Element>A</Element>
        <Element>B</Element>
        <Element>C</Element>
        <Element>D</Element>
      </Layout>
    </Container>
  ))
  .add('Padding & gap row', () => (
    <Container>
      <Layout flow="row" padding={2} gap={2}>
        <Element>A</Element>
        <Element>B</Element>
        <Element>C</Element>
        <Element>D</Element>
      </Layout>
    </Container>
  ))
  .add('Padding & gap column', () => (
    <Container>
      <Layout flow="column" padding={2} gap={2}>
        <Element>A</Element>
        <Element>B</Element>
        <Element>C</Element>
        <Element>D</Element>
      </Layout>
    </Container>
  ))
