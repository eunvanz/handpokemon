import Config from '../../server/config';
import axios from 'axios';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';

export function removeMonsterFromEntry(collection) {
  if (collection) {
    const collectionId = collection._id;
    const now = new Date();
    const date = new Date();
    date.setFullYear(now.getYear(), now.getMonth(), now.getDate());
    const condition = { entry: 0, status: 0, lastStatusUpdate: date };

    return axios({
      method: 'put',
      url: `${baseURL}/api/collections/${collectionId}`,
      data: { collection: condition },
    });
  }
  return new Promise(resolve => resolve());
}

export function addMonsterToEntry(entryNo, collection) {
  const collectionId = collection._id;
  const condition = { entry: entryNo };

  return axios({
    method: 'put',
    url: `${baseURL}/api/collections/${collectionId}`,
    data: { collection: condition },
  });
}

export function updateLevelWithStat(collection, levelToUpdate) {
  const resultCollection = Object.assign({}, collection);

  resultCollection.level += levelToUpdate;
  resultCollection.piece += levelToUpdate;

  let abilityIdx = 0;

  const isPlus = levelToUpdate > 0 ? true : false;

  let totalPointToUpadateAbility = collection._mon.point * levelToUpdate;
  if (!isPlus) totalPointToUpadateAbility *= -1;

  for (let i = 0; i < totalPointToUpadateAbility; i++) {
    abilityIdx = Math.floor((Math.random() * 6));
    if (isPlus) {
      if (abilityIdx === 0) {
        resultCollection.addedHp++;
      } else if (abilityIdx === 1) {
        resultCollection.addedPower++;
      } else if (abilityIdx === 2) {
        resultCollection.addedArmor++;
      } else if (abilityIdx === 3) {
        resultCollection.addedSpecialPower++;
      } else if (abilityIdx === 4) {
        resultCollection.addedSpecialArmor++;
      } else if (abilityIdx === 5) {
        resultCollection.addedDex++;
      }
    } else {
      if (abilityIdx === 0) {
        if (resultCollection.addedHp === 0) {
          i--;
          continue;
        } else {
          resultCollection.addedHp--;
        }
      } else if (abilityIdx === 1) {
        if (resultCollection.addedPower === 0) {
          i--;
          continue;
        } else {
          resultCollection.addedPower--;
        }
      } else if (abilityIdx === 2) {
        if (resultCollection.addedArmor === 0) {
          i--;
          continue;
        } else {
          resultCollection.addedArmor--;
        }
      } else if (abilityIdx === 3) {
        if (resultCollection.addedSpecialPower === 0) {
          i--;
          continue;
        } else {
          resultCollection.addedSpecialPower--;
        }
      } else if (abilityIdx === 4) {
        if (resultCollection.addedSpecialArmor === 0) {
          i--;
          continue;
        } else {
          resultCollection.addedSpecialArmor--;
        }
      } else if (abilityIdx === 5) {
        if (resultCollection.addedDex === 0) {
          i--;
          continue;
        } else {
          resultCollection.addedDex--;
        }
      }
    }
  }

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

export function updateCollectionImgIdx(collectionId, imgIdx) {
  return axios({
    method: 'put',
    url: `${baseURL}/api/collections/${collectionId}`,
    data: { collection: { imgIdx } },
  });
}
