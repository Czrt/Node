var f = require("fs");
f.readFile("test.txt", function(err, data) {
    if (err) {
        console.log("读取失败,失败原因是", err)
    } else {
        console.log("读取成功，读取的文件是",
            data.toString())
    }
})