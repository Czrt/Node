// 链接mongodb，并设置模型
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tian');
var User = mongoose.model('User', { username: String, password: String, addtime: Date, ip: String, img: String, age: Number, sex: String, phone: String });

module.exports = {
    // 使用md5加密,加密的结果是32位的字符串，而且此加密方式是不可逆的
    md5: function(password) {
        var crypto = require('crypto');
        var md5 = crypto.createHash('md5');
        md5.update(password);
        return md5.digest('hex');
    },
    User: User
}