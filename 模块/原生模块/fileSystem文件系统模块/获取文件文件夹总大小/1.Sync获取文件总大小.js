var fs = require("fs");

var ff = fs.readdirSync("../获取文件文件夹总大小");
console.log(ff); //获取的是一个数组

var sum = 0;


ff.forEach(function(value, key) {

    var fff = fs.statSync(value);

    console.log(fff.size);
    sum += fff.size;
})

console.log(sum)