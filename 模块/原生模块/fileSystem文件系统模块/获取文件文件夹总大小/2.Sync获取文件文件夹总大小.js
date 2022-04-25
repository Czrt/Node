var fs = require("fs");

var ff = fs.readdirSync("../获取文件文件夹总大小");
var sum = 0;

ff.forEach(function(value, key) {

    var fff = fs.statSync(value);

    if (fff.isDirectory()) {

        var fffs = fs.readdirSync("../" + value);

        fffs.forEach(function(values, keys) {

            console.log(values, keys);

            var ffffs = fs.statSync("../" + value + "/" + values); /////、、、、

            sum += ffffs.size;
        })


    } else {
        sum += fff.size;
    }
});
console.log(sum)