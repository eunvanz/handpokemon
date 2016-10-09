export const leagues = [
  {
    name: '불지옥',
    maxCost: 11,
  },
  {
    name: '브론즈',
    maxCost: 12,
  },
  {
    name: '실버',
    maxCost: 13,
  },
  {
    name: '골드',
    maxCost: 14,
  },
  {
    name: '다이아',
    maxCost: 16,
  },
  {
    name: '에이스',
    maxCost: 18,
  },
  {
    name: '챔피온',
    maxCost: 20,
  },
  {
    name: '마스터',
    maxCost: 22,
  },
  {
    name: '레전드',
    maxCost: 24,
  },
];

export const leagueIcons = [
  'fa fa-fire text-danger',
  'fa fa-star text-bronze',
  'fa fa-star text-silver',
  'fa fa-star text-gold',
  'fa fa-star text-info',
  'fa fa-trophy text-bronze',
  'fa fa-trophy text-silver',
  'fa fa-trophy text-gold',
  'fa fa-trophy text-info',
];

export const leaguePercentage = [0.8, 0.6, 0.4, 0.2, 0.0];

export const userImgRoute = '/img/user';
export const monsterImgRoute = '/img/monsters';
export const commonImgRoute = '/img/common';
export const workshopImgRoute = '/img/workshop';
export const userImgUploadRoute = './static/img/user/';
export const workshopImgUploadRoute = './static/img/workshop/';
export const monsterImgUploadRoute = './static/img/monsters/';

export const conditionVar = [0, 0.8, 0.9, 1, 1.1, 1.2];

export const attrIdx = ['노말', '불꽃', '물', '전기', '풀', '얼음', '격투', '독', '땅',
'비행', '염력', '벌레', '바위', '유령', '용', '악', '강철', '요정'];

export const attrMatch = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.9, 0.8, 1, 1, 0.9, 1],
  [1, 0.9, 0.9, 1, 1.2, 1.2, 1, 1, 1, 1, 1, 1.2, 0.9, 1, 0.9, 1, 1.2, 1],
  [1, 1.2, 0.9, 1, 0.9, 1, 1, 1, 1.2, 1, 1, 1, 1.2, 1, 0.9, 1, 1, 1],
  [1, 1, 1.2, 0.9, 0.9, 1, 1, 1, 0.8, 1.2, 1, 1, 1, 1, 0.9, 1, 1, 1],
  [1, 0.9, 1.2, 1, 0.9, 1, 1, 0.9, 1.2, 0.9, 1, 0.9, 1.2, 1, 0.9, 1, 0.9, 1],
  [1, 0.9, 0.9, 1, 1.2, 0.9, 1, 1, 1.2, 1.2, 1, 1, 1, 1, 1.2, 1, 0.9, 1],
  [1.2, 1, 1, 1, 1, 1.2, 1, 0.9, 1, 0.9, 0.9, 0.9, 1.2, 0.8, 1, 1.2, 1.2, 0.9],
  [1, 1, 1, 1, 1.2, 1, 1, 0.9, 0.9, 1, 1, 1, 0.9, 0.9, 1, 1, 0.8, 1.2],
  [1, 1.2, 1, 1.2, 0.9, 1, 1, 1.2, 1, 0.8, 1, 0.9, 1.2, 1, 1, 1, 1.2, 1],
  [1, 1, 1, 0.9, 1.2, 1, 1.2, 1, 1, 1, 1, 1.2, 0.9, 1, 1, 1, 0.9, 1],
  [1, 1, 1, 1, 1, 1, 1.2, 1.2, 1, 1, 0.9, 1, 1, 1, 1, 0.8, 0.9, 1],
  [1, 0.9, 1, 1, 1.2, 1, 0.9, 0.9, 1, 0.9, 1.2, 1, 1, 0.9, 1, 1.2, 0.9, 0.9],
  [1, 1.2, 1, 1, 1, 1.2, 0.9, 1, 0.9, 1.2, 1, 1.2, 1, 1, 1, 1, 0.9, 1],
  [0.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.2, 1, 1, 1.2, 1, 0.9, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.2, 1, 0.9, 0.8],
  [1, 1, 1, 1, 1, 1, 0.9, 1, 1, 1, 1.2, 1, 1, 1.2, 1, 0.9, 1, 0.9],
  [1, 0.9, 0.9, 0.9, 1, 1.2, 1, 1, 1, 1, 1, 1, 1.2, 1, 1, 1, 0.9, 1],
  [1, 0.9, 1, 1, 1, 1, 1.2, 0.9, 1, 1, 1, 1, 1, 1, 1.2, 1.2, 0.9, 1],
];

export const conditionPatterns = [
  [1, 1, 2, 3, 4, 5, 5, 4, 3, 2],
  [1, 1, 2, 3, 3, 3, 4, 4, 5, 4, 3, 2],
  [1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 4, 3, 2],
  [1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5, 4, 3, 2],
  [1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 4, 4, 3, 3, 2, 2],
  [1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 4, 4, 3, 3, 2, 2],
];

export const conditionNames = ['', '매우나쁨', '나쁨', '보통', '좋음', '매우좋음'];

export const statusNames = ['휴식필요', '회복중', '출전가능'];

/* eslint-disable */
export const honorClassName = {
  type1: 'label arrowed arrowed-right',
  '트레이너': 'label-yellow',
  '레인저': 'label-rare',
  '짐리더': 'label-adv',
  '챔피언': 'label-advr',
  '마스터': 'label-elite',
  type2: 'label arrowed-in arrowed-right',
  '노말': 'label-grey',
  '불꽃': 'label-danger',
  '물': 'label-primary',
  '전기': 'label-warning',
  '풀': 'label-success',
  '얼음': 'label-info',
  '비행': 'label-light',
  '요정': 'label-pink',
  '땅': 'label-inverse',
  '독': 'label-purple',
  '격투': 'label-fighter',
  '염력': 'label-esper',
  '벌레': 'label-bug',
  '바위': 'label-rock',
  '유령': 'label-ghost',
  '용': 'label-dragon',
  '악': 'label-evil',
  '강철': 'label-iron',
};
/* eslint-enable */
