var express = require('express');
var router = express.Router();


module.exports = {
    username: "张",
    sex: "男",
    age: 18,
    eat: function() {
        console.log("吃饭");
        return 1
    }

}
console.log(router)