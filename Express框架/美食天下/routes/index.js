var express = require('express');
var router = express.Router();
var Food = require("../base/base.js").Food;
var Foodfabu = require("../base/base.js").Foodfabu;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});
///详情页
router.get("/show/:_id", function(req, res) {
    console.log(req.params)
    res.render("show")
})

///列表页
router.get("/list", function(req, res) {
    Food.find(function(err, data) {
        if (err) {
            res.send("服务器错误")
        } else {
            if (data) {
                Foodfabu.find(function(err, datas) {
                    if (err) {
                        res.send("服务器错误")
                    } else {
                        console.log(data)
                        if (datas) {
                            console.log(data, datas)
                            res.render("list", { data: data, datas: datas })
                        } else {
                            res.send("获取失败")
                        }
                    }
                })

            } else {
                res.send("获取失败")
            }
        }
    })
})
router.get("/cart", function(req, res) {
    res.render("cart")
})

/////添加页面
router.get("/create", function(req, res) {
    res.render("create")
})

router.post("/create", function(req, res) {
    req.body.IP = req.ip;
    req.body.addtime = new Date();
    console.log(req.body)
    Foodfabu.create(req.body, function(err) {
        if (err) {
            res.send("添加失败")
        } else {
            res.send("添加成功")
        }
    })
})

////登录页
router.get("/login", function(req, res) {
    res.render("login")
})

router.get("/reg", function(req, res) {
    res.render("reg")
})

module.exports = router;