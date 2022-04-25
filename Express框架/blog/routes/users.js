var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render("index")
});
router.get("/users", function(req, res) {
    res.render("users/show")
})

module.exports = router;