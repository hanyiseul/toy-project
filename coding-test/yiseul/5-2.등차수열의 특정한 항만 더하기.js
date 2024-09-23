/**
 * 두 정수 a, d와 길이가 n인 boolean 배열 included가 주어집니다. 첫째항이 a, 공차가 d인 등차수열에서 included[i]가 i + 1항을 의미할 때, 이 등차수열의 1항부터 n항까지 included가 true인 항들만 더한 값을 return 하는 solution 함수를 작성해 주세요.
 * 
 * 제한사항
  - 1 ≤ a ≤ 100
  - 1 ≤ d ≤ 100
  - 1 ≤ included의 길이 ≤ 100
  - included에는 true가 적어도 하나 존재합니다.
 * 
 */

function solution(a, d, included) {
    var answer = 0;
        
    // 두 정수 a, d와 길이가 n인 boolean 배열 included가 주어집니다.
    // Number(a,b) included.length
    
    // 첫째항이 a, 공차가 d인 등차수열에서 included[i]가 i + 1항을 의미할 때, 
    
    for(let i = 0; i < included.length; i++) {
    // 이 등차수열의 1항부터 n항까지 included가 true인 항들만 더한 값을 return 하는
        if(included[i] === true) {
            answer += a + d*i
            console.log(answer)
        }
    }

    return answer; 
}

// reduce 사용 가능

/**
 * reduce
    배열.reduce(callback(accumulator, currentValue, index, array), initialValue)

    - accumulator : 누적값, 배열을 순회하면서 작업의 처리 결과를 누적하는 값으로 순회가 종료되면 최종리텅
    - currentValue : 처리할 현재 요소
    - currentIndex(선택) : 처리할 현재 요소의 인덱스, initalValue 제공시 0 또는 1부터 시작
    - array(선택) : reduce가 순회하는 array 배열
 * 
 * 
 */



  // const answer = 