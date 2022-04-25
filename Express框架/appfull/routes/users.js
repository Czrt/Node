var express = require('express');
var router = express.Router();

// 引入模型
var User = require('../base/base').User;

// 用户首页
router.get('/', function(req, res, next) {
    // 初始化搜索条件
    var where = {};

    // 不是每次都要搜索数据，如果没有where={},如果有搜索条件where={username:"zhangsan"}
    if (req.query.username) {
        where.username = req.query.username;
    }

    // 判断是否有电话的搜索
    if (req.query.phone) {
        where.phone = req.query.phone;
    }


    // 年龄（大于24之间）
    if (req.query.minage) {
        // req.query.minage实际上是一个数字字符串
        where.age = { $gt: Number(req.query.minage) }
    }
    if (req.query.maxage) {
        where.age = { $lt: Number(req.query.maxage) }
    }
    // 年龄必须在25到40之间
    if (req.query.minage && req.query.maxage) {
        where.age = { $lt: Number(req.query.maxage), $gt: Number(req.query.minage) }
    }

    var sort = {};
    if (req.query.agesort) {
        sort.age = req.query.agesort;
    }

    // 没有page参数的时候，给page默认为1
    if (!req.query.page) {
    	req.query.page = 1;
    }

    User.count(function(err, total) {
        if (err) {
            res.send('查询总条数');
        } else {
            // 查询总数据成功
            var totalPage = Math.ceil(total / 3); // 总页码
            var num = 3 * (req.query.page - 1);

            // 年龄的搜索 10岁-20岁之间
            // 排序：按年龄的排序
            // 将数据展示在首页
            User.find(function(err, data) {
                if (err) {
                    res.send('查询出现问题');
                } else {
                    var obj = {username:""}
                    // 深度克隆对象
                    var obj = {};
                    for (var i in req.query) {
                        obj[i] = req.query[i];
                    }
                    delete obj.page;
                    delete obj.agesort;

                    var qs = require('querystring');
                    var qsStr = qs.stringify(obj);

                    res.render('users/index', { data: data, admin: req.session.admin, where: req.query, qsStr: qsStr, totalPage: totalPage });
                }
            }).where(where).sort(sort).limit(3).skip(num);
        }
    }).where(where);
});

// 展示添加用户的界面
router.get('/create', function(req, res, next) {
    res.render('users/create');
});

// 执行用户添加
router.post('/create', function(req, res) {
    // 密码要加密
    req.body.password = require('../base/base').md5(req.body.password);

    // ip
    req.body.ip = req.ip;

    // 注册时间
    req.body.addtime = new Date();
    // console.log(req.body);

    // 接收数据并保存到数据库
    User.create(req.body, function(err) {
        if (err) {
            // 失败了跳转到添加页面
            res.redirect('back');
        } else {
            // 成功了跳转到用户首页
            res.redirect('/users');
        }
    })
})

// 执行用户删除操作
router.get('/remove/:_id', function(req, res) {
    // req.params = {_id:'abcd1234...'} => 就是我们的删除条件
    User.remove(req.params, function(err) {
        if (err) {
            // 失败跳回去
            res.redirect('back');
        } else {
            // 成功跳转到首页
            res.redirect('/users');
        }
    })
})

// 修改用户界面
router.get('/update/:_id', function(req, res) {
    // 根据_id只能查询一条数据 =》 findOne
    User.findOne(req.params, function(err, data) {
        if (err) {
            res.send('查询失败');
        } else {
            // 如果有数据，则是{username:"zhangsan",age:20,sex:"男"}数据格式
            if (data) {
                res.render('users/update', { data: data });
            } else {
                // 没有数据，返回null,走else路线
                res.send('查无此数据');
            }
        }
    })
})

// 执行用户的修改操作
router.post('/update', function(req, res) {
    // req.body ：接收的数据
    var condition = { _id: req.body._id };

    // 执行修改
    User.update(condition, req.body, function(err) {
        if (err) {
            // 失败跳转回去
            res.redirect('back');
        } else {
            // 成功跳转到首页
            res.redirect('/users');
        }
    })
})

// 添加头像的页面
router.get('/image/:_id', function(req, res) {
    User.findOne(req.params, function(err, data) {
        if (err) {
            res.send('查询数据失败');
        } else {
            if (data) {
                // 查询成功 {_id:"123456"} {data:{username:"",_id:}}
                res.render('users/image', { data: data });
            } else {
                // 查询失败
                res.send('非法操作');
            }
        }
    })
})

// 引入文件上传模块
var multer = require('multer');
var upload = multer({
    dest: 'public/uploads'
})

// 执行头像的添加操作
router.post('/image', upload.single('img'), function(req, res) {
    // console.log('上传的数据是：',req.body);
    console.log('上传的头像信息是：', req.file);

    // 1.修改文件名称
    var fs = require('fs');
    var path = require('path');

    var ext = path.extname(req.file.originalname);
    console.log(ext);

    var oldname = req.file.path;
    var newname = req.file.path + ext;
    fs.rename(oldname, newname, function(err) {
        if (err) {
            res.send('文件名修改失败');
        } else {
            // 先根据_id查询出头像名称，根据路径利用unlink删除原头像文件
            // 修改成功
            // 2.将修改之后的文件名保存到数据库中
            User.update(req.body, { $set: { img: req.file.filename + ext } }, function(err) {
                if (err) {
                    res.send('文件修改失败');
                } else {
                    res.redirect('/users');
                }
            })
        }
    })
})

module.exports = router;
