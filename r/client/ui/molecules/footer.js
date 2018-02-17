import React from 'react'
import styled from 'styled-components'

import { Container } from '../atoms'


const FooterContainer = styled.footer`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  height: 7rem;
  align-items: center;

  font-size: 1.2rem;
  color: #003569;
  font-weight: 600;
  text-transform: uppercase;

  & ${Container} {
    justify-content: space-between;
  }
`

const Links = styled.div`
  & a {
    text-decoration: none;
    color: #003569 !important;
  }

  & a:not(:first-child) {
    margin-left: 1.5rem;
  }
`

const Copyleft = styled.div`

  &::before {
    content: '©';
    display: inline-block;
    transform: rotate(180deg);
    line-height: 12px;
    padding-left: 0.3rem;
  }
`

const links = [
  ['Author', 'https://sergeysova.com'],
  ['Source code', 'https://github.com/sergeysova/instaclone'],
  ['API', 'https://github.com/sergeysova/instaclone-backend.rs'],
  ['Instagram', 'https://www.instagram.com'],
]

export const Footer = () => (
  <FooterContainer>
    <Container>
      <Links>
        {links.map(([title, link]) => (
          <a href={link} key={title} title={title} rel="noopener" target="_blank">{title}</a>
        ))}
      </Links>
      <Copyleft>
        {new Date().getFullYear()} Instaclone
      </Copyleft>
    </Container>
  </FooterContainer>
)
