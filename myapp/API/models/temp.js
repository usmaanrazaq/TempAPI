var db = require('../Utilities/db')


module.exports.findTemp = function(roomID, cb) {
    var collection = db.get().collection('temp');
  collection.find( { roomID: roomID } ).toArray(function(err, temp) {
    cb(err, temp)
  })
}
module.exports.getTemp = function(cb) {
    var collection = db.get().collection('temp');
  collection.find().toArray(function(err, temp) {
    cb(err, temp)
  })
}

module.exports.editTemp = function(temp, roomID, cb){
    var collection = db.get().collection('temp');
   collection.update(
        {
            'roomID': roomID,
        
        },
        {
            "$set": {
                'tempreture': temp
               
            }
        }, function (err, status) {
            cb(err, status);
        })
}

module.exports.addTemp = function(temp,roomID, cb) {
    var collection = db.get().collection('temp');
  collection.insert( { tempreture: temp, roomID: roomID}, function(err, temp) {
   cb(err, temp);
  })
}



