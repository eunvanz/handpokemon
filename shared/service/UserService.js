import Config from '../../server/config';
import axios from 'axios';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';

export function updateGetCreditAndLastGetTime(user) {
  const updatedUser = Object.assign({}, user);
  const now = Date.now();
  const interval = now - user.lastGetTime;
  const credit = Math.floor(interval / user.getInterval);
  updatedUser.getCredit = user.getCredit + credit;
  if (updatedUser.getCredit > user.maxGetCredit) updatedUser.getCredit = user.maxGetCredit;
  updatedUser.getCredit--;
  updatedUser.lastGetTime = now;
  updatedUser.lastLogin = now;

  return axios({
    method: 'put',
    url: `${baseURL}/api/users/${user._id}`,
    data: { user: Object.assign({ lastLogin: Date.now() }, updatedUser) },
  });
}

export function updateColPoint(user, pointToUpdate) {
  const resultUser = Object.assign({}, user);
  resultUser.colPoint += pointToUpdate;
  return axios({
    method: 'put',
    url: `${baseURL}/api/users/${user._id}`,
    data: { user: { colPoint: resultUser.colPoint } },
  });
}

export function updateLastStatusUpdate(user) {
  const now = new Date();
  const date = new Date();
  date.setFullYear(now.getYear(), now.getMonth(), now.getDate());
  return axios({
    method: 'put',
    url: `${baseURL}/api/users/${user._id}`,
    data: { user: Object.assign({ lastStatusUpdate: date }, user) },
  });
}

export function updateUserToLose(user) {
  return axios({
    method: 'put',
    url: `${baseURL}/api/users/${user._id}`,
    data: { user: {
      loseBattle: user.loseBattle + 1,
      totalBattle: user.totalBattle + 1,
      lastBattleTime: Date.now(),
      battlePoint: user.battlePoint - 5,
      lastLogin: Date.now(),
    } },
  });
}

export function updateRivalToLose(user, missionPoint) {
  return axios({
    method: 'put',
    url: `${baseURL}/api/users/${user._id}`,
    data: { user: {
      loseBattle: user.loseBattle + 1,
      totalBattle: user.totalBattle + 1,
      battlePoint: user.battlePoint - 2 + missionPoint,
    } },
  });
}

export function updateRivalToWin(user, missionPoint) {
  return axios({
    method: 'put',
    url: `${baseURL}/api/users/${user._id}`,
    data: { user: {
      totalBattle: user.totalBattle + 1,
      winBattle: user.winBattle + 1,
      battlePoint: user.battlePoint + 2 + missionPoint,
    } },
  });
}

export function updateUserToWin(user, missionPoint, rewardCnt) {
  // 여기서 param으로 받는 user는 시합 시작시 updateUserToLose를 적용하기 전의 user임
  let maxWinInRow = user.maxWinInRow;
  if (user.winInRow + 1 > maxWinInRow) maxWinInRow = user.winInRow + 1;
  return axios({
    method: 'put',
    url: `${baseURL}/api/users/${user._id}`,
    data: { user: {
      loseBattle: user.loseBattle,
      winBattle: user.winBattle + 1,
      battlePoint: user.battlePoint + 10 + missionPoint,
      winInRow: user.winInRow + 1,
      maxWinInRow,
      reward: user.reward + rewardCnt,
    } },
  });
}

export function updateUserBattlePossible(user, flag) {
  return axios({
    method: 'put',
    url: `${baseURL}/api/users/${user._id}`,
    data: { user: { battlePossible: flag, entrySeq: 1 } },
  });
}

export function updateUserWhenMvp(user) {
  return axios({
    method: 'put',
    url: `${baseURL}/api/users/${user._id}`,
    data: { user: {
      battlePoint: user.battlePoint + 1,
    } },
  });
}

export function updateWinInRow(user, number) {
  return axios({
    method: 'put',
    url: `${baseURL}/api/users/${user._id}`,
    data: { user: {
      winInRow: number,
    } },
  });
}

export function updateUserEntryNext(user) {
  return axios({
    method: 'put',
    url: `${baseURL}/api/users/${user._id}`,
    data: { user: {
      entrySeq: user.entrySeq === 3 ? 1 : user.entrySeq + 1,
    } },
  });
}
