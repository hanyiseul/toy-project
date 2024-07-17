const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];

rl.on('line', function (line) {
    input = line.split(' '); //공백을 기준으로 split
}).on('close', function () {
    str = input[0];
    n = Number(input[1]);
    
    //for 반복문 사용     
    let output = '';
    for(i=0; i<n; i++){
        output += str;
    }
    console.log(output); 
    
    //repeat 사용     
    // console.log(str.repeat(n));
});