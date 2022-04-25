var express = require('express');
var router = express.Router();

var User = require('../base/base.js').User;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { admin:req.session.admin });
});

// 展示登录页面
router.get('/login',function(req,res){
	res.render('login',{error:req.flash('error').toString()});
})

// 执行登录操作
router.post('/login',function(req,res){
	// 接收用户的数据，并判断是否成立
	req.body.password = require('../base/base.js').md5(req.body.password);

	User.findOne(req.body,function(err,data){
		if (err) {
			res.send('查询失败');
		} else {
			if (data) {
				// 查询出结果
				req.session.admin = data;	// 将查询到的数据赋值给session中的admin属性，方便后面的额全局使用
				// console.log(data);	// {username:'',age:"",sex:'',...}
				res.redirect('/');
			} else {
				// 没有查询到数据
				req.flash('error','用户名和密码错误');	// 将保存到数据库中
				res.redirect('back');
			}
		}
	})
});

// 点击退出 - 删除session的值
router.get('/logout',function(req,res){
	req.session.admin = null;
	res.redirect('/');
})

// 注册页面
router.get('/reg',function(req,res){
	res.render('reg');
})

// 执行注册：获取用户提交的数据，并保存到数据库中
router.post('/reg',function(req,res){
	req.body.password = require('../base/base').md5(req.body.password);
	req.body.ip = req.ip;
	req.body.addtime = new Date();

	User.create(req.body,function(err){
		if (err) {
			res.send('异常情况');
		} else {
			// 注册成功，让用户登录
			res.redirect('/login');
		}
	})
})

router.post('/check',function(req,res){
	console.log(req.body);
	// 根据用户名去数据库查询有没有相同的名字
	User.findOne(req.body,function(err,data){
		if (err) {
			res.send('异常情况');
		} else {
			// console.log(data);
			if (data) {
				// res.send('y');
				res.json({success:1})
			} else {
				// res.send('n');
				res.json({success:0})
			}
		}
	})
})
module.exports = router;
