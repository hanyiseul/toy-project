/****
 * 
 * 정수 리스트 num_list가 주어질 때, 마지막 원소가 그전 원소보다 크면 마지막 원소에서 그전 원소를 뺀 값을 마지막 원소가 그전 원소보다 크지 않다면 마지막 원소를 두 배한 값을 추가하여 return하도록 solution 함수를 완성해주세요.
 * 
 * 
 * 제한사항
    - 2 ≤ num_list의 길이 ≤ 10
    - 1 ≤ num_list의 원소 ≤ 9
 * 
 */


function solution(num_list) {
  var answer = 0;
  
  if(num_list.at(-2) < num_list.at(-1)) { // 마지막 원소가 그전 원소보다 크면 
      // 마지막 원소에서 그전 원소를 뺀 값
      answer = (num_list.at(-1)) - (num_list.at(-2))
  } else { // 마지막 원소가 그전 원소보다 크지 않다면
      // 마지막 원소를 두 배한 값을 추가
      answer = (num_list.at(-1)) *2 
  }
  // 값 추가
  num_list.push(answer)
  
  return num_list;
}