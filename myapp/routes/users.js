const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const path = require('path');
const fs = require('fs');
let users = require('../data/user.json');

//GET
router.get('/',function(req,res) {
  res.render('user',{users:users});
});

router.post('/user',function(req,res,next) {
  res.redirect('/users');
  users.push(req.body);
});

//PUT
router.post('/user/:id',function(req,res) {
  res.redirect('/users');
  let id = req.params.id;
  let newUser = users.find(function(item) {
    return item.id == req.params.id;
  });
  let index = users.indexOf(newUser);
  users.splice(index,1,req.body);
});


//DELETE
router.post('/user/delete/:id',function(req,res) {
  res.redirect('/users'); 
  let id = req.params.id;
  console.log(req.body);
  users.forEach(function(user,index) {
    if(user.id == id) {
      users.splice(index,1);
    }
  });
});

module.exports = router;
