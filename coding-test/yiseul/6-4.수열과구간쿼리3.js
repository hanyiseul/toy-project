/*****
 * 
 * 문제 설명
  정수 배열 arr와 2차원 정수 배열 queries이 주어집니다. queries의 원소는 각각 하나의 query를 나타내며, [i, j] 꼴입니다.
  각 query마다 순서대로 arr[i]의 값과 arr[j]의 값을 서로 바꿉니다.
  위 규칙에 따라 queries를 처리한 이후의 arr를 return 하는 solution 함수를 완성해 주세요.
 * 
  제한사항
    - 1 ≤ arr의 길이 ≤ 1,000
    - 0 ≤ arr의 원소 ≤ 1,000,000
    - 1 ≤ queries의 길이 ≤ 1,000
    - 0 ≤ i < j < arr의 길이
 * 
 */



function solution(arr, queries) {
  // 쿼리를 하나씩 처리합니다
  queries.forEach(([i, j]) => {
    // arr[i]와 arr[j]를 교환합니다
    [arr[i], arr[j]] = [arr[j], arr[i]];
  });
  // 모든 쿼리 처리 후 배열을 반환합니다
  return arr;
}
