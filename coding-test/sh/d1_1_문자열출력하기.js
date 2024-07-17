const readline = require('readline'); //readline 모듈 import //readline:입출력관련모듈

//입출력을 위한 인터페이스 객체 생성
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];

rl.on('line', function (line) {
    //한줄 씩 입력받은 후 실행할 코드
    //입력된 값은 line에 저장됨
    input = [line];
}).on('close',function(){
    //입력이 끝난 후 실행할 코드
    str = input[0];
    console.log(str)
});