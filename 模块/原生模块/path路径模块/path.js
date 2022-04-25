var pt = require("path");

// console.log(pt)


//将指定的路径拼接在一起
console.log(pt.join("a", "b", "c", "d")); //a\b\c\d

//将当前js文件的路径与指定的路径亲姐在一起
console.log(pt.resolve("a", "b", "1.html"));
//C:\Users\RT\Desktop\node\模块\原生模块\path路径模块\a\b\1.html

var str = "C:/Users/RT/Desktop/node模块/原生模块/event事件模块/event事件模块.js";

//获取指定字符串的文件夹路径，不包含文件名
console.log(pt.dirname(str))
//C:/Users/RT/Desktop/node模块/原生模块/event事件模块


//获取指定字符的文件名
console.log(pt.basename(str));
//event事件模块.js

//获取指定字符串的文件后缀名
console.log(pt.extname(str));
//.js