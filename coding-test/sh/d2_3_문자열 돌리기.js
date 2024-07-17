const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];

rl.on('line', function (line) {
    input = [line];
}).on('close',function(){
    str = input[0];
    //for 반복문
    // for(i=0; i<str.length; i++){
    //     console.log(str[i]);
    // }
    
    //forEach     
    // [...str].forEach(function(i){
    //     console.log(i)
    // })
    
    // for of
    for(let i of str){
        console.log(i)
    }
});