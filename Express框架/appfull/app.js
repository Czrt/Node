var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// 1.修改模板的后缀名为HTML
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 2.解决网站识别用户的问题
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
app.use(session({
    name: "JUNJIEID", // 设置cookie中保存session_id的字段名称（自定义）
    secret: 'pipixiawomenzou', // 服务器端生成session的签名（自定义）
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30, secure: false }, //设置有效期
    store: new MongoStore({ url: "mongodb://localhost:27017/app" }), // 存储到mongodb数据库中
    resave: true, // 当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存。
    saveUninitialized: true // 初始化session时是否保存到存储
}));

// 3.增加消息提示（增删改之后告诉用户操作是否成功）
var flash = require('connect-flash');
app.use(flash());

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
