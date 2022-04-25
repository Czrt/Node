var qs = require("querystring");

console.log(qs);
/*
	{
  unescapeBuffer: [Function: unescapeBuffer],
  unescape: [Function: qsUnescape],
  escape: [Function: qsEscape],
  stringify: [Function: stringify],
  encode: [Function: stringify],
  parse: [Function: parse],
  decode: [Function: parse]
}

*/


var str = "cu=true&utm_source=baidu-pinzhuan&utm_medium=cpc&utm_campaign=t_288551095_baidupinzhuan&utm_term=0f3d30c8dba7459bb52f2eb5eba8ac7d_0_01e0f3de80b84b378f27d71cb40cd511"

//将字符串转换为对象
var obj = qs.parse(str)
console.log(obj)

// console.log(obj.toString());会报错因为querystring.parse()方法返回的对像不是原型继承的继承自Javascript的Object,所以典型的Object方法如obj.toString(),不能使用


//将对象转换为字符串
var str2 = qs.stringify(obj);
console.log(str2)

console.log(__dirname, __filename)