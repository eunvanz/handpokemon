import * as ActionTypes from '../constants/constants';
import Config from '../../../server/config';
import fetch from 'isomorphic-fetch';
import $ from 'jquery';

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

// LoginModal
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

// MessageModal
export function getMessageModalStatus() {
  return {
    type: ActionTypes.GET_MESSAGE_MODAL_STATUS,
  };
}

export function showMessageModal() {
  return {
    type: ActionTypes.SHOW_MESSAGE_MODAL,
  };
}

export function hideMessageModal() {
  return {
    type: ActionTypes.HIDE_MESSAGE_MODAL,
  };
}

export function prepareMessageModal(message) {
  return {
    type: ActionTypes.PREPARE_MESSAGE_MODAL,
    message,
  };
}

// appMounted
export function checkAppMounted() {
  return {
    type: ActionTypes.CHECK_APP_MOUNTED,
  };
}

export function getAppMounted() {
  return {
    type: ActionTypes.GET_APP_MOUNTED,
  };
}

// user session
export function getUserSession(user) {
  return {
    type: ActionTypes.GET_USER_SESSION,
    user,
  };
}

export function fetchUserSession() {
  console.log('fetching user session');
  return (dispatch) => {
    return $.ajax({
      url: `${baseURL}/api/session-user`,
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      success: (response) => {
        console.log('user: ' + response.user);
        dispatch(getUserSession(response.user));
      },
    });
    // return fetch(`${baseURL}/api/session-user`, { credentials: 'include' })
    // .then((response) => response.json())
    // .then((response) => dispatch(getBasicPickMons(response.user)));
  };
}

export function getCollectionUser(collectionUser) {
  return {
    type: ActionTypes.GET_COLLECTION_USER,
    collectionUser,
  };
}

export function fetchCollectionUser(collectionUserId) {
  return (dispatch) => {
    console.log('collectionUserId: ' + collectionUserId);
    return fetch(`${baseURL}/api/users/${collectionUserId}`, {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
    .then((response) => response.json())
    .then((response) => dispatch(getCollectionUser(response.user)));
  };
}

export function getMonsterCountInfo(monsterCountInfo) {
  return {
    type: ActionTypes.GET_MONSTER_COUNT_INFO,
    monsterCountInfo,
  };
}

export function fetchMonsterCountInfo() {
  return (dispatch) => {
    return fetch(`${baseURL}/api/monsters/count-info`)
    .then((response) => response.json())
    .then((response) => dispatch(getMonsterCountInfo(response.monsterCountInfo)));
  };
}

export function getCollectionCountInfo(collectionCountInfo) {
  return {
    type: ActionTypes.GET_MONSTER_COUNT_INFO,
    collectionCountInfo,
  };
}

export function fetchCollectionCountInfo(userId) {
  return (dispatch) => {
    return fetch(`${baseURL}/api/collections/count-info/${userId}`)
    .then((response) => response.json())
    .then((response) => dispatch(getCollectionCountInfo(response.collectionCountInfo)));
  };
}

export function getDesigners(designers) {
  return {
    type: ActionTypes.GET_DESIGNERS,
    designers,
  };
}

export function fetchDesigners() {
  return (dispatch) => {
    return fetch(`${baseURL}/api/designers`)
    .then((response) => response.json())
    .then((response) => dispatch(getDesigners(response.designers)));
  };
}
