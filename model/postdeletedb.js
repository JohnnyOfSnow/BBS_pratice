var MongoClient = require ('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

module.exports.RemoveSave = function (id, callback){
  MongoClient.connect ("mongodb://localhost:27017", { useNewUrlParser: true }, function (err, client){
  	if (err) throw err;

  	var db = client.db ("myproject");

  	db.collection ("documents", function (err, collection){
      if (err) throw err;
      collection.deleteOne({ _id : ObjectId(id) }, function(err, result) {
      	console.log(err, result);
      	callback(err, result);
      });
    });
  });
}