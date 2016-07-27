import { combineReducers } from 'redux';
import { baseMons, allMons, mon, pickedMons, monsterCountInfo, designers } from './reducer_mon';
import { showLoginModal, showMessageModal } from './reducer_modal';
import { appMounted, loading, monInfoFlip } from './reducer_common';
import { user, collectionUser } from './reducer_user';
import { collectionCountInfo, addedAbility } from './reducer_collection';

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
  loading,
  monInfoFlip,
  addedAbility,
});
