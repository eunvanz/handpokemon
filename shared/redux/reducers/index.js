import { combineReducers } from 'redux';
import { baseMons, allMons, mon, pickedMons } from './reducer_mon';
import { showLoginModal } from './reducer_modal';

export default combineReducers({
  baseMons,
  allMons,
  mon,
  showLoginModal,
  pickedMons,
});
