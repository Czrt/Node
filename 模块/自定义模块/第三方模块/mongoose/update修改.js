var mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/test");


var User = mongoose.model("User", { username: String, age: Number, sex: String });
// User.update({ username: "zhao达到liu" }, { $set: { username: "zhangsan" } }, function(err) {
//     // if (err) {
//     //     console.log("修改失败", err)
//     // } else {
//     //     console.log("修改成功")
//     // }
// });

//$inc:年龄加上5   
//$lt:20:选择年龄低于20的数据
//multi:true  为true可以修改多个匹配值,默认只修改一个符合条件的
User.update({ age: { $lt: 20 } }, { $inc: { age: 5 } }, { multi: true }, function(err) {
    if (err) {
        console.log("修改失败", err)
    } else {
        console.log("修改成功")
    }
})