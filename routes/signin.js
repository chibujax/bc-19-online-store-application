var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {
  var mObject = {
    title: 'Signin',
    message: undefined,
    description: 'Provide login details to access store',
    mtype: undefined
  }   
  if(req.session.alert !== undefined) {
    mObject.message = req.session.alert.message;
    mObject.mtype = req.session.alert.mtype;
    req.session.alert = undefined;    
  } 
  if(req.session.user !== undefined && req.session.user.storeurl !== undefined){
    res.redirect('/stores' + req.session.user.storeurl); 
  }  
  res.render('signin', mObject);
});
router.post('/', function(req, res) { 
  if(req.session.user !== undefined && req.session.user.storeurl !== undefined){
    res.redirect('/stores' + req.session.user.storeurl); 
  }  
  var FirebaseRef = require('./fireb');
  var email = req.body.email;
  var password = req.body.password;
  FirebaseRef.auth().signInWithEmailAndPassword(email, password)
    .then(userData => { 
      var userRef = FirebaseRef.database().ref('stores/'+ userData.uid);
      userRef.on('value',function(snapshot){
        if(snapshot.val() !== null && snapshot.val().storeurl !== null) {
          req.session.user = snapshot.val();
          res.redirect('/stores' + snapshot.val().storeurl); 
        } 
        else {
          res.render('signin', { title: 'Online Store Signin',
            message: 'You do not have a store, contact admin',
            mtype: 'alert alert-danger',
            description: 'Provide login details to access store'       
          });          
        }       
      });
    })
    .catch(error => {      
      var errorCode = error.code;
      var errorMessage = error.message;
      res.render('signin', { title: 'Online Store Signin',
        message: errorCode,
        mtype: 'alert alert-danger',
        description: 'Provide login details to access store'
      });       
    });
});

module.exports = router;
