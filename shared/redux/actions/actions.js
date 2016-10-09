import * as ActionTypes from '../constants/constants';
import Config from '../../../server/config';
import fetch from 'isomorphic-fetch';
import axios from 'axios';
import jwt from 'jwt-simple';
import * as MixService from '../../service/MixService';

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

export function clearAllMons() {
  return {
    type: ActionTypes.CLEAR_ALL_MONS,
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

export function prepareMessageModalConfirmAction(confirmAction) {
  return {
    type: ActionTypes.PREPARE_MESSAGE_MODAL_CONFIRM_ACTION,
    confirmAction,
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
  // console.log('fetching user session');
  return (dispatch) => {
    // If 'token' exists in localStorage - auto login
    // otherwise, return UserSession as null
    const token = localStorage.getItem('token');
    if (token) {
      const decodedJwt = jwt.decode(token, Config.secret);
      return fetch(`${baseURL}/api/users/${decodedJwt.sub}`)
      .then(response => response.json())
      .then(response => dispatch(getUserSession(response.user)));
    }
    return new Promise((resolve) => {
      dispatch(getUserSession(null));
      resolve();
    });
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

export function getAddedAbility(addedAbility) {
  return {
    type: ActionTypes.GET_ADDED_ABILITY,
    addedAbility,
  };
}

export function fetchOneMonWhenGet(user, mode, beforeId) {
  return (dispatch) => {
    let addedHp = 0;
    let addedPower = 0;
    let addedArmor = 0;
    let addedSpecialPower = 0;
    let addedSpecialArmor = 0;
    let addedDex = 0;
    let pickedMon = null;
    let url = null;
    if (mode === 'get') {
      // 채집의 경우 베이직 포켓몬 리스트를 가져옴
      // reward 가 getReward보다 클 경우는 레어와 베이직
      if (user.reward > user.getReward) {
        url = `${baseURL}/api/monsters/reward`;
      } else {
        url = `${baseURL}/api/monsters/b`;
      }
    } else if (mode === 'evolute') {
      // 진화의 경우 진화형 포켓몬 리스트를 가져옴
      url = `${baseURL}/api/monsters/${beforeId}/evolution`;
    } else if (mode === 'mix') {
      // 교배의 경우 교배 제약에 따라 포켓몬 리스트를 가져옴
      const mixLimit = beforeId;
      url = `${baseURL}/api/monsters/b`;
      const point = Math.floor(Math.random() * 100);
      if (mixLimit === 'r') {
        // 레어의 확률 40%
        if (point < MixService.rateLimitRare[0]) {
          url = `${baseURL}/api/monsters/r`;
        }
      } else if (mixLimit === 'e') {
        // 엘리트 확률 10%, 레어 확률 50%
        if (point < MixService.rateLimitElite[0]) {
          url = `${baseURL}/api/monsters/e`;
        } else if (point < MixService.rateLimitElite[1]) {
          url = `${baseURL}/api/monsters/r`;
        }
      } else if (mixLimit === 'l') {
        // 레전드 확률 10%, 엘리트 확률 50%, 레어 확률 20%
        if (point < MixService.rateLimitLegend[0]) {
          url = `${baseURL}/api/monsters/l`;
        } else if (point < MixService.rateLimitLegend[1]) {
          url = `${baseURL}/api/monsters/e`;
        } else if (point < MixService.rateLimitLegend[2]) {
          url = `${baseURL}/api/monsters/r`;
        }
      }
    } else if (mode === 'specialMix') {
      const specialMixMonNo = beforeId;
      url = `${baseURL}/api/monsters/${specialMixMonNo}`;
    }
    return fetch(url)
    // 리스트 중에서 하나 선택
    .then(response => response.json())
    .then(response => {
      if (response.mon) pickedMon = response.mon;
      const basicMons = response.mons;
      if (typeof basicMons === 'object') {
        const size = basicMons.length;
        const index = Math.floor(Math.random() * size);
        pickedMon = basicMons[index];
      }
      // 유저가 가지고 있는 포켓몬인지 확인
      const userCollections = user._collections;
      let collectionId = null;
      let updatedUser = {};
      for (const collection of userCollections) {
        if (pickedMon.monNo === collection._mon.monNo) {
          collectionId = collection._id;
          break;
        }
      }
      // 유저의 마지막 채집시간 기록 및 크레딧 차감
      if (mode === 'get') {
        if (user.reward <= user.getReward) {
          const interval = Date.now() - user.lastGetTime;
          updatedUser = Object.assign(updatedUser, { getCredit: user.getCredit });
          updatedUser.getCredit--;
          if (interval > user.getInterval) updatedUser.lastGetTime = Date.now();
        } else {
          updatedUser = Object.assign(updatedUser, { getReward: user.getReward + 1 });
        }
      }
      // 가지고 있는 포켓몬일 경우 레벨 업
      if (collectionId) {
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
        dispatch(getAddedAbility({ addedHp, addedPower, addedArmor, addedSpecialPower, addedSpecialArmor, addedDex }));
      } else {
        updatedUser.colPoint = user.colPoint + pickedMon.point;
      }
      return { collectionId, updatedUser };
    })
    .then(rtnObj => {
      const collectionId = rtnObj.collectionId;
      const updatedUser = rtnObj.updatedUser;
      // user 업데이트
      return axios({
        method: 'put',
        url: `${baseURL}/api/users/${user._id}`,
        data: { user: Object.assign({ lastLogin: Date.now() }, updatedUser) },
      })
      .then(() => {
        // 이미 가지고 있는 포켓몬일 경우 스탯 상승
        if (collectionId) {
          return fetch(`${baseURL}/api/collections/${collectionId}`)
          .then(res => res.json())
          .then(res => {
            const collection = res.collection;
            collection.addedHp = collection.addedHp + addedHp;
            collection.addedPower = collection.addedPower + addedPower;
            collection.addedArmor = collection.addedArmor + addedArmor;
            collection.addedSpecialPower = collection.addedSpecialPower + addedSpecialPower;
            collection.addedSpecialArmor = collection.addedSpecialArmor + addedSpecialArmor;
            collection.addedDex = collection.addedDex + addedDex;
            collection.level = collection.level + 1;
            collection.piece = collection.piece + 1;
            return collection;
          })
          .then(collection => {
            return axios({
              method: 'put',
              url: `${baseURL}/api/collections/${collection._id}`,
              data: { collection },
            })
            .then(res => {
              dispatch(getOneMon(res.data.collection));
            });
          });
        }
        // 새로운 포켓몬일 경우에는 콜렉션 입력
        return axios({
          method: 'post',
          url: `${baseURL}/api/collections`,
          data: { userId: user._id, monId: pickedMon._id },
        })
        .then(postCollectionRes => {
          return axios({
            method: 'put',
            url: `${baseURL}/api/users/${user._id}`,
            data: { user: null, addedCollections: [postCollectionRes.data.collection._id] },
          })
          .then(putUserRes => {
            const mon = putUserRes.data.user._collections[putUserRes.data.user._collections.length - 1];
            dispatch(getOneMon(mon));
          });
        });
      });
    });
  };
}

export function minusGetCredit() {
  return (dispatch) => {
    return axios.get(`${baseURL}/api/minus-get-credit`)
    .then(res => {
      dispatch(getUserSession(res.user));
    });
  };
}

export function login(email, password, remember) {
  return dispatch => {
    return axios({
      url: `${baseURL}/api/login`,
      method: 'post',
      data: { email, password },
    })
    .then(res => {
      if (remember) localStorage.setItem('token', res.data.token);
      const decodedJwt = jwt.decode(res.data.token, Config.secret);
      return fetch(`${baseURL}/api/users/${decodedJwt.sub}`)
      .then(response => response.json())
      .then(response => dispatch(getUserSession(response.user)));
    });
  };
}

export function logout() {
  return dispatch => {
    return new Promise((resolve) => {
      dispatch(getUserSession(null));
      resolve();
    });
  };
}

export function showMonInfoFront() {
  return {
    type: ActionTypes.SHOW_MON_INFO_FRONT,
  };
}

export function showMonInfoBack() {
  return {
    type: ActionTypes.SHOW_MON_INFO_BACK,
  };
}

export function addSelectedMon(mon) {
  return {
    type: ActionTypes.ADD_SELECTED_MON,
    mon,
  };
}

export function removeSelectedMon(mon) {
  return {
    type: ActionTypes.REMOVE_SELECTED_MON,
    mon,
  };
}

export function clearSelectedMons() {
  return {
    type: ActionTypes.CLEAR_SELECTED_MONS,
  };
}

export function setBeforeAction(action) {
  return {
    type: ActionTypes.SET_BEFORE_ACTION,
    action,
  };
}

export function setMenu(menu) {
  return {
    type: ActionTypes.SET_MENU,
    menu,
  };
}

export function addEntryAsIs(entryNo, monster) {
  return {
    type: ActionTypes.ADD_ENTRY_AS_IS,
    info: { entryNo, monster },
  };
}

export function addEntryToBe(entryNo, monster) {
  return {
    type: ActionTypes.ADD_ENTRY_TO_BE,
    info: { entryNo, monster },
  };
}

export function clearEntryAsIs() {
  return {
    type: ActionTypes.CLEAR_ENTRY_AS_IS,
  };
}

export function clearEntryToBe() {
  return {
    type: ActionTypes.CLEAR_ENTRY_TO_BE,
  };
}

export function getEntryState(entryState) {
  return {
    type: ActionTypes.GET_ENTRY_STATE,
    entryState,
  };
}

export function fetchEntryState(userId) {
  return (dispatch) => {
    return axios.get(`${baseURL}/api/users/${userId}`)
    .then(res => {
      const allCollection = res.data.user._collections;
      const entry1 = allCollection.filter(collection => { return collection.entry === 1; });
      const entry2 = allCollection.filter(collection => { return collection.entry === 2; });
      const entry3 = allCollection.filter(collection => { return collection.entry === 3; });
      const entryState = { entry1, entry2, entry3 };
      dispatch(getEntryState(entryState));
    });
  };
}

export function getUsers(users) {
  return {
    type: ActionTypes.GET_USERS,
    users,
  };
}

export function addUsers(users) {
  return {
    type: ActionTypes.ADD_USERS,
    users,
  };
}

export function clearUsers() {
  return {
    type: ActionTypes.CLEAR_USERS,
  };
}

export function fetchUsersForRank(category, page) {
  let url = '';
  if (category === 'collection') url = `${baseURL}/api/users/order-by-col-point/${page}`;
  else if (category === 'battle') url = `${baseURL}/api/users/order-by-battle-point/${page}`;
  return (dispatch) => {
    return axios.get(url)
    .then(res => {
      dispatch(getUsers(res.data.users));
    });
  };
}

export function attachUsersForRank(category, page) {
  let url = '';
  if (category === 'collection') url = `${baseURL}/api/users/order-by-col-point/${page}`;
  else if (category === 'battle') url = `${baseURL}/api/users/order-by-battle-point/${page}`;
  return (dispatch) => {
    return axios.get(url)
    .then(res => {
      dispatch(addUsers(res.data.users));
    });
  };
}

export function fetchCollectionsForRank(page) {
  return (dispatch) => {
    return axios.get(`${baseURL}/api/collections/order-by-total-ability/${page}`)
    .then(res => {
      dispatch(getAllMons(res.data));
    });
  };
}

export function getRival(user) {
  return {
    type: ActionTypes.GET_RIVAL,
    user,
  };
}

export function fetchRivalForLeague(user) {
  return (dispatch) => {
    return axios.get(`${baseURL}/api/users/league/${user.league}`) // 같은 리그 유저의 ID만 가져옴
    .then(res => {
      const users = res.data.users;
      const filteredUsers = users.filter(item => user._id !== item._id);
      const usersSize = filteredUsers.length;
      // 같은 리그에 유저가 없을경우 불지옥 리그에서 유저 가져옴
      if (usersSize === 0) {
        return axios.get(`${baseURL}/api/users/league/0`)
        .then(res2 => {
          const users2 = res2.data.users;
          const filteredUsers2 = users2.filter(item => user._id !== item._id);
          const usersSize2 = filteredUsers.length;
          const rival = filteredUsers2[Math.floor(Math.random() * usersSize2)];
          return axios.get(`${baseURL}/api/users/${rival._id}`);
        });
      }
      const rival = filteredUsers[Math.floor(Math.random() * usersSize)];
      return axios.get(`${baseURL}/api/users/${rival._id}`);
    })
    .then(res => {
      const rival = res.data.user;
      dispatch(getRival(rival));
    });
  };
}

export function fetchRival(user) {
  return (dispatch) => {
    return axios.get(`${baseURL}/api/users/${user._id}`)
    .then(response => dispatch(getRival(response.data.user)));
  };
}

export function getUserEntryForBattle(entry) {
  return {
    type: ActionTypes.GET_USER_ENTRY_FOR_BATTLE,
    entry,
  };
}

export function getRivalEntryForBattle(entry) {
  return {
    type: ActionTypes.GET_RIVAL_ENTRY_FOR_BATTLE,
    entry,
  };
}

export function clearUserEntryForBattle() {
  return {
    type: ActionTypes.CLEAR_USER_ENTRY_FOR_BATTLE,
  };
}

export function clearRivalEntryForBattle() {
  return {
    type: ActionTypes.CLEAR_RIVAL_ENTRY_FOR_BATTLE,
  };
}

export function getFirstAttackFlag(flag) {
  return {
    type: ActionTypes.GET_FIRST_ATTACK_FLAG,
    flag,
  };
}

export function getBattleResult(result) {
  return {
    type: ActionTypes.GET_BATTLE_RESULT,
    result,
  };
}

export function getGameSpeed(number) {
  return {
    type: ActionTypes.GET_GAME_SPEED,
    number,
  };
}

export function setHonors(honors) {
  return {
    type: ActionTypes.SET_HONORS,
    honors,
  };
}

export function fetchHonors() {
  return (dispatch) => {
    return axios.get(`${baseURL}/api/honors`)
    .then(res => {
      dispatch(setHonors(res.data.honors));
    });
  };
}

export function setWorkshops(workshops) {
  return {
    type: ActionTypes.SET_WORKSHOPS,
    workshops,
  };
}

export function fetchWorkshopItems() {
  return dispatch => {
    return axios.get(`${baseURL}/api/workshops`)
    .then(res => {
      dispatch(setWorkshops(res.data.workshops));
    });
  };
}
