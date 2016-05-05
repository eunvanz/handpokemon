import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './container/App';
import MainView from './container/MainView/MainView';
import RegisterMemberView from './container/RegisterMemberView/RegisterMemberView';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={MainView}/>
    <Route path="/sign-up" component={RegisterMemberView}/>
  </Route>
);

export default routes;
