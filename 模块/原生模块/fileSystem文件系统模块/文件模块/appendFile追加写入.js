var f = require("fs");

f.appendFile("test.txt", "你好，世界", function(err) {
    if (err) {
        console.log("追加写入失败，失败原因是：", err)
    } else {
        console.log("追加吸入成功")
    }
})