import * as ActionTypes from '../constants/constants';

export const user = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.GET_USER_SESSION :
      return action.user;
    default:
      return state;
  }
};

export const collectionUser = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.GET_COLLECTION_USER :
      return action.collectionUser;
    default:
      return state;
  }
};

export const users = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.GET_USERS :
      return action.users;
    case ActionTypes.CLEAR_USERS :
      return {};
    case ActionTypes.ADD_USERS :
      return state.concat(action.users);
    default :
      return state;
  }
};

export const rival = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.GET_RIVAL :
      return action.user;
    default :
      return state;
  }
};
