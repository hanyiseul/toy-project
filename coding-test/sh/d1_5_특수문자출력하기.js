const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('close', function () {
    const special = `!@#$%^&*(\\'"<>?:;` //문자열로 포함하고자 할 때 백슬래쉬를 두개써야함 \\
    console.log(special);

});