  var express = require('express')
  , router = express.Router()

  var user = require('./models/users');
var app = express();
  router.post('/', function (req, res) {

    // GET WEBTOKEN LIBRARY
    var jwt = require('jsonwebtoken');
    user.findUser(req.body.username, req.body.password, function (err, users) {
      if (!users.length > 0) {
        // IF NO USERS THEN SEND RESPONSE THAT SENDS MESSAGE AND A BOOL FLAG
        res.send({ success: false, message: 'Authentication failed. User not found.' });
      } else if (users) {
        var token = jwt.sign(user, "FitnessTrackerSecretJwT", {
          expiresIn : 60*60*24 // expires in 24 hours
        });
        // return the information including token as JSON
        res.send({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          userid: users[0]._id
        });
      }

    })
  })
   module.exports = router;