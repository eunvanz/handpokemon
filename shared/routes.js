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
import GetMonImpossibleView from './components/GetMonImpossibleView';
import requireAuth from './container/Authentication/Authentication';
import SelectableMonView from './container/CollectionView/SelectableMonView';
import EntryView from './container/CollectionView/EntryView';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={MainView}/>
    <Route path="/sign-up" component={RegisterMemberView}/>
    <Route path="/register-monster" component={RegisterMonsterView}/>
    <Route path="/mon-list" component={MonsterListView}/>
    <Route path="/mon-list/:monNo" component={RegisterMonsterView}/>
    <Route path="/collection/:collectionUserId" component={CollectionView}/>
    <Route path="/get-mon-ready" component={requireAuth(SelectDungeonView)}/>
    <Route path="/get-mon" component={requireAuth(GetMonView)}/>
    <Route path="/get-mon-impossible" component={requireAuth(GetMonImpossibleView)}/>
    <Route path="/get-mon-multi" component={requireAuth(GetMonView)}/>
    <Route path="/evolution/:collectionId" component={requireAuth(GetMonView)}/>
    <Route path="/evolution2/:collectionId" component={requireAuth(GetMonView)}/>
    <Route path="/mix-mon" component={requireAuth(GetMonView)}/>
    <Route path="/mix-mon-ready" component={requireAuth(SelectableMonView)}/>
    <Route path="/evolute-mon-ready" component={requireAuth(SelectableMonView)}/>
    <Route path="/entry-ready" component={requireAuth(SelectableMonView)}/>
    <Route path="/entry/:collectionUserId" component={EntryView}/>
  </Route>
);

export default routes;
