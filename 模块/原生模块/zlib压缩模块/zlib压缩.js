var fs = require("fs");
zlib = require("zlib"); //引入压缩模块

//zlib.createGzip():通过管道将读取流直接获取并压缩
// fs.createReadStream("1.js").pipe(zlib.createGzip()).pipe(fs.createWriteStream("1.zip"));


//封装函数
function Gzip(srcname, dstname) {
    fs.createReadStream(srcname).pipe(zlib.createGzip()).pipe(fs.createWriteStream(dstname))
}

Gzip("1.js", "demo.zip")