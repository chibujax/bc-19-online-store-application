
var express = require('express');
var router = express.Router();
/* GET home page. */
router.post('/', function(req, res) {
  var mObject = {
    title: 'Checkout',
    message: undefined,
    mtype: undefined
  }
  res.render("checkout",mObject);
});

module.exports = router;
