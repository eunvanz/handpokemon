import * as ActionTypes from '../constants/constants';

export const appMounted = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.CHECK_APP_MOUNTED :
      return true;
    case ActionTypes.GET_APP_MOUNTED :
      return state;
    default :
      return state;
  }
};

export const loading = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_LOADING :
      return true;
    case ActionTypes.HIDE_LOADING :
      return false;
    default :
      return state;
  }
};

export const monInfoFlip = (state = true, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_MON_INFO_FRONT :
      return true;
    case ActionTypes.SHOW_MON_INFO_BACK :
      return false;
    default :
      return state;
  }
};
