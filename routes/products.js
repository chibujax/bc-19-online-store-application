
var FirebaseRef = require('./fireb');
var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/', function(req, res) {
  var mObject = {
    title: 'Products',
    storeurl: '#',
    semail: '',
    suid: '' ,
    message: undefined,
    mtype: undefined
  }   
  if(req.session.alert !== undefined) {
    mObject.message = req.session.alert.message;
    mObject.mtype = req.session.alert.mtype;
    req.session.alert = undefined;
  }
  if(req.session.user === undefined) {
      req.session.alert={message: "To add a product, you need to own a store and signed in. If you do not own a store, then sign up.",
      mtype: 'alert alert-danger'};
    res.redirect('/signin'); 
  }
  else {
    mObject.semail= req.session.user.email,
    mObject.suid= req.session.user.uid,
    mObject.storeurl = "stores" + req.session.user.storeurl;
    res.render('products', mObject);
  }  
});

router.post('/', function(req, res) { 
  var sampleFile = req.files.imgurl;
  var filename = Math.floor(Date.now() / 1000);
  
  var theBody = req.body;  
    var fObject ={ productid : filename,
    proname: theBody.proname,
    prodescription: theBody.prodescription,
    proemail: theBody.semail ,
    price: theBody.price,
    imagurl: filename + '.jpg',
    storeid:  theBody.suid 
  };
   sampleFile.mv(path.join(__dirname, '/../public/images', fObject.imagurl), function(err) {
    if (err){
      res.render('products', { title: 'Products',
        storeurl: "stores/" + fObject.storeid,
        semail: theBody.semail,
        suid: theBody.suid,
        message: err,
        mtype: 'alert alert-danger'});           
      } 
      else {
        var userRef = FirebaseRef.database().ref("stores/" + fObject.storeid + "");
        userRef.child('products').child(fObject.productid).update(fObject);
        res.render('products', { title: 'Products',
          storeurl: "stores/" + fObject.storeid ,
          semail: theBody.semail,
          suid: theBody.suid,
          message: 'Product added',
          mtype: 'alert alert-success'}); 
          }
   });        
});
module.exports = router;