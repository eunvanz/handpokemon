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
  console.log('콜점 변화', pointToUpdate);
  return axios({
    method: 'put',
    url: `${baseURL}/api/users/${user._id}`,
    data: { user: { colPoint: resultUser.colPoint } },
  });
}
