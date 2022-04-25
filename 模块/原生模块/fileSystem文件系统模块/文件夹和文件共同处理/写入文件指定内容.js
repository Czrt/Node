var f = require("fs");

//写入和读取格式差不多:
f.open("test.txt", "a", function(err, fd) {
    var buf = Buffer.from("abcdefghij");
    console.log(buf)
    f.write(fd, buf, 0, buf.length, 5, function(err, num, buff) {
        if (err) {
            console.log("写入失败，失败原因是", err)
        } else {
            console.log("写入成功", buff.toString())
        }
    })
    f.close(fd, (err) => {
        if (err) {
            console.log("关闭失败，失败原因是", err)
        } else {
            console.log("关闭成功")
        }
    })
})