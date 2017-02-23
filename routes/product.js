
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/:id', function(req, res) {
  
  var mObject = {
    title: 'Chibujax Online Mall',
    message: undefined,
    mtype: undefined
  }   
  res.render('product', mObject);
});

module.exports = router;