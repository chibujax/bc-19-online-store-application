var express = require('express');
var router = express.Router();

/* GET signup page. */
router.get('/', function(req, res, next) {
  if(req.session.user !== undefined && req.session.user.storeurl !== undefined){
    res.redirect('/stores' + req.session.user.storeurl); 
  }    
  res.render('signup', { title: 'Online Store Signup',
    message: undefined,
    mtype: undefined,
    description: 'Provide the details to signup for a store'});
});
router.post('/', function(req, res, next) {
  var FirebaseRef = require('./fireb');
  var email = req.body.email;
  var password = req.body.password;
  var storename = req.body.storename;
  FirebaseRef.auth().createUserWithEmailAndPassword(email, password)
    .then(userData => { 
      var store = {
        uid: userData.uid,
        email: email,
        storename: storename,
        storeurl: "/" + userData.uid
      }

      var userRef = FirebaseRef.database().ref('stores/');
      userRef.child("'" + userData.uid + "'").update(store);
      req.session.user = store;
      res.redirect('/stores/' + userData.uid);
    })
    .catch(error => {      
      var errorCode = error.code;
      var errorMessage = error.message;
      res.render('signup', { title: 'Online Store Signup',
        message: errorCode,
        mtype: 'alert alert-danger',
        description: 'Provide the details to signup for a store'});       
    });
});

module.exports = router;
