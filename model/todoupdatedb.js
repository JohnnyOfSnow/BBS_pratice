var MongoClient = require ('mongodb').MongoClient;

module.exports.UpdataSave = function (data, callback){
  MongoClient.connect ("mongodb://localhost:27017", { useNewUrlParser: true }, function (err, client){
  	if (err) throw err;

  	var db = client.db ('myproject');

  	/**
		 DeprecationWarning: collection.findAndModify is deprecated. 
     Change collection.findAndModify to collection.findOneAndUpdate
  	*/
  	db.collection ("documents").findOneAndUpdate (
  	  {id: data.id}, //qurey
  	  //[],//sort
  	  {$set: {message: data.message}}, //update
  	  {new: true},//return updated document
  	  function (err, doc){
  	  	if (err) throw err;
  	  	callback (doc.value);
  	  });
  });
}