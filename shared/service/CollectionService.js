import Config from '../../server/config';
import axios from 'axios';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';

export function updateLevelWithStat(collection, levelToUpdate) {
  const resultCollection = Object.assign({}, collection);

  resultCollection.level += levelToUpdate;
  resultCollection.piece += levelToUpdate;

  let addedHp = 0;
  let addedPower = 0;
  let addedArmor = 0;
  let addedSpecialPower = 0;
  let addedSpecialArmor = 0;
  let addedDex = 0;
  let abilityIdx = 0;

  const isPlus = levelToUpdate > 0 ? true : false;

  let totalPointToUpadateAbility = collection._mon.point * levelToUpdate;
  if (isPlus) totalPointToUpadateAbility *= -1;

  for (let i = 0; i < totalPointToUpadateAbility; i++) {
    abilityIdx = Math.floor((Math.random() * 6));
    if (abilityIdx === 0) {
      isPlus ? addedHp++ : addedHp--;
    } else if (abilityIdx === 1) {
      isPlus ? addedPower++ : addedPower--;
    } else if (abilityIdx === 2) {
      isPlus ? addedArmor++ : addedArmor--;
    } else if (abilityIdx === 3) {
      isPlus ? addedSpecialPower++ : addedSpecialPower--;
    } else if (abilityIdx === 4) {
      isPlus ? addedSpecialArmor++ : addedSpecialArmor--;
    } else if (abilityIdx === 5) {
      isPlus ? addedDex++ : addedDex--;
    }
  }
  resultCollection.addedHp += addedHp;
  resultCollection.addedPower += addedPower;
  resultCollection.addedArmor += addedArmor;
  resultCollection.addedSpecialPower += addedSpecialPower;
  resultCollection.addedSpecialArmor += addedSpecialArmor;
  resultCollection.addedDex += addedDex;

  return axios({
    method: 'put',
    url: `${baseURL}/api/collections/${resultCollection._id}`,
    data: { collection: resultCollection },
  });
}

export function deleteById(collectionId) {
  return axios({
    method: 'delete',
    url: `${baseURL}/api/collections/${collectionId}`,
  });
}

export function selectById(collectionId) {
  return axios.get(`${baseURL}/api/collections/${collectionId}`);
}
