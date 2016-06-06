import * as ActionTypes from '../constants/constants';

export const showLoginModal = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.GET_LOGIN_MODAL_STATUS :
      return state;
    case ActionTypes.SHOW_LOGIN_MODAL :
      return true;
    case ActionTypes.HIDE_LOGIN_MODAL :
      return false;
    default :
      return state;
  }
};
