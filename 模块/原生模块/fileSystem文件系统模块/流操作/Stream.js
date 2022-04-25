var fs = require("fs");

// //创建可读流fs.createReadStream()
// var reader = fs.createReadStream("1.txt");

// //创建可写流fs.createWriteStream()
// var writer = fs.createWriteStream("demo.txt");

// //通过管道将可读流中的内容写入到可写流中:pipe()
// reader.pipe(writer)

///封装函数

function copy(srcname, dstname) {
    var reader = fs.createReadStream(srcname);
    var writer = fs.createWriteStream(dstname);
    reader.pipe(writer)
}
copy("demo.txt", "2.txt")