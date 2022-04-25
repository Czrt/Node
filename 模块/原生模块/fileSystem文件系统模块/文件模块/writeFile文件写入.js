var f = require("fs");

//writeFile(),讲内容覆盖写入原文件，如果没有源文件，则会自动创建文件
f.writeFile("../文件夹和文件共同处理/写入文件指定内容.js", "hello world", function(err) {
    if (err) {
        console.log("写入失败，失败原因是", err)
    } else {
        console.log('写入成功')
    }
})