var MongoClient = require ('mongodb').MongoClient;

module.exports.QueryGet = function (callback){
  MongoClient.connect ("mongodb://localhost:27017", { useNewUrlParser: true }, function (err, client){
  	if (err) throw err;

  	var db = client.db ("myproject");

    db.collection ("documents", function (err, collection){
      if (err) throw err;
      collection.find({}).toArray(function(err, docs) {
        callback (err, docs);
      });
    });
  });
}