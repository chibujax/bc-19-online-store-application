var express = require('express');
var FirebaseRef = require('./fireb');
var router = express.Router();

router.get('/', function(req, res) {
  req.session.destroy();
  FirebaseRef.auth().signOut().then(function() {});
  res.redirect('/signin');
});

module.exports = router;