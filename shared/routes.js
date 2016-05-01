import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './container/App';
import MainContainer from './container/MainContainer/MainContainer';
import PostDetailView from './container/PostDetailView/PostDetailView';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={MainContainer} />
    <Route path="/post/:slug" component={PostDetailView}/>
  </Route>
);

export default routes;
