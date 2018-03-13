import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

const CenterContainer = styled.div`
  display: flex;
  flex-flow: column;
  flex-grow: 1;
  align-items: center;
`;

export const NotFountPage = () => (
  <div>
    <Helmet title="Page Not Found" />
    <CenterContainer>
      <h2>Sorry, this page isn{'\''}t available.</h2>
      <p>
        The link you followed may be broken, or the page may have been removed.
        {' '}
        <Link to="/">Go back to Sonata.</Link>
      </p>
    </CenterContainer>
  </div>
);
