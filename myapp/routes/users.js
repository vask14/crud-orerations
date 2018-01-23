const express = require('express');
const methodOverride = require('method-override');
const router = express.Router();
let users = require('../data/users.json');

/* GET */
router.get('/', function(req, res, next) {
  res.render('user',{users:users});
});

//POST
router.post('/user',function(req,res,next) {
  res.redirect('/users');
  users.push(req.body);
});

//DELETE
router.delete('/:id',function(req,res,next) {
  res.redirect('/users'); 
  let id = req.params.id;
  console.log(req.body);
  users.forEach(function(user,index) {
    if(user.id == id) {
      users.splice(index,1);
    }
  });
});


router.put('/:id',function(req,res,next) {
  res.redirect('/users');
  let id = req.params.id;
  let newUser = users.find(function(item) {
    return item.id == req.params.id;
  });
  let index = users.indexOf(newUser);
  users.splice(index,1,req.body);
  console.log(id);
})

module.exports = router;