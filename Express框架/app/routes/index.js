var express = require('express');
var router = express.Router();
var User = require("../module/module.js")

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("index", { admin: req.session.admin });
});

router.get("/show", function(req, res) {
    res.render("show")
})



////注册页路由
router.get("/login", function(req, res) {
    res.render("login", { loginError: req.flash("loginError") })
})
router.post("/login", function(req, res) {
    req.body.password = require("../base/base").md5(req.body.password);
    req.body.IP = req.ip;
    req.body.date = new Date();
    User.findOne(req.body, function(err, data) {
        if (err) {
            res.send("数据库出问题了")
        } else {
            if (data) {
                req.flash("loginError", "用户已存在");
                res.redirect("back")
            } else {
                User.create(req.body, function(err) {
                    if (err) {
                        console.log("添加数据库失败", err)
                    } else {
                        console.log("添加到数据库成功")
                    }
                })
                res.redirect("/reg")
            }
        }
    })
})

///////ajax验证用户名是否重复
router.post("/userajax", function(req, res) {
    User.findOne(req.body, function(err, data) {
        if (err) {

        } else {
            if (data) {
                res.json({ success: 0, more: ["qwe", "ewq", "wqe", "weq"] })
            } else {
                res.json({ success: 1 })
            }
        }
    })
})


/////登录页路由
router.get("/reg", function(req, res) {
    res.render("reg", { regError: req.flash("regError") })
})
router.post("/reg", function(req, res) {
    req.body.password = require("../base/base").md5(req.body.password)
    User.findOne(req.body, function(err, data) {
        if (err) {
            console.log(111)
        } else {
            if (data) {
                req.session.admin = data;
                res.redirect("/")
            } else {
                req.flash("regError", "用户名和密码输入错误");
                res.redirect("/reg")
            }
        }
    })
})

/////退出登录
router.get("/regout", function(req, res) {
    req.session.admin = null;
    res.redirect("back");
})



/////通过验证原密码来修改密码
router.get("/users/password/:_id", function(req, res) {
    res.render("users/password", { data: req.params, admin: req.session.admin });
})
router.post("/users/password", function(req, res) {
    var oldpassword = require("../base/base").md5(req.body.oldpassword);
    var newpassword = require("../base/base").md5(req.body.newpassword);

    User.findOne({ _id: req.body.id }, function(err, data) {
        if (err) {
            res.send("未知错误")
        } else {
            ///判断输入的原密码和数据库中的密码是否一致
            if (data && data.password == oldpassword) {
                //////将新密码写入到数据库中
                User.update(data, { $set: { password: newpassword } }, function(err) {
                    if (err) {
                        console.log("修改失败")
                    } else {
                        /////修改密码成功后，将session清空让用户重新登录
                        req.session.admin = null;
                        res.redirect("/reg")
                    }
                })
            } else {
                res.send("原密码错误")
            }
        }
    })
})
module.exports = router;