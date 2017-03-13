
var MongoClient = require('mongodb').MongoClient

var state = {
  db: null,
}

var URL = 'mongodb://admin:admin@ds131099.mlab.com:31099/fitnesstracker'
exports.connectDB = function(){
   connect(URL, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
      console.log("Mongo Connected")
  }
})
}

function connect(url,done){
  if (state.db) return done()
  MongoClient.connect(url, function(err, db) {
    if (err) return done(err)
    state.db = db
    done()
  })
}

exports.get = function() {
  return state.db
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}


