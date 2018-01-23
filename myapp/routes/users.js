var express = require('express');
var router = express.Router();
let users = require('../data/user.json');


var currentId = 2;
router.get('/',function(req,res,next) {
  res.render('user');
});


/* GET users listing. */
router.get('/user', function(req, res, next) {
  res.send({users:users});
});


router.post('/user', function(req, res) {
  var userName = req.body.name;
  let userSurname = req.body.surname;
  let userAge = req.body.age;
  let userMail = req.body.mail
  currentId++;

  users.push({
      id: currentId,
      name: userName,
      surname: userSurname,
      age:userAge,
      mail:userMail
  });

  res.send('Successfully created product!');
});

router.put('/user/:id', function(req, res) {
  var id = req.params.id;
  var newName = req.body.newName;
  var newSurname = req.body.newSurname;
  var newAge = req.body.newAge;
  var newMail = req.body.newMail;
  
  var found = false;

  users.forEach(function(user, index) {
      if (!found && user.id === Number(id)) {
          user.name = newName;
          user.surname = newSurname;
          user.age = newAge;
          user.mail = newMail;
      }
  });
  res.send('Successfully updated');
});

router.delete('/user/:id', function(req, res) {
  var id = req.params.id;

  var found = false;
  
  users.forEach(function(user, index) {
      if (!found && user.id === Number(id)) {
          users.splice(index, 1);
      }
  });

  res.send('Successfully deleted');
});

module.exports = router;

