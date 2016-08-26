import * as ActionTypes from '../constants/constants';

export const baseMons = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.GET_BASE_MONS :
      return action.baseMons;
    default:
      return state;
  }
};

export const allMons = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_MONS :
      return action.allMons;
    default:
      return state;
  }
};

export const mon = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.GET_ONE_MON :
      return action.mon;
    case ActionTypes.RESET_MON :
      return action.mon;
    default:
      return state;
  }
};

export const pickedMons = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.GET_BASIC_PICK_MONS :
      return action.pickedMons;
    default:
      return state;
  }
};

export const selectedMons = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_SELECTED_MON :
      return [...state, action.mon];
    case ActionTypes.REMOVE_SELECTED_MON :
      const collectionIdIdx = state.indexOf(action.mon);
      const updatedSelectedMons = state;
      updatedSelectedMons.splice(collectionIdIdx, 1);
      return updatedSelectedMons;
    case ActionTypes.CLEAR_SELECTED_MONS :
      return [];
    default :
      return state;
  }
};

export const monsterCountInfo = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.GET_MONSTER_COUNT_INFO :
      return action.monsterCountInfo;
    default:
      return state;
  }
};

export const designers = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.GET_DESIGNERS :
      return action.designers;
    default:
      return state;
  }
};
