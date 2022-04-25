//引入文件系统模块
var f = require("fs");

//mkdir()创建文件夹
f.mkdir("../获取文件文件夹总大小", function(err) {
    if (err) {
        console.log("创建失败，失败原因是", err)
    } else {
        console.log("创建文件夹成功")
    }
})