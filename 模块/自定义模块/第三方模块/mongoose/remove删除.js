var mongoose = require("Mongoose");

mongoose.connect("mongodb://localhost:27017/test");


var User = mongoose.model("User", { username: String, age: Number, sex: String });


User.remove({ username: "Amy" }, function(err) {
    if (err) {
        console.log("删除失败", err)
    } else {
        console.log("删除成功")
    }

})