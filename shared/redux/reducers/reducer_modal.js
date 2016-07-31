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

export const showMessageModal = (state = { status: false, message: '', confirmAction: null }, action) => {
  switch (action.type) {
    case ActionTypes.GET_MESSAGE_MODAL_STATUS :
      return state;
    case ActionTypes.SHOW_MESSAGE_MODAL :
      return Object.assign({}, state, { status: true });
    case ActionTypes.HIDE_MESSAGE_MODAL :
      return Object.assign({}, state, { status: false, message: '', confirmAction: null });
    case ActionTypes.PREPARE_MESSAGE_MODAL :
      return Object.assign({}, state, { message: action.message });
    case ActionTypes.PREPARE_MESSAGE_MODAL_CONFIRM_ACTION :
      return Object.assign({}, state, { confirmAction: action.confirmAction });
    default :
      return state;
  }
};
