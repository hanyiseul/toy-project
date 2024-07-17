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
    result = "";
    for(let i=0; i<str.length; i++){
        //  toLowerCase 소문자 toUpperCase 대문자  햇갈리지 않기!!
        if(str[i] === str[i].toLowerCase()){
            result += str[i].toUpperCase();
        }else{
            result += str[i].toLowerCase();
        }
    }
    console.log(result);
});