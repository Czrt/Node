var f = require("fs");

f.stat("test.txt", function(err, data) {
    if (err) {
        console.log("获取失败，失败原因是", err)
    } else {

        //data.isDirectory():判断是否是文件夹
        //data.isFile():判断是否是文件
        console.log('获取成功,获取的内容是', data.isFile())
    }
})