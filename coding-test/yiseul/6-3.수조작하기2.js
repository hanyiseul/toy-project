/****
 * 
 * 정수 배열 numLog가 주어집니다. 처음에 numLog[0]에서 부터 시작해 "w", "a", "s", "d"로 이루어진 문자열을 입력으로 받아 순서대로 다음과 같은 조작을   했다고 합시다.

  "w" : 수에 1을 더한다.
  "s" : 수에 1을 뺀다.
  "d" : 수에 10을 더한다.
  "a" : 수에 10을 뺀다.
  그리고 매번 조작을 할 때마다 결괏값을 기록한 정수 배열이 numLog입니다. 즉, numLog[i]는 numLog[0]로부터 총 i번의 조작을 가한 결과가 저장되어 있습니다.

  주어진 정수 배열 numLog에 대해 조작을 위해 입력받은 문자열을 return 하는 solution 함수를 완성해 주세요.
 * 
 * 제한사항
    - 2 ≤ numLog의 길이 ≤ 100,000
    - -100,000 ≤ numLog[0] ≤ 100,000
    - 1 ≤ i ≤ numLog의 길이인 모든 i에 대해 |numLog[i] - numLog[i - 1]|의 값은 1 또는 10입니다.
 * 
 */

function solution(numLog) {
  var answer = '';
  
  for(let i = 0; i<numLog.length; i++) {
      if(numLog[i] - numLog[i-1] == 1) {
          answer += "w"
      } else if(numLog[i] - numLog[i-1] == -1) {
          answer += "s"
      } else if(numLog[i] - numLog[i-1] == 10) {
          answer += "d"
      } else if(numLog[i] - numLog[i-1] == -10) {
          answer += "a"
      }
  }
  return answer;
}

function solution(numLog) {
    // 변환을 위한 매핑 객체 정의
    const convert = {
        '1': 'w', '-1': 's', '10': 'd', '-10': 'a'
    };

    // numLog 배열의 두 번째 요소부터 끝까지 순회하며 변환 수행
    return numLog.slice(1).map((v, i) => {
        // 현재 요소 v와 그 이전 요소 numLog[i]의 차이를 구하고,
        // 그 차이에 해당하는 문자를 convert 객체를 통해 변환
        return convert[v - numLog[i]];
    }).join(''); // 변환된 문자들을 연결하여 하나의 문자열로 반환
}
