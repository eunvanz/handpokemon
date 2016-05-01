import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './container/App';
import MainContainer from './container/MainContainer/MainContainer';
import RegisterMemberView from './container/RegisterMemberView/RegisterMemberView';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={MainContainer} />
    <Route path="/get/:slug" component={RegisterMemberView}/>
  </Route>
);

export default routes;
