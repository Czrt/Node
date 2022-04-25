//1.引入事件模块(events是原生模块，原生模块直接调用，不需要./)
var p = require("events");

//2.实例化事件对象(event：事件  emit:触发  emitter:触发者)
var pm = new p.EventEmitter();

//3.定义事件
pm.on("say", function() {
    console.log("讲话")
})
pm.on("eat", function() {
    console.log("吃饭啦")
})

//4.手动触发事件
pm.emit("say");
pm.emit("eat")