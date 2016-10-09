import Config from '../../server/config';
import axios from 'axios';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';

export function selectWorkshop(workshop) {
  return axios.get(`${baseURL}/api/workshops/${workshop._id}`);
}

export function updateOneLikes(workshop, user) {
  return selectWorkshop(workshop)
  .then(res => {
    const recentWorkshop = res.data.workshop;
    recentWorkshop.likes.push(user._id);
    return axios({
      method: 'put',
      url: `${baseURL}/api/workshops/${workshop._id}`,
      data: { workshop: Object.assign({}, workshop, { likes: recentWorkshop.likes }) },
    });
  });
}

export function deleteWorkshop(workshop) {
  return axios({
    method: 'delete',
    url: `${baseURL}/api/workshops/${workshop._id}`,
  });
}
