import * as ActionTypes from '../constants/constants';

export const session = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.GET_USER_SESSION :
      return action.session;
    default:
      return state;
  }
};
