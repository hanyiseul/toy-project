/**
 * 문자열 my_string, overwrite_string과 정수 s가 주어집니다. 
 * 문자열 my_string의 인덱스 s부터 overwrite_string의 길이만큼을 문자열 overwrite_string으로 바꾼 문자열을 return 하는 solution 함수를 작성해 주세요.
 * 
 * 제한사항
    - my_string와 overwrite_string은 숫자와 알파벳으로 이루어져 있습니다.
    - 1 ≤ overwrite_string의 길이 ≤ my_string의 길이 ≤ 1,000
    - 0 ≤ s ≤ my_string의 길이 - overwrite_string의 길이
 */

function solution(my_string, overwrite_string, s) {
  const arr = [...my_string] // 받은 문자열을 스프레드 연산자를 사용하여 배열로 나열
  arr.splice(s, overwrite_string.length, overwrite_string) // splice(인덱스 ~부터, 몇개의 값을, 대체할 배열)
  return arr.join('')
  
}