import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

import { NotFountPage } from './features/not-found'
import { FeedPage } from './features/feed'
import { SettingsPage } from './features/settings'
import { PhotoPage } from './features/photo'
import { UserPage } from './features/user'


export const Routes = () => (
  <Fragment>
    <Switch>
      <Route path="/" exact component={FeedPage} />
      <Route path="/@:username" exact component={UserPage} />
      <Route path="/@:username/i/:image" exact component={UserPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route component={NotFountPage} />
    </Switch>
    <PopupRoutes />
  </Fragment>
)

export const PopupRoutes = () => (
  <Switch>
    <Route path="/@:username/i/:image" exact component={PhotoPage} />
  </Switch>
)

