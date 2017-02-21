var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  if(req.session.user !== undefined && req.session.user.storeurl !== undefined){
    res.redirect('/stores' + req.session.user.storeurl); 
  }  
  res.render('signin', { title: 'Signin',
    message: undefined,
    description: 'Provide login details to access store'
 });
});
router.post('/', function(req, res, next) {
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
          res.redirect('/stores' + req.session.user.storeurl); 
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
