var f = require("fs");

f.readdir("node_modules", function(err, fil) {
    if (err) {
        console.log("读取失败")
    } else {
        console.log("读取成功，读取的文件是",
            fil)
    }
})