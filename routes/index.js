
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  var mObject = {
    title: 'Chibujax Online Mall',
    message: undefined,
    isUser: false, 
    owner: 'Guest',
    storeurl: '',
    mtype: undefined
  }
  if(req.session.user !== undefined && req.session.user.storeurl !== undefined) {
    mObject.isUser = true; 
    mObject.storeurl = req.session.user.storeurl === undefined ? '/#' : '/stores' + req.session.user.storeurl;
    mObject.owner = req.session.user.email === undefined ? 'Guest.' : req.session.user.email; 
  }    
  if(req.session.alert !== undefined) {
    console.log("alert: " + req.session.alert.message);
    mObject.message = req.session.alert.message;
    mObject.mtype = req.session.alert.mtype;
    req.session.alert = undefined;
  }
  console.log(mObject);
  res.render('index', mObject);
});

module.exports = router;
