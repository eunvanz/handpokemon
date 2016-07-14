import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './container/App';
import MainView from './container/MainView/MainView';
import RegisterMemberView from './container/RegisterMemberView/RegisterMemberView';
import RegisterMonsterView from './container/RegisterMonsterView/RegisterMonsterView';
import MonsterListView from './container/MonsterListView/MonsterListView';
import CollectionView from './container/CollectionView/CollectionView';
import GetMonView from './container/GetMonView/GetMonView';
import SelectDungeonView from './components/SelectDungeonView';
import requireAuth from './container/Authentication/Authentication';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={MainView}/>
    <Route path="/sign-up" component={RegisterMemberView}/>
    <Route path="/register-monster" component={RegisterMonsterView}/>
    <Route path="/mon-list" component={MonsterListView}/>
    <Route path="/mon-list/:monNo" component={RegisterMonsterView}/>
    <Route path="/collection/:collectionUserId" component={CollectionView}/>
    <Route path="/collection" component={requireAuth(CollectionView)}/>
    <Route path="/get-mon-ready" component={requireAuth(SelectDungeonView)}/>
    <Route path="/get-mon" component={requireAuth(GetMonView)}/>
  </Route>
);

export default routes;
