var f = require("fs");

f.exists("test.txt", function(bool) {
    if (bool) {
        console.log("文件存在")
    } else {
        console.log("文件不存在")
    }
})