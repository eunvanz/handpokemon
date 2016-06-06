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
      // console.log('reducer_mon.GET_ONE_MON : ' + action.mon);
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
