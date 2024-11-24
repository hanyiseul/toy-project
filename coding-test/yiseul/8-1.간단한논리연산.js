/****
 * 
 * boolean 변수 x1, x2, x3, x4가 매개변수로 주어질 때, 다음의 식의 true/false를 return 하는 solution 함수를 작성해 주세요.
   (x1 ∨ x2) ∧ (x3 ∨ x4)
 * 
 * 
 */

function solution(x1, x2, x3, x4) {
  return (x1||x2) && (x3||x4);
}

