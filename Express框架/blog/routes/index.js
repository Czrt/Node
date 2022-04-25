var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/list', function(req, res, next) {
    res.render('list', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
});
///响应对象：res
//res.render(模板页面,{name:"zhangsan"}):响应一个页面，并可以通过第二个参数个模板页面赋值;
//res.redirect():重定向,跳转到指定地方
//res.json():给客户端响应一个json数据(主要服务于AJAx)
//res.send():给客户端响应指定内容一般是字符串
router.get("/show", function(req, res) {
    // res.redirect("https://www.baidu.com")
    res.send("<h1>2</h1>")
})


/// 前端get传参，后端接收参数
//前端通过/传来的参数后端通过req.params来接收,由于前端省略了数据名，后端这里就要补上/sousuo/:username/:age；
router.get('/sousuo/:username/:age', function(req, res) {
    console.log(req.params) //{ username: 'zhangsan', age: '20' }
    res.send("请求成功")
})
//前端通过?传过来的参数，后端可以直接通过req.query来接收
router.get("/search", function(req, res) {
    console.log(req.query); //{ username: 'zhangsan', age: '20' }
    res.send("请求成功")
})

///前端post传参，后端接收参数
//前端通过post传过来的参数，后端可以通过req.body来接收
router.post("/list", function(req, res) {
    console.log(req.body, req.cookies)
    res.send("接收成功")
})

////用户注册与后台数据库的增删改查
//引入mondoose
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/tian");
var User = mongoose.model("User", { username: String, mima: String });

router.post("/login", function(req, res) {
    // console.log(req.body)
    //    User.create(req.body, function(err, data) {
    //     if (err) {
    //         res.redirect("login")
    //     } else {
    //         res.redirect("/")
    //     }
    // })
    console.log(req.body)
    User.remove(res.body, function(err, data) {
        if (err) {
            res.send("删除失败", err)
        } else {
            res.send("删除成功")
        }
    })
})



module.exports = router;