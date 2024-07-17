/**
 * 정수 a와 b가 주어집니다. 각 수를 입력받아 입출력 예와 같은 형식으로 출력하는 코드를 작성해 보세요.
 *  제한사항 : -100,000 ≤ a, b ≤ 100,000
 */

const readline = require('readline'); // 표준 입출력 사용하여 인터페이스를 만드는 모듈
const rl = readline.createInterface({ // 인터페이스 생성
    input: process.stdin, // 표준 입력 스트림
    output: process.stdout // 표준 출력 스트림
});

let input = []; // 입력 저장할 input 선언

rl.on('line', function (line) { // line 이벤트리스너(한줄 입력하고 엔터키 누르면 이벤트 발생) 등록
    input = line.split(' '); // 공백을 기준으로 분할하여 배열에 저장
}).on('close', function () { // close(인터페이스가 종료되면 이벤트 발생) 이벤트 등록
    console.log(`a = ${Number(input[0])} \nb = ${Number(input[1])}`) // 숫자로 변환하여 출력
});