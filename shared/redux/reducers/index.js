import { combineReducers } from 'redux';
import { baseMons, allMons, mon, pickedMons } from './reducer_mon';
import { showLoginModal, showMessageModal } from './reducer_modal';
import { appMounted } from './reducer_common';

export default combineReducers({
  baseMons,
  allMons,
  mon,
  showLoginModal,
  pickedMons,
  showMessageModal,
  appMounted,
});
