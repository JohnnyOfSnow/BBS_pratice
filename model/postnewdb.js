var MongoClient = require ('mongodb').MongoClient;

module.exports.InsertNew = function (post, callback){
  MongoClient.connect ("mongodb://localhost:27017", { useNewUrlParser: true }, function (err, client){
  	if (err) throw err;

  	var db = client.db ("myproject");

    db.collection ("documents", function (err, collection){
      if (err) throw err;

      collection.find ({}, {'id': 1}).sort ({'id': -1}).limit (1).toArray (function (err, items){
        if (err) throw err;

        var dataset = [];
        var current = 0;

        if (items.length > 0){
          current = items[0].id + 1;
        } 

        post.map (function (obj){
          dataset.push ({
            id: current++, 
            author: obj.author, 
            content: obj.content, 
            createTime: obj.createTime
          });
        });

        collection.insertMany (post, function (err, result){
          callback (err, result);
        })
      });//toArray
    });
  });
}