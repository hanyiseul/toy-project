/****
 * 
 * 
 * 
 * 정수가 담긴 리스트 num_list가 주어질 때, 모든 원소들의 곱이 모든 원소들의 합의 제곱보다 작으면 1을 크면 0을 return하도록 solution 함수를 완성해주세요.
 * 
 * 
 * 제한사항
    - 2 ≤ num_list의 길이 ≤ 10
    - 1 ≤ num_list의 원소 ≤ 9
 * 
    
 */

function solution(num_list) {
    var answer = 0;
    let a = 1; // 모든 원소들의 곱
    let b = 0 // 모든 원소들의 합의 제곱
    
    for(let i = 0; i < num_list.length; i++)  {
        // 모든 원소들의 곱
        a *= num_list[i]
        console.log('a', a)
        // 모든 원소들의 합
        b += num_list[i]
    }
    // 모든 원소들의 합의 제곱
    b = Math.pow(b, 2)
    

    return a < b ? answer = 1 : answer = 0;
}