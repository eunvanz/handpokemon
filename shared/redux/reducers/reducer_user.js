import * as ActionTypes from '../constants/constants';

export const user = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.GET_USER_SESSION :
      return action.user;
    default:
      return state;
  }
};
