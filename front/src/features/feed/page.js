import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

export const FeedPage = () => (
  <div>
    <Helmet title="Sonata" titleTemplate="%s" />
    Home page | <Link to="/">Index</Link><br />
    <Link to="/">Index</Link>
  </div>
);
