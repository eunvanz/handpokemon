import * as ActionTypes from '../constants/constants';
import Config from '../../../server/config';
import fetch from 'isomorphic-fetch';
// import $ from 'jquery';
import axios from 'axios';


const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';

export function showLoading() {
  return {
    type: ActionTypes.SHOW_LOADING,
  };
}

export function hideLoading() {
  return {
    type: ActionTypes.HIDE_LOADING,
  };
}

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
  console.log('user', user);
  return {
    type: ActionTypes.GET_USER_SESSION,
    user,
  };
}

export function fetchUserSession() {
  // console.log('fetching user session');
  return (dispatch) => {
    return axios.get(`${baseURL}/api/cookie-user`)
    .then(res => {
      // 쿠키에 유저가 존재할 경우 자동 로그인
      if (!res.data.nouser) {
        axios({
          method: 'post',
          url: `${baseURL}/api/login`,
          data: { email: res.data.email, password: res.data.password },
        })
        .then(() => {
          axios.get(`${baseURL}/api/session-user`)
          .then(res2 => {
            dispatch(getUserSession(res2.data.user));
          });
        });
      } else {
        console.log('user not exist');
        dispatch(getUserSession(null));
      }
    });
    // return $.ajax({
    //   url: `${baseURL}/api/session-user`,
    //   method: 'get',
    //   headers: new Headers({
    //     'Content-Type': 'application/json',
    //   }),
    //   success: (response) => {
    //     // console.log('user: ' + response.user);
    //     dispatch(getUserSession(response.user));
    //   },
    // });
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
    // console.log('collectionUserId: ' + collectionUserId);
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

export function fetchOneMonWhenGet(user) {
  return (dispatch) => {
    // return axios.get(`${baseURL}/api/collections/get-mon`)
    // .then(res => {
    //   dispatch(getOneMon(res.mon));
    // });
    let addedHp = 0;
    let addedPower = 0;
    let addedArmor = 0;
    let addedSpecialPower = 0;
    let addedSpecialArmor = 0;
    let addedDex = 0;
    let pickedMon = null;
    // 베이직 포켓몬 리스트를 가져옴
    return fetch(`${baseURL}/api/monsters/b`)
    // 베이직 리스트 중에서 하나 선택
    .then(response => response.json())
    .then(response => {
      const basicMons = response.mons;
      const size = basicMons.length;
      const index = Math.floor(Math.random() * size);
      console.log('basicMons', basicMons);
      pickedMon = basicMons[index];
      console.log('pickedMon', pickedMon);
      // 유저가 가지고 있는 포켓몬인지 확인
      const userCollections = user._collections;
      let collectionId = null;
      let updatedUser = user;
      for (const collection of userCollections) {
        if (pickedMon.monNo === collection._mon.monNo) {
          collectionId = collection._id;
          break;
        }
      }
      // 유저의 마지막 채집시간 기록 및 크레딧 차감
      const interval = Date.now() - user.lastGetTime;
      const credit = Math.floor(interval / user.getInterval);
      updatedUser.getCredit += credit;
      if (user.getCredit > user.maxGetCredit) updatedUser.getCredit = updatedUser.maxGetCredit;
      updatedUser.getCredit--;
      updatedUser.lastGetTime = Date.now();
      // 가지고 있는 포켓몬일 경우 레벨 업
      if (collectionId) {
        console.log('collectionId', collectionId);
        let abilityIdx = 1;
        for (let i = 0; i < pickedMon.point; i++) {
          abilityIdx = Math.floor((Math.random() * 6));
          if (abilityIdx === 0) {
            addedHp++;
          } else if (abilityIdx === 1) {
            addedPower++;
          } else if (abilityIdx === 2) {
            addedArmor++;
          } else if (abilityIdx === 3) {
            addedSpecialPower++;
          } else if (abilityIdx === 4) {
            addedSpecialArmor++;
          } else if (abilityIdx === 5) {
            addedDex++;
          }
        }
      } else {
        updatedUser = user;
        updatedUser.colPoint++;
      }
      return { collectionId, updatedUser };
    })
    .then(rtnObj => {
      const collectionId = rtnObj.collectionId;
      const updatedUser = rtnObj.updatedUser;
      return axios({
        method: 'put',
        url: `${baseURL}/api/users/${updatedUser._id}`,
        data: { user: updatedUser },
      })
      .then(() => {
        console.log('updatedUser', updatedUser);
        if (collectionId) {
          return fetch(`${baseURL}/api/collections/${collectionId}`)
          .then(res => res.json())
          .then(res => {
            const collection = res.collection;
            console.log('collection', collection);
            collection.addedHp = collection.addedHp + addedHp;
            collection.addedPower = collection.addedPower + addedPower;
            collection.addedArmor = collection.addedArmor + addedArmor;
            collection.addedSpecialPower = collection.addedSpecialPower + addedSpecialPower;
            collection.addedSpecialArmor = collection.addedSpecialArmor + addedSpecialArmor;
            collection.addedDex = collection.addedDex + addedDex;
            collection.level = collection.level + 1;
            collection.piece = collection.piece + 1;
            console.log('collection3', collection);
            return collection;
          })
          .then(collection => {
            console.log('collection2', collection);
            return axios({
              method: 'put',
              url: `${baseURL}/api/collections/${collection._id}`,
              data: { collection },
            })
            .then(res => {
              console.log('레벨업한 포켓몬', res.data.collection);
              dispatch(getOneMon(res.data.collection));
            });
          });
        }
        return axios({
          method: 'post',
          url: `${baseURL}/api/collections`,
          data: { userId: user._id, monId: pickedMon._id },
        })
        .then(postCollectionRes => {
          return axios({
            method: 'put',
            url: `${baseURL}/api/users/${updatedUser._id}`,
            data: { user: null, addedCollections: [postCollectionRes.data.collection._id] },
          })
          .then(putUserRes => {
            const mon = putUserRes.data.user._collections[putUserRes.data.user._collections.length - 1];
            console.log('새로운 포켓몬', mon);
            dispatch(getOneMon(mon));
          });
        });
      });
    });
    // return $.ajax({
    //   url: `${baseURL}/api/collections/get-mon`,
    //   method: 'get',
    //   headers: new Headers({
    //     'Content-Type': 'application/json',
    //   }),
    //   success: (response) => {
    //     dispatch(getOneMon(response.mon));
    //   },
    // });
    // return fetch(`${baseURL}/api/collections/get-mon`)
    // .then((response) => response.json())
    // .then((response) => dispatch(getOneMon(response.mon)));
  };
}

export function minusGetCredit() {
  return (dispatch) => {
    return axios.get(`${baseURL}/api/minus-get-credit`)
    .then(res => {
      dispatch(getUserSession(res.user));
    });
    // return $.ajax({
    //   url: `${baseURL}/api/minus-get-credit`,
    //   method: 'get',
    //   headers: new Headers({
    //     'Content-Type': 'application/json',
    //   }),
    //   success: (response) => {
    //     dispatch(getUserSession(response.user));
    //   },
    // });
  };
}
