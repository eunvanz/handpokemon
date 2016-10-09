import * as ActionTypes from '../constants/constants';

export const workshops = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.SET_WORKSHOPS :
      return action.workshops;
    default:
      return state;
  }
};
