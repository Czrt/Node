///引入mongoose模块
var mongoose = require('mongoose')

///链接mongodb数据库
mongoose.connect("mongodb://localhost:27017/test");


///定义模型 -model(跟数据有关，做数据的增删改查)
///model()的第一个参数首字母大写，建议是单数(数据库中集合的名称要求必须是复数+s)
var User = mongoose.model("User", { username: String, age: Number, sex: Number })

///查询所有数据
// User.find(function(err, data) {
//     console.log(err, data);
// })


///根据条件获取数据（搜索条件，排序条件，分页条件）
//.where({username:"lisi"})查询指定条件的数据，
//.limit(2):查询两条数据
//.skip(2):查询第二页数据2*2-2
//.sort({age:1}):以指定方式查询
User.find(function(err, data) {
    if (err) {
        console.log("查询失败", err)
    } else {
        console.log(data)
    }
}).where({ username: "lisi" }).limit(2).skip(2).sort({ age: 1 });



///获取总的数据条数
User.count(functin(err, data) {
    if (err) {
        console.log("查询失败", err)
    } else {
        console.log(data)
    }
})


///不常用的查询方式
User.find({ usrename: "lisi" }, function(err, data) {
    if (err) {
        console.log("查询失败", err)
    } else {
        console.log(data)
    }
})