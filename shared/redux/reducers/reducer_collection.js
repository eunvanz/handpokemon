import * as ActionTypes from '../constants/constants';

export const collectionCountInfo = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.GET_COLLECTION_COUNT_INFO :
      return action.collectionCountInfo;
    default:
      return state;
  }
};

export const addedAbility = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.GET_ADDED_ABILITY :
      console.log('GET_ADDED_ABILITY', action.addedAbility);
      return action.addedAbility;
    default:
      return state;
  }
};
