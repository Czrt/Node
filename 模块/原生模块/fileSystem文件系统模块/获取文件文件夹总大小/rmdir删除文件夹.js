var f = require("fs");

f.rmdir("模块", function(err) {
    if (err) {
        console.log("删除失败,失败原因是", err)
    } else {
        console.log("删除成功")
    }
})