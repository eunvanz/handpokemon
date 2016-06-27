import * as ActionTypes from '../constants/constants';

export const collectionCountInfo = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.GET_COLLECTION_COUNT_INFO :
      return action.collectionCountInfo;
    default:
      return state;
  }
};
