var fs = require("fs")

fs.open(__dirname + '/test.txt', 'a', function(err, fd) {
    if (err) {
        console.error(err);
        return;
    } else {
        var buffer = new Buffer('写入文件数据内容');
        //写入'入文件'三个字
        fs.write(fd, buffer, 3, 9, 12, function(err, written, buffer) {
            if (err) {
                console.log('写入文件失败');
                console.error(err);
                return;
            } else {
                console.log(buffer.toString());
                //写入'数据内'三个字
                fs.write(fd, buffer, 12, 9, null, function(err, written, buffer) {
                    console.log(buffer.toString());
                })
            }
        });
    }
})