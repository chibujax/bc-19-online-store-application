
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/:id/:store', function(req, res) {
  var FirebaseRef = require('./fireb');
  var userRef = FirebaseRef.database().ref("stores/"+ req.params.store +"/products/" + req.params.id );
  userRef.once('value')
    .then(function(snapshot){
      var result = snapshot.val();
      if (result === null) {
        req.session.alert = {message: 'Invalid product and store ID',
          mtype: 'alert alert-danger'}
        res.redirect('/');  
      } 
      else {
        var mObject = {
          title: 'Product',
          imagurl: result.imagurl,
          price: result.price,
          prodescription: result.prodescription,
          productid: result.prodescription,
          proemail: result.proemail,
          proname: result.proname,
          storeurl: "/stores/" + result.storeid

        };
        res.render('product', mObject);        
      }
    })
    .catch(error => {  

      req.session.alert = {message: error[0],
        mtype: 'alert alert-danger'}        
        res.redirect('/');       
  }); 
});

module.exports = router;