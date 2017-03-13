var db = require('../Utilities/db')
    // node doesn't have xml parsing or a dom. use xmldom
const togeojson = require('@mapbox/togeojson');
const DOMParser = require('xmldom').DOMParser;



//MODULE EXPORTS ALL STATUSES
module.exports.getAllStatus = function (cb) {
    var collection = db.get().collection('status');
    collection.find().sort({ _id: -1 }).toArray(function (err, status) {
        cb(err, status);
    });
}

//HELPER FUNCTION TTO CONVERT THE XML STRING TO GEOJSON
function convertStringToGeoJson(gpxstring){
  var doc = new DOMParser().parseFromString(gpxstring, 'text/xml');
   return  togeojson.gpx(doc);
      
       
}

//FUNCTION USED TO INSERT STATUS, TAKES IN ALL THE PARAMTERS REQUIRED FOR A STATUS, IT CHECKS IF THE GPX STRING ISNT EMPTY AND IF IT ISNT IT CALLS
//THE HELPER FUNCTION ABOVE
module.exports.insertStatus = function (userid, username, tags, description, imagepath, date, userImage, gpxstring, cb) {
    var geojson;
    if(gpxstring != ''){
     geojson = convertStringToGeoJson(gpxstring);
    }
    else{
        geojson = ''
    }
    
    var collection = db.get().collection('status');

    collection.insert({ userid: userid, username: username, tags: tags, description: description, imagepath: imagepath, date: date, userImage: userImage, geojson: geojson }, function (err, status) {
        //console.log(status["ops"][0]["_id"]);
        cb(err, status)
    })
}

module.exports.editStatus = function (statusid, description, tags, cb) {
    var collection = db.get().collection('status');
    // USING MONGO.OBJECTID(STATUSOID) TO CONVERT THE STATUS ID INTO A VALID OBJECT ID THAT MONGO RECOGNISED 
    var mongo = require('mongodb');
    var o_id = new mongo.ObjectID(statusid);

    collection.update(
        {
            '_id': o_id,

        },
        {
            "$set": {
                'description': description,
                'tags': tags
            }
        }, function (err, status) {
            cb(err, status);
        })
}

module.exports.deleteStatus = function (statusid, cb) {
    var collection = db.get().collection('status');
    var mongo = require('mongodb');
     // USING MONGO.OBJECTID(STATUSOID) TO CONVERT THE STATUS ID INTO A VALID OBJECT ID THAT MONGO RECOGNISED 
    var o_id = new mongo.ObjectID(statusid);
    collection.deleteOne({ _id: o_id }, function (err, status) {
        cb(err, status);
    })
}
