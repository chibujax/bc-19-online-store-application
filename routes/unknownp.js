var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {
  req.session.alert = {
      message: 'You entered Unknown Path',
      mtype: 'alert alert-danger'       
  }
  res.redirect('/');
  });

module.exports = router;