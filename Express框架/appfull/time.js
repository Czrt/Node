// 引入moment模块
var moment = require('moment');

var time = new Date();

var res = moment(time).format('YYYY-MM-DD HH:mm:ss');
console.log(res);