 var config = require('./config');
var jwt = require('jsonwebtoken');
 

 //FUNCTION USED IN EVERY REQUEST HEADERS TO CHECK THAT THE TOKEN EXISITS, 
 //IF REQUIRES AN REQUEST WITHOUTH AN AUTHORISATION JUST DONT ICLUDE THIS FUNCTION IN THE HEADER OF THE REQUEST
 module.exports = function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, 'FitnessTrackerSecretJwT', function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
}
