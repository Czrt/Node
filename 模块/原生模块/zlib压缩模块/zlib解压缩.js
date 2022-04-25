var fs = require("fs");
let zlib = require("zlib");

//zlib.createGunzip():通过管道将读取流解压缩并通过管道写入可写流
// fs.createReadStream("2.zip").pipe(zlib.createGunzip()).pipe(fs.createWriteStream("1.txt"));

//封装函数

function Gunzip(srcname, dstname) {
    fs.createReadStream(srcname).pipe(zlib.createGunzip()).pipe(fs.createWriteStream(dstname));
}
Gunzip("2.zip", "2.txt")