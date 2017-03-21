
var express = require('express')
  , router = express.Router()


var temp = require('../models/temp');


router.get('/' ,function (req, res) {
  temp.getTemp(function (err, users) {
    res.send(users);
  })
})

router.get('/:roomID' ,function (req, res) {
  temp.findTemp(req.params.roomID, function (err, temp) {
    res.send(temp);
  })
})


router.post('/',function(req,res){
  
      temp.editTemp(req.body.tempreture, req.body.roomID, function(err, user) {
       if (err) return next(err);
        res.send(user);

  })
})




    module.exports = router;