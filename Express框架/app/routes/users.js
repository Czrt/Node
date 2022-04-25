var express = require('express');
var router = express.Router();
var User = require("../module/module.js")


///查询数据
router.get('/', function(req, res, next) {
    console.log(req.query.of)
    ////////接收前端发来的搜索条件并判断
    var where = {};
    if (req.query.username) {
        where.username = req.query.username;
    }
    //搜索大于指定年龄的数据
    if (req.query.minage) {
        where.age = { $gt: req.query.minage };
    }
    //搜索小于指定年龄的数据
    if (req.query.maxage) {
        where.age = { $lt: req.query.maxage }
    }
    ///搜索指定年龄之间的数据
    if (req.query.minage && req.query.maxage) {
        where.age = { $gt: req.query.minage, $lt: req.query.maxage }
    }

    //////排序后端代码
    var sort = {}
    if (req.query.of == 1) {
        sort.age = 1;
    }
    if (req.query.of == -1) {
        sort.age = -1;
    }

    //////跳页 skip=3n-3
    if (req.query.page == undefined) {
        req.query.page = 1;
    }
    ////后端下一页的超出判断
    User.count(function(err, data) {

        var qs = require("querystring");

        //////////深度克隆对象
        var obj = {};
        for (var i in req.query) {
            obj[i] = req.query[i];
        }
        delete obj.page;
        delete obj.of;
        obj = qs.stringify(obj)
        console.log(req.query, "对象", obj)




        var tatl = Math.ceil(data / 3);
        var skip = 3 * req.query.page - 3;
        User.find(function(err, data) {
            if (err) {
                res.send("获取失败" + err)
            } else {
                var qsStr = qs.stringify(req.query);
                console.log(qsStr)
                res.render("users/index", { data: data, remove: req.flash("remove"), admin: req.session.admin, sousuo: req.query, qsStr: qsStr, tatl: tatl, obj: obj })
            }
        }).where(where).sort(sort).limit(3).skip(skip);
    }).where(where)

});


///添加数据
router.get("/create", function(req, res) {
    res.render("users/create")
})
router.post("/create", function(req, res) {
    req.body.IP = req.ip; ////将用户的注册IP存入数据库
    req.body.date = new Date(); ////将用户的注册时间存入数据库;

    ////////////   密码加密通过crypto md5加密
    // var crypto = require("crypto");
    // var md5 = crypto.createHash("md5");
    // md5.update(req.body.password);
    // req.body.password = md5.digest("hex");

    /////通过定义模块，可以调用密码加密函数
    req.body.password = require("../base/base").md5(req.body.password);

    User.create(req.body, function(err) {
        if (err) {
            res.send("添加失败" + err)
        } else {
            res.redirect("/users");
        }
    })
})



///删除数据
router.get("/shanchu/:_id", function(req, res) {
    User.remove(req.params, function(err) {
        if (err) {
            res.send("删除失败" + err)
        } else {
            req.flash("remove", "删除成功")
            res.redirect("back");
        }
    })
})




////修该数据
router.get("/update", function(req, res) {
    //////////////////findOne查询到的数据是{},find查询的数据是[{},{},{}]
    User.findOne(req.query, function(err, data) {
        console.log(data)
        if (err) {
            res.send("获取失败" + err)
        } else {
            if (data) {

                res.render("users/update", { user: data, admin: req.session.admin })
            } else {
                res.send("没有数据")
            }
        }
    })
})
///1前端通过URL路径传_id值
// router.post("/update", function(req, res) {
//     console.log(req.body, req.query);
//     User.update(req.query, req.body, function(err) {
//         if (err) {
//             res.send("修改失败", err)
//         } else {
//             res.redirect("/users")
//         }
//     })
// })

///2前端通过input隐藏域传_id值
router.post("/update", function(req, res) {

    User.update({ _id: req.body._id }, req.body, function(err) {
        if (err) {
            res.send("修改失败" + err)
        } else {
            res.redirect("/users")
        }
    })
})





///////、、、、、、、、、、、、、、、、、、、、、、、、、、、、、添加头像
///////头像页面路由
router.get("/images/:_id", function(req, res) {
    console.log(req.params) //{ _id: '62552b5e51e27d5f841d7d14' }
    res.render("users/images", { data: req.params, admin: req.session.admin })
})


//////引入文件上传模块
var multer = require("multer");
var upload = multer({
    dest: "public/upload" ///////设置上传的目录为public下面的upload文件夹
})
router.post("/images", upload.single("touxiang"), function(req, res) {
    /*
    {
      fieldname: 'img',
      originalname: 'c6704ebbde68c127195210d7b398b4800cc68f85.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: 'public/upload',
      filename: '7ab67aa1b53721389538ee196bbc9f57',
      path: 'public\\upload\\7ab67aa1b53721389538ee196bbc9f57',
      size: 399757}
    */


    ////////////////////判断上传的文件是否是指定的图片格式如果是再对大小做判断，return false是清理多余响应
    var arr = ["image/jpeg", "image/gif", "image/png"];
    if (arr.indexOf(req.file.mimetype) == -1) {
        res.send("文件不合规");
        return false;
    } else {
        /////////////对上传的文件进行限制如果文件大小大于限制则回退
        if (req.file.size > 1500000) {
            res.redirect("back");
            return false;
        }
    }

    console.log(req.body)

    ////////引入文件处理模块，给上传的文件加后缀名
    var fs = require("fs");
    fs.rename(req.file.path, (req.file.path + ".jpg"), function(err) {
        if (err) {
            res.send("修改失败")
        } else {
            User.findOne(req.body, function(err, data) {
                if (err) {
                    res.send("未知错误")
                } else {

                    ///////判断用户是否有原图片文件如果有就用fs模块删掉该文件
                    if (data.IMG !== undefined) {
                        fs.unlink("public/upload/" + data.IMG, function(err) {
                            if (err) {
                                console.log("删除失败")
                            } else {
                                console.log("删除成功")
                            }
                        })
                    }


                    //////////将修改好的头像文件名和获取的后缀名进行拼接然后添加到数据库中
                    var houzhuiming = req.file.originalname.slice(req.file.originalname.lastIndexOf("."));
                    User.update(req.body, { $set: { IMG: req.file.filename + houzhuiming } }, function(err) {
                        if (err) {
                            res.send("头像添加失败")
                        } else {
                            res.redirect("/users")
                        }
                    })

                }
            })

            /////////截取后缀名


        }
    })




})
module.exports = router;