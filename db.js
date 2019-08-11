var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

// 要連接的網址
var url = 'mongodb://localhost:27017/myproject';
var db = null;

var DB = {
  connect: function (cb) {

    // 連接到 DB
    MongoClient.connect(url, function(err, mongo) {
      console.log("Connected successfully to server");
      db = mongo;
      cb(err);
    });
  },

  addPost: function (post, cb) {
    var collection = db.db.collection('documents');

    // 寫入資料
    collection.insert(post, function(err, result) {
      cb(err, result);
    });
  },

  deletePost: function (id, cb) {
    var collection = db.collection('documents');

    collection.deleteOne({ _id : ObjectId(id) }, function(err, result) {
      console.log(err, result);
      cb(err, result);
    }); 
  },

  getPosts: function (cb) {
    var collection = db.collection('documents');

    collection.find({}).toArray(function(err, docs) {
      cb(err, docs);
    });
  }
}

module.exports = DB;