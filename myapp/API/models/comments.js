var db = require('../Utilities/db')

// GETS ALL COMMENTS
module.exports.getComments = function(statusid, cb) {
    var collection = db.get().collection('status');
    var mongo = require('mongodb');
    var o_id = new mongo.ObjectID(statusid);
    collection.find( { _id: o_id } ).toArray(function(err, comments) {
    cb(err, comments)
  })
}

// INSERTS COMMENTS, TAKES IN STATUS ID, USERNAME COMMENT THE IMAGEURL AND THE DATE THE COMMENT WAS POSTED
module.exports.insertComment = function (statusid, username, comment,imageurl,date, cb) {
    var collection = db.get().collection('status');
    var mongo = require('mongodb');
    // USING MONGO.OBJECTID(STATUSOID) TO CONVERT THE STATUS ID INTO A VALID OBJECT ID THAT MONGO RECOGNISED 
    var o_id = new mongo.ObjectID(statusid);
    var commentID = new mongo.ObjectID();
    // THIS UPDATE FINDS THE STATUS ID THAT HAS BEEN SUPPLIED, THEN PUSHES AN COMMENT ARRAY ELEMENT INTO THE STATUS,
    // SO IF IT CONATINED NO COMMENTS IT NOW HAS A COMMENT ARRAY WITH THE FIRST COMMENT IN
    collection.update(
        { '_id': o_id },
        {
            $push: { 
                comments: {
                    commentID: commentID,
                    username: username,
                    comment: comment,
                    imageurl: imageurl,
                    date: date
                }
            }
        },
        function (err, result) {

            console.log(result);
            cb(err, result);
        })
}

// ALLOW USERS TO EDIT COMMENTS
module.exports.editComment = function (statusid, commentID, comment, cb) {

    var collection = db.get().collection('status');
    var mongo = require('mongodb');
    var o_id = new mongo.ObjectID(statusid);
    var ocomment_id = new mongo.ObjectID(commentID);

    collection.update(
        {
            '_id': o_id,
            'comments.commentID': ocomment_id
        },
        {
            "$set": {
                "comments.$.comment": comment
            }
        }, function (err, result) {
            cb(err, result);
        })
}


//DELETEION OF COMMENTS
module.exports.deleteComment = function (statusid, commentID, cb) {
    var collection = db.get().collection('status');
    var mongo = require('mongodb');
    var o_id = new mongo.ObjectID(statusid);
    var ocomment_id = new mongo.ObjectID(commentID);

    collection.update(
        { _id: o_id },
        {
            $pull: { "comments.$.commentID": ocomment_id }
        }, function (err, result) {
            cb(err, result);
        })

}