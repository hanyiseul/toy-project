/****
 * 
 * 정수 배열 arr와 2차원 정수 배열 queries이 주어집니다. queries의 원소는 각각 하나의 query를 나타내며, [s, e, k] 꼴입니다.
  각 query마다 순서대로 s ≤ i ≤ e인 모든 i에 대해 k보다 크면서 가장 작은 arr[i]를 찾습니다. 
  각 쿼리의 순서에 맞게 답을 저장한 배열을 반환하는 solution 함수를 완성해 주세요. 
  단, 특정 쿼리의 답이 존재하지 않으면 -1을 저장합니다.


 * 
 * 제한사항
  - 1 ≤ arr의 길이 ≤ 1,000
  - 0 ≤ arr의 원소 ≤ 1,000,000
  - 1 ≤ queries의 길이 ≤ 1,000
  - 0 ≤ s ≤ e < arr의 길이
  - 0 ≤ k ≤ 1,000,000
 * 
 * 
 */


function solution(arr, queries) {
  const results = [];

  for (const [s, e, k] of queries) {
      // s부터 e까지의 부분 배열을 추출
      const subArray = arr.slice(s, e + 1);
      
      // k보다 큰 값들만 필터링
      const filtered = subArray.filter(num => num > k);

      // 결과에서 최소값 찾기
      if (filtered.length > 0) {
          results.push(Math.min(...filtered));
      } else {
          results.push(-1);
      }
  }

  return results;
}