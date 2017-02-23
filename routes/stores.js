var express = require('express');
var FirebaseRef = require('./fireb');
var router = express.Router();
router.get('/:id', function(req, res) {
  var mObject = {title: "Store",
    owner: 'Guest.',
    store: '',
    isMyStore: false,
    products: undefined,
    message: undefined,
    mtype: undefined,
    pMessage: undefined,
    isUser: false,  
    storeurl: '/#' 
  };
  var userRef = FirebaseRef.database().ref("stores/'"+ req.params.id +"'");
  userRef.once('value')
    .then(function(snapshot){
      var result = snapshot.val();
      if (result === null) {
        req.session.alert = {message: 'Invalid store address',
          mtype: 'alert alert-danger'}
        res.redirect('/');  
      } 
      else {
        var storeU = result.products === undefined ? req.params.id : result.uid;
        var products = result.products === undefined ? {} : result.products;
        mObject.products = products;
        mObject.owner = result.email === undefined ? '' : result.email; 
        mObject.store = result.storename === undefined ? '' : result.storename; 
        mObject.pMessage =  'Found ' +  Object.keys(products).length  + ' Products';
        mObject.storeurl =  req.protocol + '://' + req.get('host') + storeU;
        if(req.session.user !== undefined && req.session.user.storeurl !== undefined) {
          mObject.isUser = true;
          mObject.isMyStore = req.session.user.storeurl === result.storeurl ? true : false;
        }
        res.render('stores', mObject);        
      }
    })
    .catch(error => {  

      req.session.alert = {message: error[0],
        mtype: 'alert alert-danger'}        
        res.redirect('/');       
  });  
});
module.exports = router;