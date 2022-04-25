var fs = require("fs");

//封装函数：将实现功能的代码原封不动的放入函数中，将变化的值作为参数传递进入
function total(dirname) {
    var files = fs.readdirSync(dirname);
    var sum = 0;
    files.forEach(function(value, key) {
        var info = fs.statSync(dirname + "/" + value);
        if (info.isDirectory()) {

            sum += total(dirname + "/" + value)
            // var infos = fs.readdirSync("../" + value);
            // infos.forEach(function(values, keys) {
            //     var infoss = fs.statSync("../" + value + "/" + values);

            //     sum += infoss.size
            // })
        } else {
            sum += info.size;
        }
    })
    return sum

}
console.log(total("../获取文件文件夹总大小"));


// var files = fs.readdirSync("../获取文件文件夹总大小");
// var sum = 0;
// files.forEach(function(value, keys) {
//     var info = fs.statSync(value);
//     if (info.isDirectory()) {
//         var infos = fs.readdirSync("../" + value);
//         infos.forEach(function(values, keys) {
//             var infoss = fs.statSync("../" + value + "/" + values);

//             sum += infoss.size
//         })
//     } else {
//         sum += info.size;
//     }
// })