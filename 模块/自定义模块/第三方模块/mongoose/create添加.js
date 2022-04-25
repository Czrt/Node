var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test");

var User = mongoose.model("User", { username: String, age: Number, sex: String });


var data = { username: "Amy", age: 40, sex: "nan" };
User.create(data, function(err) {
    if (err) {
        console.log("添加失败", err)
    } else {
        console.log(data)
    }
})