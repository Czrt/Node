var str = "username=zhangsan&sge=20&sex=nan";

var arr = str.split("=").join(":").split("&");
console.log(str.split("=").join(":").split("&"));


var obj = {};
arr.forEach(function(value, index) {

    let values = value.split(":")
    console.log(values);

    obj[values[0]] = values[1];
})

console.log(obj)