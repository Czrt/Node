var url = require("url");

//模拟一个url地址
var urlstr = "http://www.baidu.com/index.html?username=zhangsan&age=20#a";

//通过url.parse()方法将url字符串转换为对象
var urlobj = url.parse(urlstr);
console.log(urlobj);
/*
	Url {
  protocol: 'http:',   //协议
  slashes: true,		
  auth: null,
  host: 'www.baidu.com',     	//host主机名+端口号(如果有)
  port: null,					//port:端口号
  hostname: 'www.baidu.com',  	//hostname:主机名
  hash: '#a',					//hash:锚点
  search: '?username=zhangsan&age=20',   //搜索字符串(加了?)
  query: 'username=zhangsan&age=20',     //查询字符串
  pathname: '/index.html',				 //请求的文件名
  path: '/index.html?username=zhangsan&age=20',   //请求的文件名和参数
  href: 'http://www.baidu.com/index.html?username=zhangsan&age=20#a'   //当前页面的完整路径
}
*/

//通过url.format()url对象转换为字符串
var str = url.format(urlobj);
console.log(str)