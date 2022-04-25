var f = require("fs");

f.rename("示例.txt", "test.txt", function(err) {
    if (err) {
        console.log("修改失败，失败原因是", err)
    } else {
        console.log("修改成功");
    }
})