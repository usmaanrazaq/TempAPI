
var express = require('express')
  , router = express.Router()

var AuthenticateToken = require('../AuthenticationToken')
var user = require('../models/users');


router.get('/id/:userid', AuthenticateToken ,function (req, res) {
  user.findUserbyID(req.params.userid, function (err, users) {
    res.send(users);
  })
})
router.get('/:username/:password', AuthenticateToken, function (req, res) {
  user.findUser(req.params.username, req.params.password, function (err, users) {
    res.send(users);
  })
})


router.post('/edit', AuthenticateToken,function(req,res){
   user.editUser(req.body.userid, req.body.name, req.body.email, req.body.bio, function(err, user) {
    if (err) return next(err);
     res.send(user);
   })

})


router.post('/changepass', AuthenticateToken, function(req,res){
user.changePass(req.body.userid, req.body.password, function(err, user) {
    if (err) return next(err);
     res.send(user);
   })
})


    router.get('/:username', function (req, res) {
      user.findUserbyUsername(req.params.username, function (err, user) {
        res.send(user);
      })
    })

    router.post('/createUser', function (req, res) {
      
      user.insertUser(req.body.name, req.body.username, req.body.password, req.body.age, req.body.email, req.body.bio, req.body.imageurl, function (err, users) {
        res.send(users);
      })
    })


    router.delete('/:username', AuthenticateToken, function (req, res, next) {
      user.deleteUser(req.params.username, function (err, users) {
        if (err) return next(err);
        res.json(users);
      });
    });



    module.exports = router;