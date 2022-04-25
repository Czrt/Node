# 整个Express项目框架搭建步骤
## 1.下载express框架
```
1. npm install express-generator -g （安装 安装express的工具-生成框架文件目录的命令。只需要执行一次）
2. express 项目名称(app) -e （自动化创建项目，-e采用ejs模板引擎）
```
## 2.目录结构
```
bin：命令执行目录
node_modules：模块存放目录
public：公共目录，存放CSS，JS，图片，音视频等资源
routes：路由文件目录
views：存放模板目录（1.html，2.html...）
app.js：项目的启动文件
package.json：当前项目依赖关系和相关配置
```
## 3.下载项目依赖模块
```
1.修改package.json
"scripts": {
    "start": "supervisor ./bin/www"    // 每次修改及时生效
}
2.执行 npm install(结果中不含有error等关键字，表示下载模块成功)
```

## 4.修改模板引擎的后缀名
```
4.1 app.js中第15行改为下列两行代码
    app.engine('html', require('ejs').__express);
    app.set('view engine', 'html');

4.2 修改views目录下的文件后缀名为html
```

## 5.进入到项目目录并启动
```
cd 项目名称(app)
npm start
```

# Express使用
## 1.核心
```
routes：存放当前的路由文件(index.js)
	router.get('/',function(req,res){})
		在浏览器中访问地址：http://localhost:3000/
		或者 <a href="/">首页/路径</a>
		或者 $.get('/')
		在html页面中省略了:http://localhost:3000
	router.post('/doLogin',function(req,res){})
		表单地址是：<form action="http://localhost:3000/doLogin"></form>
		或者：$.post('/doLogin')
		在html页面中省略了:http://localhost:3000

views:存放当前的模板文件（html文件）
	// 实际访问Url地址：http://localhost:3000/
	router.get('/',function(req,res){
		// 给客户端响应views/index.html页面
		res.render('index');
		// 给客户端响应"Hello world"字符串
		res.end('Hello world');
		// 给客户端响应json数据
		res.json({"username":"刘俊俊"});
	})

public:存放css，js，image文件
	在html文件的表示方式:第一个/表示的是public目录（必须加上，如果没有加，暂时没问题，但是以后可能会出现遗留问题-不加表示的是相对路径）
	<link rel="stylesheet" href="/css/style.css"/>
	<script src="/js/main.js"></script>
	<img src="/images/1.jpg">

app.js:引入各种模块，进行各模块的配置信息等
```

# 路由
## 概念功能
```
路由 = 请求方式 + 请求路径 =》 引导用户去完成相关操作
路由功能（相关操作）
1. 访问某个页面（首页）
2. 执行某个功能（添加数据，修改数据，删除数据）
3. 返回Ajax请求数据
```

## request请求对象
```
=============================
// post请求
req.body：接收post请求传递的参数

// get请求
req.params:获取"localhost/zhangsan/20/男" 的参数
req.query:获取"localhost?username=zhangsan&age=20"的参数
====================================

// cookie只要被存储，每次的访问该网站都会被通过互联网传递到服务器
req.cookies:获取当前网站的cookie数据
req.ip:获取用户的IP地址
```

## response响应对象
```
res.render(模板页面,{username:"zhangsan"})：响应一个模板页面,并通过第二个参数给模板页面赋值
res.end([data])：结束响应
res.redirect()：// 重定向
	res.redirect('back')
	res.redirect('/users')
	res.redirect('http://www.baidu.com')
res.json()：给客户端响应一个json数据
```

# 增删改查
```
下载mongoose将数据保存到数据库
npm install mongoose --save

1.查询：
	router.get('/'),查询数据返回页面 1个路由1个页面
2.添加:2个路由+1个添加页面
	router.get('/create'):添加页面
	router.post('/create'):执行添加操作
3.修改：2个路由+1个修改页面
	router.get('/update/:_id'):根据_id查询出唯一的数据并显示在模板中
	router.post('/update'):根据_id执行修改操作
4.删除：1个删除路由
	router.get('/remove/:_id'):根据_id删除数据
```

# 增删改查集合路由的相关问题
```
app.js中有两行代码
// index.js
router.get('/')
    html模板中：<a href="/">首页</a>
// users.js
router.get('/')
    html模板中：<a href="/users">用户首页</a>

为什么模板中要这么写：因为在app.js进行了相关的配置
8,9行代码
var index = require('./routes/index');
var users = require('./routes/users');

28,29行代码
app.use('/', index);
app.use('/users', users);
app.js默认给index.js中默认前置了/路径
    默认给users.js中默认前置了/users路径

以后如果再添加其他路由文件
var shops = require('./routes/shops');
app.use('/shops',shops);

切记切记：
    只有route.get('/',callback)此处的路径省略
    其余模板中的路径或者redirect中的路径都必须是完整路径
```

# 辅助技术扩展
## 密码加密
```
md5加密：数据库一旦被攻破，密码将不安全，采用不可逆的md5加密，即使数据库被暴力破解，也是无用
// 定义密码：
	var password = '123456';
// 加密
1.引入加密模块（原生模块）
	var crypto = require('crypto');
2.定义加密方式
	var md5 = crypto.createHash('md5');
	md5.update(password);
3.生成加密密码
	var password = md5.digest('hex');
```

## 引入文件上传模块
```
npm install multer --save

// 模板页的表单 需要给文件域 添加enctype="multipart/form-data"
<form action="/aaa" method="post" enctype="multipart/form-data"></form>

// 路由
var multer = require('multer');
var upload = multer({
    dest: "public/upload"    // 设置上传目录为/public/upload
})
// 接收文件路由 upload.single('img'):单文件
router.post('/upload', upload.single('img'), function(req, res) {
    // 接收文件数据
    console.log(req.file);
})
```

##  登录注册
```
2.1 下载
	npm install express-session --save
	npm install connect-mongo --save
2.2 修改app.js,增加下面代码
// 增加session中间件支持：使用session，而且用mongodb数据库保存当前登陆者相关信息
	var session = require('express-session');
	var MongoStore = require('connect-mongo')(session);

	app.use(session({
		name:"SESSIONID",	// 设置cookie中保存session_id的字段名称（自定义）
		secret: 'pipixiawomenzou',	// 服务器端生成session的签名（自定义）
		cookie: { maxAge: 1000 * 60 * 60 * 24 * 30, secure: false }, //设置有效期
		store: new MongoStore({ url:"mongodb://localhost:27017/test" }), // 存储到mongodb数据库中
		resave: true, // 当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存。
		saveUninitialized: true	 // 初始化session时是否保存到存储
	}));

使用：
    // 设置session值
    req.session.admin = {username:"zhangsan"}
    // 获取session值
    req.session.admin
```

## 增加消息提示（依赖session）
```
var flash = require('connect-flash');
app.use(flash());

// 存储信息
req.flash('error', "文件太大，不可以超过700kb");

// 获取信息
req.flash('success').toString()
```

## 登录注册需要借助于session，配置app.js
```
// 增加session中间件支持：使用session，而且用mongodb数据库保存当前登陆者相关信息
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

app.use(session({
	name:"shop_id",	// 设置cookie中保存session_id的字段名称
    secret: 'shop',	// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30, secure: false }, //过期时间，过期后 cookie 中的 session id 自动删除
    store: new MongoStore({ url:"mongodb://localhost:27017/test" }),
    resave: false,
	saveUninitialized: true
}));
```

## SSE
### 服务器端
```
// 读取文件数据
router.get('/test',function(req,res){
    // 写入头信息为text/event-stream
    res.writeHead(200, { 'Content-type': 'text/event-stream' });

    // 结束响应的格式必须是此格式
    res.end("data:" + str + "\n\n");
})
```

### 客户端
```
// 服务器主动推送事件Server-sent Events(SSE)
var source = new EventSource("http://localhost:3000/aaa");

source.onmessage = function(event) {
    console.log(event);
}
```

# 注意事项
```
1. 发送短信需要urllib库
```
