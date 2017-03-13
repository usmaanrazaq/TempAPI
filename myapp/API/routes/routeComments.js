
var express = require('express')
  , router = express.Router()

var comments = require('../models/comments');
var AuthenticateToken = require('../AuthenticationToken');
router.get('/:statusid', AuthenticateToken,function(req, res) {
  comments.getComments(req.params.statusid, function(err, comments) {
    res.send(comments);
  })
})
router.post('/addComment', AuthenticateToken,function(req, res) {
  comments.insertComment(req.body.statusid,req.body.username, req.body.comment,req.body.imageurl, req.body.date, function(err, comment) {
    res.send(comment);
  })
})


router.post('/edit/:statusid/:commentid/:comment', AuthenticateToken,function(req, res) {
  comments.editComment(req.params.statusid,req.params.commentid, req.params.comment, function(err, comment) {

    res.send(comment);
  })
})

router.delete('/:statusid/:commentid', AuthenticateToken,function(req,res){
      comments.deleteComment(req.params.statusid,req.params.commentid, function(err, comment) {
    res.send(comment);
  })
})

module.exports = router;