
var express = require('express')
  , router = express.Router()

var status = require('../models/status');
var AuthenticateToken = require('../AuthenticationToken');


 router.get('/all/', AuthenticateToken,function(req, res) {
  status.getAllStatus(function(err, status) {
    res.send(status);
  })
})
 
 router.post('/postStatus',AuthenticateToken, function(req, res) {
   status.insertStatus(req.body.userid,req.body.username,req.body.tags, req.body.description,req.body.imagepath, req.body.date, req.body.userImage, req.body.gpxstring, function(err, status) {
    if (err) return next(err);
     res.send(status);
   })
 })

  router.post('/edit', AuthenticateToken,function(req, res) {
   
   status.editStatus(req.body.statusid, req.body.description, req.body.tags, function(err, status) {
    if (err) return next(err);
     res.send(status);
   })
 })

router.delete("/:statusid",AuthenticateToken, function(req, res) {
   status.deleteStatus(req.params.statusid, function(err, status) {
    if (err) return next(err);
     res.send(status);
   })
 })



module.exports = router;