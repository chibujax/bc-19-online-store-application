
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
    mstores: {},
    mtype: undefined
  }
  if(req.session.user !== undefined && req.session.user.storeurl !== undefined) {
    mObject.isUser = true; 
    mObject.storeurl = req.session.user.storeurl === undefined ? '/#' : '/stores' + req.session.user.storeurl;
    mObject.owner = req.session.user.email === undefined ? 'Guest.' : req.session.user.email; 
  }    
  if(req.session.alert !== undefined) {
    mObject.message = req.session.alert.message;
    mObject.mtype = req.session.alert.mtype;
    req.session.alert = undefined;
  }
 var FirebaseRef = require('./fireb');
  var userRef = FirebaseRef.database().ref("stores");
  userRef.once('value')
    .then(function(snapshot){
      var result = snapshot.val();
      if (result !== null) {
          for (var pros in result){
            if (result.hasOwnProperty(pros)){
              mObject.mstores[pros] = result[pros].storename === undefined? 'Store Extension' : result[pros].storename;
            }
          }

        res.render('index', mObject);        
      }
    })
    .catch(error => {  

        mObject.message = error[0];
        mObject.mtype=  'alert alert-danger';       
        res.render('index', mObject);      
  });  
  
});

module.exports = router;
