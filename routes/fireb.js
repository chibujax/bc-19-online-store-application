var Firebase = require('firebase');
var FirebaseRef = Firebase.initializeApp({
  apiKey: "AIzaSyA0NZfEmEFQsWFNAAG7sx_LQxcsimKUyEU",
  authDomain: "bc-19-onlline-store-app.firebaseapp.com",
  databaseURL: "https://bc-19-onlline-store-app.firebaseio.com",
  storageBucket: "bc-19-onlline-store-app.appspot.com",
  messagingSenderId: "777124232950"
  });
  module.exports = FirebaseRef;