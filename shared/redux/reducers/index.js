import { combineReducers } from 'redux';
import { baseMons, allMons, mon, pickedMons, monsterCountInfo, designers, selectedMons } from './reducer_mon';
import { showLoginModal, showMessageModal } from './reducer_modal';
import { appMounted, monInfoFlip, beforeAction, menu } from './reducer_common';
import { user, collectionUser, users, rival } from './reducer_user';
import { collectionCountInfo, addedAbility, entryAsIs, entryToBe, entryState, userEntryForBattle, rivalEntryForBattle } from './reducer_collection';
import { battleInfo, gameSpeed } from './reducer_battle';

export default combineReducers({
  baseMons,
  allMons,
  mon,
  showLoginModal,
  pickedMons,
  showMessageModal,
  appMounted,
  user,
  collectionUser,
  monsterCountInfo,
  collectionCountInfo,
  designers,
  monInfoFlip,
  addedAbility,
  selectedMons,
  beforeAction,
  menu,
  entryAsIs,
  entryToBe,
  entryState,
  users,
  rival,
  userEntryForBattle,
  rivalEntryForBattle,
  battleInfo,
  gameSpeed,
});
