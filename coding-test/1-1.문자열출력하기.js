// 문자열 str이 주어질 때, str을 출력하는 코드를 작성해 보세요.

const readline = require('readline'); // readline 모듈을 불러옴 node.js에서 표준 입력과 표준 출력을 사용하여 인터페이스를 만드는데 사용됨
const rl = readline.createInterface({ // 인터페이스 생성
    input: process.stdin, // 표준 입력 스트림
    output: process.stdout // 표준 출력 스트림
}).on('line', console.log) // line 이벤트 리스너(엔터키를 눌러 한줄 입력) 등록, 콘솔 출력