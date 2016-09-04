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
      return action.addedAbility;
    default:
      return state;
  }
};

export const entryAsIs = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_ENTRY_AS_IS :
      const newState = [...state, action.info];
      return newState;
    case ActionTypes.CLEAR_ENTRY_AS_IS :
      return [];
    default :
      return state;
  }
};

export const entryToBe = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_ENTRY_TO_BE :
      const newState = [...state, action.info];
      return newState;
    case ActionTypes.CLEAR_ENTRY_TO_BE :
      return [];
    default :
      return state;
  }
};

export const entryState = (state = { entry1: [], entry2: [], entry3: [] }, action) => {
  switch (action.type) {
    case ActionTypes.GET_ENTRY_STATE :
      return action.entryState;
    default :
      return state;
  }
};
