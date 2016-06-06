import * as ActionTypes from '../constants/constants';
import Config from '../../../server/config';
import fetch from 'isomorphic-fetch';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';

export function getBaseMons(baseMons) {
  return {
    type: ActionTypes.GET_BASE_MONS,
    baseMons,
  };
}

export function getAllMons(allMons) {
  return {
    type: ActionTypes.GET_ALL_MONS,
    allMons,
  };
}

export function getOneMon(mon) {
  return {
    type: ActionTypes.GET_ONE_MON,
    mon,
  };
}

export function resetMon() {
  return {
    type: ActionTypes.RESET_MON,
    mon: null,
  };
}

export function getBasicPickMons(pickedMons) {
  return {
    type: ActionTypes.GET_BASIC_PICK_MONS,
    pickedMons,
  };
}

export function fetchAllMons() {
  return (dispatch) => {
    return fetch(`${baseURL}/api/monsters/all`)
    .then((response) => response.json())
    .then((response) => dispatch(getAllMons(response.allMons)));
  };
}

export function fetchBaseMons() {
  return (dispatch) => {
    return fetch(`${baseURL}/api/monsters/base-type`)
    .then((response) => response.json())
    .then((response) => dispatch(getBaseMons(response.baseMons)));
  };
}

export function fetchOneMon(monNo) {
  return (dispatch) => {
    return fetch(`${baseURL}/api/monsters/${monNo}`)
    .then((response) => response.json())
    .then((response) => {
      // console.log('action.fetchOneMon : ' + response.mon);
      dispatch(getOneMon(response.mon));
    });
  };
}

export function fetchBasicPickMons() {
  return (dispatch) => {
    return fetch(`${baseURL}/api/monsters/register-pick`)
    .then((response) => response.json())
    .then((response) => dispatch(getBasicPickMons(response.pickedMons)));
  };
}

export function getLoginModalStatus() {
  return {
    type: ActionTypes.GET_LOGIN_MODAL_STATUS,
  };
}

export function showLoginModal() {
  return {
    type: ActionTypes.SHOW_LOGIN_MODAL,
  };
}

export function hideLoginModal() {
  return {
    type: ActionTypes.HIDE_LOGIN_MODAL,
  };
}
