import * as ActionTypes from '../constants/constants';

export const battleInfo = (state = { firstAttack: 0, result: null }, action) => {
  switch (action.type) {
    case ActionTypes.GET_FIRST_ATTACK_FLAG :
      return Object.assign({}, state, { firstAttack: action.flag });
    case ActionTypes.GET_BATTLE_RESULT :
      return Object.assign({}, state, { result: action.result });
    default:
      return state;
  }
};

export const gameSpeed = (state = '1', actions) => {
  switch (actions.type) {
    case ActionTypes.GET_GAME_SPEED:
      return actions.number;
    default:
      return state;
  }
};
