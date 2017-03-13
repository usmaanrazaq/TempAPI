var db = require('../Utilities/db')


// FUNCTION TO FIND USER BY ID, FUNCTION ONLY REQUIRES ID AND CONVERTS IT INTO A OBJECT ID SO MONGO DB CAN USE IT TO COMPARE IDS 
module.exports.findUserbyID = function(userid, cb) {
    var collection = db.get().collection('users');
     var mongo = require('mongodb');
    var o_id = new mongo.ObjectID(userid);
    collection.find( { _id: o_id } ).toArray(function(err, user) {
    cb(err, user)
  })
}
// THIS FUNCTION WILL BE USED FOR LOGIN, INSTEAD OF THE COLLECTION RETURNING THE PASSWORD, WHY NOT JUST CHECK IF THE PASSWORD MATCHES IN THE DATABASE
module.exports.findUser = function(username, password, cb) {
    var collection = db.get().collection('users');
  collection.find( { username: username, password: password } ).toArray(function(err, user) {
    cb(err, user)
  })
}

//USEFUL FOR FINDING OTHER PEOPLES 
module.exports.findUserbyUsername = function(username, cb) {
  var collection = db.get().collection('users');
  collection.find( { username: username } ).toArray(function(err, user) {
    cb(err, user)
  })
}

//USED TO CHANGE PASSWORD FOR THE USER
module.exports.changePass = function(userid, password, cb){
   var collection = db.get().collection('users');
    var mongo = require('mongodb');
    var o_id = new mongo.ObjectID(userid);
     collection.update(
        {
            '_id': o_id,
        
        },
        {
            "$set": {
               'password': password
            }
        }, function (err, status) {
            cb(err, status);
        })
}

module.exports.editUser = function(userid,name, email,bio,cb){
    var collection = db.get().collection('users');
    var mongo = require('mongodb');
    var o_id = new mongo.ObjectID(userid);
   collection.update(
        {
            '_id': o_id,
        
        },
        {
            "$set": {
                'name': name,
                'email': email,
                'bio': bio
            }
        }, function (err, status) {
            cb(err, status);
        })
}
module.exports.insertUser = function(name,username,password, age, email, bio,imageurl, cb) {
    var collection = db.get().collection('users');
  collection.insert( { name: name, username: username, password: password, age:age, email:email, bio:bio, imageurl: imageurl }, function(err, user) {
   cb(err, user);
  })
}

module.exports.deleteUser = function(username,cb){
    var collection = db.get().collection('users');
 collection.deleteOne( {username: username}, function(err, user){
   cb(err, user);
 })
}


