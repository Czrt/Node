////因为数据库会在很多地方调用，而User模型只能实例化一次，否则会报错，所以将模型定义成一个模块，其他文件
// 若要使用直接引入此模块即可
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/tian");
var User = mongoose.model("User", { username: String, password: String, IP: String, date: Date, IMG: String, age: Number });


module.exports = User;