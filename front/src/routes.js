import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import { NotFountPage } from './features/not-found';
import { FeedPage } from './features/feed';

export const Routes = () => (
  <Fragment>
    <Switch>
      <Route path="/" exact component={FeedPage} />
      <Route component={NotFountPage} />
    </Switch>
  </Fragment>
);
