var f = require("fs");

//监听文件夹和文件的变化
f.watch("test.txt", function(eventname, filename) {
    console.log(eventname, filename);
})