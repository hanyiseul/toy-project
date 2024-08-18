/**
 * 연산 ⊕는 두 정수에 대한 연산으로 두 정수를 붙여서 쓴 값을 반환합니다. 예를 들면 다음과 같습니다.
    - 12 ⊕ 3 = 123
    - 3 ⊕ 12 = 312
   양의 정수 a와 b가 주어졌을 때, a ⊕ b와 2 * a * b 중 더 큰 값을 return하는 solution 함수를 완성해 주세요.
   단, a ⊕ b와 2 * a * b가 같으면 a ⊕ b를 return 합니다.
 
 * 제한사항
    - 1 ≤ a, b < 10,000
 */

function solution(a, b) {
  return Math.max(`${a}${b}`) > 2*a*b ? Math.max(`${a}${b}`) : 2*a*b
}