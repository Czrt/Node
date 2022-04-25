var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/food")
var Food = mongoose.model("Food", { username: String, IMG: String, foodname: String, addtime: Date, IP: String });
var Foodfabu = mongoose.model("Foodfabu", { username: String, IMG: String, foodname: String, addtime: Date, IP: String });
module.exports = {
    Food: Food,
    Foodfabu: Foodfabu
}