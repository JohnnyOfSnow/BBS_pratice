var MongoClient = require ('mongodb').MongoClient;

module.exports.RemoveSave = function (data, callback){
  MongoClient.connect ("mongodb://localhost:27017", { useNewUrlParser: true }, function (err, client){
  	if (err) throw err;

  	var db = client.db ("myproject");

  	db.collection ("documents", function (err, collection){
  	  collection.deleteOne ({id: data.id}, {w: 1}, function (err, result){
  	  	if (err) throw err;
  	  	callback ("Document delete Successfully!");
  	  });
  	});
  });
}