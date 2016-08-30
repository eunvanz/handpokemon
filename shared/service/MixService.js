// 교배시 확률 저장 변수
export const rateLimitRare = [40]; // 교배시 레어 확률 40%
export const rateLimitElite = [10, 60]; // 교배시 엘리트 10%, 레어 50%
export const rateLimitLegend = [10, 60, 80]; // 교배시 레전드 10%, 엘리트 50%, 레어 20%

// 특정 조합 교배시 교배 결과 체크하여 monNo로 반환
export function getSpecialMixResult(monNo1, monNo2) {
  const combinations = [[79, 90]]; // monNo 조합 [[야돈, 셀러]]
  const results = [[80, 199]]; // 결과 (index에 매핑) [[야도란, 야도킹]]
  let result = null;
  for (let index = 0; index < combinations.length; index++) {
    if (combinations[index].indexOf(monNo1) > -1 && combinations[index].indexOf(monNo2) > -1) {
      result = results[index];
      if (result.length > 1) {
        const i = Math.floor(Math.random() * result.length);
        result = result[i];
      } else {
        result = result[0];
      }
    }
  }
  return result;
}
